  import { Controller, Get, Post, Body, Param, Put, Delete, Query, NotFoundException, BadRequestException, ValidationPipe, UsePipes } from '@nestjs/common';
  import { ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';
  import { ParticipantsService } from './participants.service';
  import { CreateParticipantDto } from './dto/create-participant.dto';
  import { UpdateParticipantDto } from './dto/update-participant.dto';
  import { ValidationException } from '../common/exceptions/validation.exception';
  import { CaregiversService } from 'src/caregiver/caregivers.service';
import { TransformStringPipe } from 'src/common/pipes/transform-string.pipe';
  
  @ApiTags('Participants')
  @Controller('participants')
  export class ParticipantsController {
    constructor(
      private readonly participantsService: ParticipantsService,
      private readonly caregiversService: CaregiversService,
    ) {}
  
    // Obtener todos los participantes con filtros, búsqueda, paginación y ordenamiento
    @Get()
    @ApiQuery({
      name: 'filters',
      description: 'Filtros para la búsqueda, en formato JSON',
      required: false,
      type: String,
      example: '{"isActive": true, "name": "John"}', // Ejemplo de cómo deben lucir los filtros
    })
    @ApiQuery({
      name: 'page',
      description: 'Número de página para la paginación',
      required: false,
      type: Number,
      default: 1,
      example: 1,
    })
    @ApiQuery({
      name: 'pageSize',
      description: 'Número de elementos por página',
      required: false,
      type: Number,
      default: 10,
      example: 10,
    })
    @ApiQuery({
      name: 'sortBy',
      description: 'Campo por el cual ordenar los resultados',
      required: false,
      type: String,
      default: 'createdAt',
      example: 'name',
    })
    @ApiQuery({
      name: 'sortOrder',
      description: 'Orden de los resultados, puede ser "asc" o "desc"',
      required: false,
      type: String,
      default: 'asc',
      example: 'desc',
    })
    async findAll(
      @Query('filters') filters: string = '{}',
      @Query('page') page: number = 1,
      @Query('pageSize') pageSize: number = 10,
      @Query('sortBy') sortBy: string = 'createdAt',
      @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
    ) {
      const parsedFilters = JSON.parse(filters);
      return this.participantsService.findAll(
        parsedFilters,
        page,
        pageSize,
        sortBy,
        sortOrder,
      );
    }
  
    // Obtener un participante por ID
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const participant = await this.participantsService.findOne(Number(id));
      if (!participant) {
        throw new NotFoundException(`Participant with ID ${id} not found`);
      }
      return participant;
    }
  
    // Crear un nuevo participante
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiBody({
      description: 'Datos para crear un nuevo participante, incluyendo CaseManager y Agency',
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 2 },
          gender: { type: 'string', enum: ['Male', 'Female', 'Other'] },
          medicaidId: { type: 'string', minLength: 10, maxLength: 10 },
          dob: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
          location: { type: 'string' },
          community: { type: 'string' },
          address: { type: 'string', minLength: 5 },
          primaryPhone: { type: 'string', pattern: '^\\d{10}$' },
          secondaryPhone: { type: 'string', nullable: true },
          isActive: { type: 'boolean' },
          locStartDate: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
          locEndDate: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
          pocStartDate: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
          pocEndDate: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
          units: { type: 'number', minimum: 1 },
          hours: { type: 'number', minimum: 1 },
          hdm: { type: 'boolean' },
          adhc: { type: 'boolean' },
          caseManager: {
            type: 'object',
            properties: {
              create: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  phone: { type: 'string' },
                  isActive: { type: 'boolean' },
                  agency: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                    },
                  },
                },
                required: ['name', 'email', 'phone', 'isActive', 'agency'],
              },
              connectOrCreate: {
                type: 'object',
                properties: {
                  where: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      id: { type: 'number' },
                    },
                    required: ['name'],
                  },
                  create: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      email: { type: 'string', format: 'email' },
                      phone: { type: 'string' },
                      isActive: { type: 'boolean' },
                      agency: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                        },
                      },
                    },
                    required: ['name', 'email', 'phone', 'isActive', 'agency'],
                  },
                },
                required: ['where', 'create'],
              },
              connect: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                },
                required: ['id'],
              },
            },
          },
          agency: {
            type: 'object',
            properties: {
              create: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                },
                required: ['name'],
              },
              connect: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                },
                required: ['id'],
              },
            },
          },
        },
        required: [
          'name',
          'gender',
          'medicaidId',
          'dob',
          'location',
          'community',
          'address',
          'primaryPhone',
          'isActive',
          'locStartDate',
          'locEndDate',
          'pocStartDate',
          'pocEndDate',
          'units',
          'hours',
          'hdm',
          'adhc',
        ],
      },
    })
    async create(@Body() createParticipantDto: CreateParticipantDto) {
      return this.participantsService.create(createParticipantDto);
    }
  
    // Actualizar un participante por ID
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
      const participant = await this.participantsService.findOne(Number(id));
      if (!participant) {
        throw new NotFoundException(`Participant with ID ${id} not found`);
      }
      return this.participantsService.update(Number(id), updateParticipantDto);
    }
  
    // Eliminar un participante por ID (Soft Delete)
    @Delete(':id')
    async remove(@Param('id') id: string) {
      const deleted = await this.participantsService.remove(Number(id));
      if (!deleted) {
        throw new NotFoundException(`Participant with ID ${id} not found`);
      }
      return { success: true, message: 'Participant deleted successfully' };
    }
  
    // Obtener los cuidadores asignados a un participante
    @Get(':id/caregivers')
    async findCaregivers(@Param('id') id: string) {
      const caregivers = await this.participantsService.findCaregivers(Number(id));
      if (!caregivers) {
        throw new NotFoundException(`No caregivers found for participant with ID ${id}`);
      }
      return caregivers;
    }
  
    // Asignar un cuidador a un participante
    @Post(':id/caregivers/:caregiverId')
    async assignCaregiver(@Param('id') id: string, @Param('caregiverId') caregiverId: string) {
      const participantId = Number(id);
      const caregiverIdNum = Number(caregiverId);
      const asignedBy = 'admin'; // Cambiar por el usuario autenticado
  
      const participantExists = await this.participantsService.findById(participantId);
      if (!participantExists) {
        throw new NotFoundException(`Participant with ID ${participantId} not found`);
      }
  
      const caregiverExists = await this.caregiversService.findById(caregiverIdNum);
      if (!caregiverExists) {
        throw new NotFoundException(`Caregiver with ID ${caregiverIdNum} not found`);
      }
  
      const assigned = await this.participantsService.assignCaregiver(participantId, caregiverIdNum, asignedBy);
      if (!assigned) {
        throw new NotFoundException(`Could not assign caregiver with ID ${caregiverId} to participant with ID ${id}`);
      }
  
      return {
        success: true,
        message: 'Caregiver assigned successfully',
        participantId,
        caregiverId: caregiverIdNum,
      };
    }
  
    // Desvincular un cuidador de un participante
    @Delete(':id/caregivers/:caregiverId')
    async unassignCaregiver(@Param('id') id: string, @Param('caregiverId') caregiverId: string) {
      const unassigned = await this.participantsService.unassignCaregiver(Number(id), Number(caregiverId));
      if (!unassigned) {
        throw new NotFoundException(`Could not unassign caregiver with ID ${caregiverId} from participant with ID ${id}`);
      }
      return { success: true, message: 'Caregiver unassigned successfully' };
    }
  
    // Buscar participantes por estatus (activo/inactivo)
    @Get('status/:isActive')
    async findByStatus(@Param('isActive') isActive: string) {
      const participants = await this.participantsService.findByStatus(isActive === 'true');
      if (!participants.length) {
        throw new NotFoundException('No participants found with this status');
      }
      return participants;
    }
  
    // Buscar participantes por rango de fechas
    @Get('date-range')
    async findByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
      const participants = await this.participantsService.findByDateRange(startDate, endDate);
      if (!participants.length) {
        throw new NotFoundException('No participants found for the given date range');
      }
      return participants;
    }
  }
  