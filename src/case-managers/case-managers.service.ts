import { Injectable } from '@nestjs/common';
import { CaseManagerRepository } from './repositories/case-manager.repository';
import { CreateCaseManagerDto } from './dto/create-case-manager.dto';
import { UpdateCaseManagerDto } from './dto/update-case-manager.dto';
import { FilterOptions, PaginationOptions, SortOptions } from 'src/common/utils/pagination.filter.util';
import { CaseManager } from '@prisma/client';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';

/**
 * Servicio para la lógica de negocio de administradores de casos.
 */
@Injectable()
export class CaseManagersService {
  constructor(private readonly caseManagerRepository: CaseManagerRepository) {}

  async create(createCaseManagerDto: CreateCaseManagerDto): Promise<CaseManager> {
    return this.caseManagerRepository.create(createCaseManagerDto);
  }

  async findAll(filters: FilterOptions, pagination: PaginationOptions, sort: SortOptions) {
    return this.caseManagerRepository.findAll(filters, pagination, sort);
  }

  async findOne(id: number): Promise<CaseManager> {
    try {
      return await this.caseManagerRepository.findOne(id);
    } catch (error) {
      throw new NotFoundException('CaseManager', id);
    }
  }

  async update(id: number, updateCaseManagerDto: UpdateCaseManagerDto): Promise<CaseManager> {
    await this.findOne(id); // Verifica existencia
    return this.caseManagerRepository.update(id, updateCaseManagerDto);
  }

  async remove(id: number): Promise<CaseManager> {
    await this.findOne(id); // Verifica existencia
    return this.caseManagerRepository.remove(id);
  }
}