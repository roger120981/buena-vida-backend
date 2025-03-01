import { Injectable } from '@nestjs/common';
import { AgencyRepository } from './repositories/agency.repository';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { FilterOptions, PaginationOptions, SortOptions } from 'src/common/utils/pagination.filter.util';
import { Agency } from '@prisma/client';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';

/**
 * Servicio para la lógica de negocio de agencias.
 */
@Injectable()
export class AgenciesService {
  constructor(private readonly agencyRepository: AgencyRepository) {}

  async create(createAgencyDto: CreateAgencyDto): Promise<Agency> {
    return this.agencyRepository.create(createAgencyDto);
  }

  async findAll(filters: FilterOptions, pagination: PaginationOptions, sort: SortOptions) {
    return this.agencyRepository.findAll(filters, pagination, sort);
  }

  async findOne(id: number): Promise<Agency> {
    try {
      return await this.agencyRepository.findOne(id);
    } catch (error) {
      throw new NotFoundException('Agency', id);
    }
  }

  async update(id: number, updateAgencyDto: UpdateAgencyDto): Promise<Agency> {
    await this.findOne(id); // Verifica existencia
    return this.agencyRepository.update(id, updateAgencyDto);
  }

  async remove(id: number): Promise<Agency> {
    await this.findOne(id); // Verifica existencia
    return this.agencyRepository.remove(id);
  }
}