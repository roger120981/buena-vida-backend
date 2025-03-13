import { Controller, Get, Post, Put, Delete, Param, Query, Body, ParseIntPipe, ValidationPipe, UsePipes, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { AgenciesService } from './agencies.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { FilterOptions, PaginatedResult, PaginationOptions, SortOptions } from 'src/common/utils/pagination.filter.util';
import { PaginatedAgencyResponseDto } from './dto/paginated-agency-response.dto';
import { Agency } from '@prisma/client';

@ApiTags('Agencies')
@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las agencias con filtros y paginación' })
  @ApiQuery({
    name: 'filters',
    required: false,
    type: String,
    description: 'Filtros dinámicos en formato JSON para buscar agencias',
    examples: {
      byName: { value: '{"name": {"contains": "Health", "mode": "insensitive"}}', summary: 'Filtrar por nombre parcial' },
      byExactName: { value: '{"name": "Health Agency"}', summary: 'Filtrar por nombre exacto' },
      empty: { value: '{}', summary: 'Sin filtros (todas las agencias)' },
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
      large: { value: 20, summary: '20 registros por página' },
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
      byId: { value: 'id', summary: 'Ordenar por ID' },
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
    description: 'Lista paginada de agencias',
    type: PaginatedAgencyResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Formato de filtros inválido' })
  async findAll(
    @Query('filters') filters: string = '{}',
    @Query('page') page: string = '1', // MODIFICACIÓN: Cambiar a string
    @Query('pageSize') pageSize: string = '10', // MODIFICACIÓN: Cambiar a string
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<PaginatedResult<Agency>> {
    console.log('Received parameters:', { filters, page, pageSize, sortBy, sortOrder }); // MODIFICACIÓN: Depuración

    let parsedFilters: FilterOptions;
    try {
      parsedFilters = JSON.parse(filters);
    } catch (error) {
      throw new BadRequestException('Invalid filters format. Must be valid JSON.');
    }

    // MODIFICACIÓN: Convertir manualmente a números
    const parsedPage = parseInt(page, 10) || 1;
    const parsedPageSize = parseInt(pageSize, 10) || 10;

    if (isNaN(parsedPage) || isNaN(parsedPageSize)) {
      throw new BadRequestException('page and pageSize must be valid numbers');
    }

    const pagination: PaginationOptions = { page: parsedPage, pageSize: parsedPageSize };
    const sort: SortOptions = { sortBy, sortOrder };

    return this.agenciesService.findAll(parsedFilters, pagination, sort);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una agencia por ID' })
  @ApiResponse({ status: 200, description: 'Agencia encontrada' })
  @ApiResponse({ status: 404, description: 'Agencia no encontrada' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.agenciesService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Crear una nueva agencia' })
  @ApiBody({ type: CreateAgencyDto })
  @ApiResponse({ status: 201, description: 'Agencia creada' })
  async create(@Body() createAgencyDto: CreateAgencyDto) {
    return this.agenciesService.create(createAgencyDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Actualizar una agencia existente' })
  @ApiBody({ type: UpdateAgencyDto })
  @ApiResponse({ status: 200, description: 'Agencia actualizada' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateAgencyDto: UpdateAgencyDto) {
    return this.agenciesService.update(id, updateAgencyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una agencia' })
  @ApiResponse({ status: 200, description: 'Agencia eliminada' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.agenciesService.remove(id);
    return { success: true, message: 'Agency deleted successfully' };
  }
}