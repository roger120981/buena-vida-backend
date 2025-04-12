import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CaseManager } from '@prisma/client';
import { CreateCaseManagerDto } from '../dto/create-case-manager.dto';
import { UpdateCaseManagerDto } from '../dto/update-case-manager.dto';
import { FilterOptions, PaginationOptions, SortOptions, applyFilters } from 'src/common/utils/pagination.filter.util';

/**
 * Repositorio para operaciones CRUD de administradores de casos.
 */
@Injectable()
export class CaseManagerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCaseManagerDto): Promise<CaseManager> {
    return this.prisma.caseManager.create({ data });
  }

  async findAll(
    filters: FilterOptions = {},
    pagination: PaginationOptions = { page: 1, pageSize: 10 },
    sort: SortOptions = { sortBy: 'createdAt', sortOrder: 'asc' },
  ) {
    // Transformar filtros específicos de CaseManager
    const transformedFilters: FilterOptions = {};
    for (const [key, value] of Object.entries(filters)) {
      if (Array.isArray(value) && value.length > 0) {
        // Si el valor es un array (como ["d"]), asumimos una búsqueda parcial
        transformedFilters[key] = { contains: value[0], mode: 'insensitive' };
      } else if (typeof value === 'object' && value !== null) {
        // Si ya es un objeto Prisma válido (como { contains: "d" }), lo usamos directamente
        transformedFilters[key] = value;
      } else if (value !== undefined && value !== null) {
        // Si es un valor simple (como "John Doe"), asumimos igualdad exacta
        transformedFilters[key] = value;
      }
    }

    return applyFilters(this.prisma.caseManager, transformedFilters, pagination, sort, [
      'id',
      'name',
      'email',
      'phone',
      'agencyId',
      'createdAt',
      'updatedAt',
    ]);
  }

  async findOne(id: number): Promise<CaseManager> {
    const caseManager = await this.prisma.caseManager.findUnique({ where: { id } });
    if (!caseManager) throw new Error(`CaseManager with ID ${id} not found`);
    return caseManager;
  }

  async update(id: number, data: UpdateCaseManagerDto): Promise<CaseManager> {
    return this.prisma.caseManager.update({ where: { id }, data });
  }

  async remove(id: number): Promise<CaseManager> {
    return this.prisma.caseManager.delete({ where: { id } });
  }
}