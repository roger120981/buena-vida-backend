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
    return applyFilters(this.prisma.agency, filters, pagination, sort, ['id', 'name', 'createdAt', 'updatedAt']);
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