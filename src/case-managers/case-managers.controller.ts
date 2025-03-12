import { Controller, Get, Post, Put, Delete, Param, Query, Body, ParseIntPipe, ValidationPipe, UsePipes, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CaseManagersService } from './case-managers.service';
import { CreateCaseManagerDto } from './dto/create-case-manager.dto';
import { UpdateCaseManagerDto } from './dto/update-case-manager.dto';
import { FilterOptions, PaginatedResult, PaginationOptions, SortOptions } from 'src/common/utils/pagination.filter.util';
import { CaseManager } from '@prisma/client';
import { PaginatedCaseManagerResponseDto } from './dto/paginated-case-manager-response.dto';

/**
 * Controlador para manejar operaciones CRUD de administradores de casos.
 */
@ApiTags('CaseManagers')
@Controller('case-managers')
export class CaseManagersController {
  constructor(private readonly caseManagersService: CaseManagersService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los administradores de casos con filtros y paginación' })
  @ApiQuery({ name: 'filters', required: false, type: String, description: 'Filtros dinámicos en formato JSON' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, description: 'Cantidad de registros por página' })
  @ApiQuery({ name: 'sortBy', required: false, type: String, description: 'Campo por el cual ordenar' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: 'Dirección del ordenamiento' })
  @ApiResponse({ status: 200, description: 'Lista paginada de administradores de casos', type: PaginatedCaseManagerResponseDto })
  @ApiResponse({ status: 400, description: 'Formato de filtros inválido' })
  async findAll(
    @Query('filters') filters: string = '{}',
    // MODIFICACIÓN: Quité ParseIntPipe y manejamos la conversión manualmente
    @Query('page') page: string = '1', // Cambié a string para evitar fallo inmediato
    @Query('pageSize') pageSize: string = '10', // Cambié a string
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<PaginatedResult<CaseManager>> {
    let parsedFilters: FilterOptions;
    try {
      parsedFilters = JSON.parse(filters);
    } catch (error) {
      throw new BadRequestException('Invalid filters format. Must be valid JSON.');
    }

    // MODIFICACIÓN: Convertimos page y pageSize a números con valores por defecto
    const parsedPage = parseInt(page, 10) || 1;
    const parsedPageSize = parseInt(pageSize, 10) || 10;

    const pagination: PaginationOptions = { page: parsedPage, pageSize: parsedPageSize };
    const sort: SortOptions = { sortBy, sortOrder };

    return this.caseManagersService.findAll(parsedFilters, pagination, sort);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un administrador de casos por ID' })
  @ApiResponse({ status: 200, description: 'Administrador de casos encontrado' })
  @ApiResponse({ status: 404, description: 'Administrador de casos no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.caseManagersService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Crear un nuevo administrador de casos' })
  @ApiBody({ type: CreateCaseManagerDto })
  @ApiResponse({ status: 201, description: 'Administrador de casos creado' })
  async create(@Body() createCaseManagerDto: CreateCaseManagerDto) {
    return this.caseManagersService.create(createCaseManagerDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Actualizar un administrador de casos existente' })
  @ApiBody({ type: UpdateCaseManagerDto })
  @ApiResponse({ status: 200, description: 'Administrador de casos actualizado' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCaseManagerDto: UpdateCaseManagerDto) {
    return this.caseManagersService.update(id, updateCaseManagerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un administrador de casos' })
  @ApiResponse({ status: 200, description: 'Administrador de casos eliminado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.caseManagersService.remove(id);
    return { success: true, message: 'CaseManager deleted successfully' };
  }
}