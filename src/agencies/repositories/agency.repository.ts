import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Agency } from '@prisma/client';
import { CreateAgencyDto } from '../dto/create-agency.dto';
import { UpdateAgencyDto } from '../dto/update-agency.dto';
import { FilterOptions, PaginationOptions, SortOptions, applyFilters } from 'src/common/utils/pagination.filter.util';

/**
 * Repositorio para operaciones CRUD de agencias.
 */
@Injectable()
export class AgencyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAgencyDto): Promise<Agency> {
    return this.prisma.agency.create({ data });
  }

  async findAll(
    filters: FilterOptions = {},
    pagination: PaginationOptions = { page: 1, pageSize: 10 },
    sort: SortOptions = { sortBy: 'createdAt', sortOrder: 'asc' },
  ) {
    // Transformar filtros específicos de Agency
    const transformedFilters: FilterOptions = {};
    for (const [key, value] of Object.entries(filters)) {
      if (Array.isArray(value) && value.length > 0) {
        // Si el valor es un array (como ["w"]), asumimos una búsqueda parcial
        transformedFilters[key] = { contains: value[0], mode: 'insensitive' };
      } else if (typeof value === 'object' && value !== null) {
        // Si ya es un objeto Prisma válido (como { contains: "w" }), lo usamos directamente
        transformedFilters[key] = value;
      } else if (value !== undefined && value !== null) {
        // Si es un valor simple (como "Health Agency"), asumimos igualdad exacta
        transformedFilters[key] = value;
      }
    }

    return applyFilters(
      this.prisma.agency,
      transformedFilters,
      pagination,
      sort,
      ['id', 'name', 'createdAt', 'updatedAt']
    );
  }

  async findOne(id: number): Promise<Agency> {
    const agency = await this.prisma.agency.findUnique({ where: { id } });
    if (!agency) throw new Error(`Agency with ID ${id} not found`);
    return agency;
  }

  async update(id: number, data: UpdateAgencyDto): Promise<Agency> {
    return this.prisma.agency.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Agency> {
    return this.prisma.agency.delete({ where: { id } });
  }
}