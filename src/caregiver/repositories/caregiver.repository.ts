import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Caregiver } from '@prisma/client';
import { CreateCaregiverDto } from '../dto/create-caregiver.dto';
import { UpdateCaregiverDto } from '../dto/update-caregiver.dto';
import { FilterOptions, PaginationOptions, SortOptions, applyFilters } from 'src/common/utils/pagination.filter.util';

/**
 * Repositorio para operaciones CRUD de cuidadores.
 */
@Injectable()
export class CaregiverRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCaregiverDto): Promise<Caregiver> {
    return this.prisma.caregiver.create({
      data: {
        ...data,
        isActive: data.isActive ?? true, // Valor por defecto si no se proporciona
      },
    });
  }

  async findAll(
    filters: FilterOptions = {},
    pagination: PaginationOptions = { page: 1, pageSize: 10 },
    sort: SortOptions = { sortBy: 'createdAt', sortOrder: 'asc' },
  ) {
    return applyFilters(this.prisma.caregiver, filters, pagination, sort, [
      'id',
      'name',
      'email',
      'phone',
      'isActive',
      'createdAt',
      'updatedAt',
    ]);
  }

  async findOne(id: number): Promise<Caregiver> {
    const caregiver = await this.prisma.caregiver.findUnique({ where: { id } });
    if (!caregiver) throw new Error(`Caregiver with ID ${id} not found`);
    return caregiver;
  }

  async update(id: number, data: UpdateCaregiverDto): Promise<Caregiver> {
    return this.prisma.caregiver.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Caregiver> {
    return this.prisma.caregiver.update({ where: { id }, data: { isActive: false } });
  }
}