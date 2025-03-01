import { Controller, Get, Post, Put, Delete, Param, Query, Body, ParseIntPipe, ValidationPipe, UsePipes, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CaregiversService } from './caregivers.service';
import { CreateCaregiverDto } from './dto/create-caregiver.dto';
import { UpdateCaregiverDto } from './dto/update-caregiver.dto';
import { FilterOptions, PaginatedResult, PaginationOptions, SortOptions } from 'src/common/utils/pagination.filter.util';
import { Caregiver } from '@prisma/client';
import { PaginatedCaregiverResponseDto } from './dto/paginated-caregiver-response.dto';

/**
 * Controlador para manejar operaciones CRUD de cuidadores.
 */
@ApiTags('Caregivers')
@Controller('caregivers')
export class CaregiversController {
  constructor(private readonly caregiversService: CaregiversService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los cuidadores con filtros y paginación' })
  @ApiQuery({
    name: 'filters',
    required: false,
    type: String,
    description: 'Filtros dinámicos en formato JSON para buscar cuidadores',
    examples: {
      byActive: { value: '{"isActive": true}', summary: 'Filtrar por cuidadores activos' },
      byName: { value: '{"name": {"contains": "John", "mode": "insensitive"}}', summary: 'Filtrar por nombre parcial' },
      byEmail: { value: '{"email": {"contains": "john@example.com"}}', summary: 'Filtrar por email parcial' },
      byMultiple: { value: '{"isActive": true, "phone": {"contains": "555"}}', summary: 'Filtrar por estado y teléfono' },
      empty: { value: '{}', summary: 'Sin filtros (todos los cuidadores)' },
    },
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número de página para paginación',
    examples: {
      firstPage: { value: 1, summary: 'Primera página' },
      thirdPage: { value: 3, summary: 'Tercera página' },
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
      large: { value: 50, summary: '50 registros por página' },
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
      byEmail: { value: 'email', summary: 'Ordenar por email' },
      byPhone: { value: 'phone', summary: 'Ordenar por teléfono' },
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
    description: 'Lista paginada de cuidadores',
    type: PaginatedCaregiverResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Formato de filtros inválido' })
  async findAll(
    @Query('filters') filters: string = '{}',
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('pageSize', ParseIntPipe) pageSize: number = 10,
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<PaginatedResult<Caregiver>> {
    let parsedFilters: FilterOptions;
    try {
      parsedFilters = JSON.parse(filters);
    } catch (error) {
      throw new BadRequestException('Invalid filters format. Must be valid JSON.');
    }

    const pagination: PaginationOptions = { page, pageSize };
    const sort: SortOptions = { sortBy, sortOrder };

    return this.caregiversService.findAll(parsedFilters, pagination, sort);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cuidador por ID' })
  @ApiResponse({ status: 200, description: 'Cuidador encontrado' })
  @ApiResponse({ status: 404, description: 'Cuidador no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.caregiversService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Crear un nuevo cuidador' })
  @ApiBody({ type: CreateCaregiverDto })
  @ApiResponse({ status: 201, description: 'Cuidador creado' })
  async create(@Body() createCaregiverDto: CreateCaregiverDto) {
    return this.caregiversService.create(createCaregiverDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Actualizar un cuidador existente' })
  @ApiBody({ type: UpdateCaregiverDto })
  @ApiResponse({ status: 200, description: 'Cuidador actualizado' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCaregiverDto: UpdateCaregiverDto) {
    return this.caregiversService.update(id, updateCaregiverDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar un cuidador (soft delete)' })
  @ApiResponse({ status: 200, description: 'Cuidador desactivado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.caregiversService.remove(id);
    return { success: true, message: 'Caregiver deactivated successfully' };
  }
}