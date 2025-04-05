import { Controller, Get, Post, Put, Delete, Param, Query, Body, ParseIntPipe, ValidationPipe, UsePipes, BadRequestException, Req, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiBody, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { ParticipantsService } from './participants.service';
import { CaregiversService } from 'src/caregiver/caregivers.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { FilterOptions, PaginationOptions, SortOptions, PaginatedResult } from 'src/common/utils/pagination.filter.util';
import { Participant } from '@prisma/client';
import { PaginatedParticipantResponseDto } from './dto/paginated-participant-response.dto';
import { NotFoundException as CustomNotFoundException } from './../common/exceptions/not-found.exception'; // Asegúrate de importar la versión personalizada
import { Request } from 'express';

@ApiTags('Participants')
@Controller('participants')
export class ParticipantsController {
  constructor(
    private readonly participantsService: ParticipantsService,
    private readonly caregiversService: CaregiversService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los participantes con filtros y paginación' })
  @ApiQuery({
    name: 'filters',
    required: false,
    type: String,
    description: 'Filtros dinámicos en formato JSON para buscar participantes',
    examples: {
      byActive: { value: '{"isActive": true}', summary: 'Filtrar por participantes activos' },
      byName: { value: '{"name": {"contains": "John", "mode": "insensitive"}}', summary: 'Filtrar por nombre parcial' },
      byGender: { value: '{"gender": "M"}', summary: 'Filtrar por género' },
      byMedicaid: { value: '{"medicaidId": {"contains": "123"}}', summary: 'Filtrar por ID de Medicaid parcial' },
      byDateRange: { 
        value: '{"locStartDate": "2023-01-01", "locEndDate": "2023-12-31"}', 
        summary: 'Filtrar por rango de fechas de ubicación' 
      },
      byMultiple: { 
        value: '{"isActive": true, "cmID": 1, "units": {"gte": 5}}', 
        summary: 'Filtrar por estado, administrador de casos y unidades mínimas' 
      },
      empty: { value: '{}', summary: 'Sin filtros (todos los participantes)' },
    },
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número de página para paginación',
    examples: {
      firstPage: { value: 1, summary: 'Primera página' },
      secondPage: { value: 2, summary: 'Segunda página' },
      fifthPage: { value: 5, summary: 'Quinta página' },
    },
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    description: 'Cantidad de registros por página',
    examples: {
      small: { value: 5, summary: '5 registros por página' },
      default: { value: 10, summary: '10 registros por página (predeterminado)' },
      large: { value: 25, summary: '25 registros por página' },
    },
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    description: 'Campo por el cual ordenar los resultados',
    examples: {
      byCreatedAt: { value: 'createdAt', summary: 'Ordenar por fecha de creación' },
      byName: { value: 'name', summary: 'Ordenar por nombre' },
      byMedicaidId: { value: 'medicaidId', summary: 'Ordenar por ID de Medicaid' },
      byUnits: { value: 'units', summary: 'Ordenar por unidades' },
      byCmID: { value: 'cmID', summary: 'Ordenar por ID del administrador de casos' },
    },
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Dirección del ordenamiento',
    examples: {
      ascending: { value: 'asc', summary: 'Orden ascendente' },
      descending: { value: 'desc', summary: 'Orden descendente' },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de participantes',
    type: PaginatedParticipantResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Formato de filtros inválido' })
  async findAll(
    @Query('filters') filters: string = '{}',
    @Query('page') page: string = '1', // Cambiado a string con valor por defecto
    @Query('pageSize') pageSize: string = '1000', // Cambiado a string con valor por defecto
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<PaginatedResult<Participant> & { filterCounts: { isActive: { true: number; false: number }; gender: { M: number; F: number; O: number } } }> {
    console.log('Received parameters:', { filters, page, pageSize, sortBy, sortOrder });
  
    let parsedFilters: FilterOptions;
    try {
      console.log('Raw filters received:', filters);
      parsedFilters = JSON.parse(filters);
      console.log('Parsed filters:', parsedFilters);
  
      for (const key in parsedFilters) {
        if (Array.isArray(parsedFilters[key])) {
          const values = parsedFilters[key];
          if (key === 'isActive') {
            const boolValues = values.map((v) => {
              if (typeof v === 'string') {
                if (v === 'true') return true;
                if (v === 'false') return false;
                throw new BadRequestException(`Invalid boolean value in isActive: ${v}`);
              }
              return v;
            });
            if (boolValues.length === 1) {
              parsedFilters[key] = boolValues[0];
            } else if (boolValues.length === 2 && boolValues.includes(true) && boolValues.includes(false)) {
              parsedFilters[key] = undefined;
            } else {
              throw new BadRequestException('Invalid isActive filter: only one value or both true/false allowed');
            }
          } else if (key === 'name') {
            parsedFilters[key] = values.length > 0 && values[0] !== '' ? { contains: values[0], mode: 'insensitive' } : undefined;
          } else {
            parsedFilters[key] = values.length > 0 ? { in: values } : undefined;
          }
        }
      }
      console.log('Processed filters for Prisma:', parsedFilters);
    } catch (error) {
      console.error('Error parsing filters:', error);
      throw new BadRequestException('Invalid filters format. Must be valid JSON.');
    }
  
    // Convertir manualmente a números como en agencies
    const parsedPage = parseInt(page, 10) || 1;
    const parsedPageSize = parseInt(pageSize, 10) || 10;
  
    if (isNaN(parsedPage) || isNaN(parsedPageSize)) {
      throw new BadRequestException('page and pageSize must be valid numbers');
    }
  
    const pagination: PaginationOptions = { page: parsedPage, pageSize: parsedPageSize };
    const sort: SortOptions = { sortBy, sortOrder };
  
    try {
      return await this.participantsService.findAll(parsedFilters, pagination, sort);
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un participante por ID' })
  @ApiResponse({ status: 200, description: 'Participante encontrado' })
  @ApiResponse({ status: 404, description: 'Participante no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Participant> {
    return this.participantsService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Crear un nuevo participante' })
  @ApiBody({ type: CreateParticipantDto })
  @ApiResponse({ status: 201, description: 'Participante creado' })
  async create(@Body() createParticipantDto: CreateParticipantDto): Promise<Participant> {
    return this.participantsService.create(createParticipantDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Actualizar un participante' })
  @ApiBody({ type: UpdateParticipantDto })
  @ApiResponse({ status: 200, description: 'Participante actualizado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    return this.participantsService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar un participante (soft delete)' })
  @ApiResponse({ status: 200, description: 'Participante desactivado' })
  @ApiResponse({ status: 404, description: 'Participante no encontrado' })
  async softDelete(@Param('id', ParseIntPipe) id: number) {
    await this.participantsService.softDelete(id);
    return { success: true, message: 'Participant deactivated successfully' };
  }

  @Delete(':id/permanent')
  @ApiOperation({ summary: 'Eliminar un participante permanentemente (hard delete)' })
  @ApiResponse({ status: 200, description: 'Participante eliminado permanentemente' })
  @ApiResponse({ status: 404, description: 'Participante no encontrado' })
  async hardDelete(@Param('id', ParseIntPipe) id: number) {
    await this.participantsService.hardDelete(id);
    return { success: true, message: 'Participant deleted permanently' };
  }

  @Get(':id/caregivers')
  @ApiOperation({ summary: 'Obtener los cuidadores asignados a un participante' })
  @ApiResponse({ status: 200, description: 'Lista de cuidadores' })
  @ApiResponse({ status: 404, description: 'Participante no encontrado' })
  async findCaregivers(@Param('id', ParseIntPipe) id: number) {
    return this.participantsService.findCaregivers(id);
  }

  @Post(':id/caregivers/:caregiverId')
  @ApiOperation({ summary: 'Asignar un cuidador a un participante' })
  @ApiResponse({ status: 200, description: 'Cuidador asignado exitosamente' })
  @ApiResponse({ status: 404, description: 'Participante o cuidador no encontrado' })
  async assignCaregiver(
    @Param('id', ParseIntPipe) id: number,
    @Param('caregiverId', ParseIntPipe) caregiverId: number,
  ) {
    const participantId = id;
    const caregiverIdNum = caregiverId;
    const assignedBy = 'admin';
  
    try {
      await this.participantsService.findById(participantId);
      await this.caregiversService.findById(caregiverIdNum);
      await this.participantsService.assignCaregiver(participantId, caregiverIdNum, assignedBy);
  
      return {
        success: true,
        message: 'Caregiver assigned successfully',
        participantId,
        caregiverId: caregiverIdNum,
      };
    } catch (error) {
      if (error instanceof CustomNotFoundException) {
        throw error; // Usa la versión personalizada explícitamente
      }
      throw new BadRequestException('Failed to assign caregiver due to an unexpected error');
    }
  }

@Delete(':id/caregivers/:caregiverId')
@ApiOperation({ summary: 'Desvincular un cuidador de un participante' })
@ApiResponse({ status: 200, description: 'Cuidador desvinculado exitosamente' })
@ApiResponse({ status: 404, description: 'Relación no encontrada' })
async unassignCaregiver(
  @Param('id', ParseIntPipe) id: number,
  @Param('caregiverId', ParseIntPipe) caregiverId: number,
) {
  try {
    await this.participantsService.unassignCaregiver(id, caregiverId);
    return { success: true, message: 'Caregiver unassigned successfully' };
  } catch (error) {
    if (error.code === 'P2025') { // Código de Prisma para "Record not found"
      throw new CustomNotFoundException('ParticipantsOnCaregivers', `${id}-${caregiverId}`, 'RELATION_NOT_FOUND');
    }
    throw new BadRequestException('Failed to unassign caregiver due to an unexpected error');
  }
}

  @Get('status/:isActive')
  @ApiOperation({ summary: 'Obtener participantes por estado (activo/inactivo)' })
  @ApiResponse({ status: 200, description: 'Lista de participantes' })
  @ApiResponse({ status: 404, description: 'No se encontraron participantes' })
  @ApiResponse({ status: 400, description: 'Validación fallida (se espera un valor numérico 0 o 1)' })
  @ApiParam({ name: 'isActive', type: 'integer', description: '1 para activo, 0 para inactivo', example: 1 })
  async findByStatus(@Param('isActive', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })) isActive: string) {
    console.log('Reached /status/:isActive with isActive:', isActive);
    const isActiveNum = Number(isActive);
    if (isNaN(isActiveNum) || (isActiveNum !== 0 && isActiveNum !== 1)) {
      throw new HttpException('isActive debe ser 0 o 1', HttpStatus.BAD_REQUEST);
    }
    const isActiveBool = isActiveNum === 1;
    return this.participantsService.findByStatus(isActiveBool);
  }

  @Get('date-range/:startDate/:endDate')
  @ApiOperation({ summary: 'Obtener participantes por rango de fechas' })
  @ApiParam({ name: 'startDate', required: true, type: String, description: 'Fecha de inicio (YYYY-MM-DD)', example: '2023-01-01' })
  @ApiParam({ name: 'endDate', required: true, type: String, description: 'Fecha de fin (YYYY-MM-DD)', example: '2023-12-31' })
  @ApiResponse({ status: 200, description: 'Lista de participantes' })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos' })
  @ApiResponse({ status: 404, description: 'No se encontraron participantes' })
  async findByDateRange(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    // Validación manual
    if (!startDate || !endDate) {
      throw new BadRequestException('startDate and endDate are required');
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      throw new BadRequestException('startDate and endDate must be in YYYY-MM-DD format');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('startDate or endDate is not a valid date');
    }
    if (start > end) {
      throw new BadRequestException('startDate must be earlier than endDate');
    }

    const participants = await this.participantsService.findByDateRange(startDate, endDate);
    if (!participants.length) {
      throw new CustomNotFoundException('Participants', 'date-range', 'NO_PARTICIPANTS_FOUND_IN_DATE_RANGE');
    }
    return participants;
  }  
}