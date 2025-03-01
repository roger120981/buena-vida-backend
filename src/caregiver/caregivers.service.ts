import { Injectable } from '@nestjs/common';
import { CaregiverRepository } from './repositories/caregiver.repository';
import { CreateCaregiverDto } from './dto/create-caregiver.dto';
import { UpdateCaregiverDto } from './dto/update-caregiver.dto';
import { FilterOptions, PaginationOptions, SortOptions, PaginatedResult } from 'src/common/utils/pagination.filter.util';
import { Caregiver } from '@prisma/client';
import { NotFoundException } from './../common/exceptions/not-found.exception'; // Ajusta la ruta según tu estructura

@Injectable()
export class CaregiversService {
  constructor(private readonly caregiverRepository: CaregiverRepository) {}

  async create(createCaregiverDto: CreateCaregiverDto): Promise<Caregiver> {
    return this.caregiverRepository.create(createCaregiverDto);
  }

  async findAll(
    filters: FilterOptions,
    pagination: PaginationOptions,
    sort: SortOptions,
  ): Promise<PaginatedResult<Caregiver>> {
    return this.caregiverRepository.findAll(filters, pagination, sort);
  }

  async findOne(id: number): Promise<Caregiver> {
    return this.findById(id); // Reutiliza findById
  }

  async findById(id: number): Promise<Caregiver> {
    if (isNaN(id)) {
      throw new Error('The caregiverId must be a valid number'); // Podrías usar una BadRequestException personalizada aquí si prefieres
    }
    const caregiver = await this.caregiverRepository.findOne(id);
    if (!caregiver) {
      throw new NotFoundException('Caregiver', id); // Usando NotFoundException personalizada
    }
    return caregiver;
  }

  async update(id: number, updateCaregiverDto: UpdateCaregiverDto): Promise<Caregiver> {
    await this.findById(id); // Verifica existencia, lanzará NotFoundException si no existe
    return this.caregiverRepository.update(id, updateCaregiverDto);
  }

  async remove(id: number): Promise<Caregiver> {
    await this.findById(id); // Verifica existencia, lanzará NotFoundException si no existe
    return this.caregiverRepository.remove(id);
  }
}