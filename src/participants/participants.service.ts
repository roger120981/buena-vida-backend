import { Injectable } from '@nestjs/common';
import { ParticipantRepository } from './repositories/participant.repository';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { FilterOptions, PaginationOptions, SortOptions, PaginatedResult } from 'src/common/utils/pagination.filter.util';
import { Participant } from '@prisma/client';

@Injectable()
export class ParticipantsService {
  constructor(private readonly participantRepository: ParticipantRepository) {}

  async create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    return this.participantRepository.create(createParticipantDto);
  }

  async findAll(
    filters: FilterOptions = {},
    pagination: PaginationOptions = { page: 1, pageSize: 10 },
    sort: SortOptions = { sortBy: 'createdAt', sortOrder: 'asc' },
  ): Promise<PaginatedResult<Participant> & { filterCounts: { isActive: { true: number; false: number }; gender: { M: number; F: number; O: number } } }> {
    return this.participantRepository.findAll(filters, pagination, sort);
  }

  async findOne(id: number): Promise<Participant> {
    return this.findById(id);
  }

  async findById(id: number): Promise<Participant> {
    if (isNaN(id)) {
      throw new Error('The participantId must be a valid number');
    }
    return this.participantRepository.findById(id);
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto): Promise<Participant> {
    await this.findById(id);
    return this.participantRepository.update(id, updateParticipantDto);
  }

  // Soft delete: marcar el participante como inactivo
  async softDelete(id: number): Promise<Participant> {
    await this.findById(id);
    return this.participantRepository.softDelete(id);
  }

  // Hard delete: eliminar el participante permanentemente
  async hardDelete(id: number): Promise<void> {
    await this.findById(id);
    await this.participantRepository.hardDelete(id);
  }

  async findCaregivers(id: number): Promise<any> {
    return this.participantRepository.findCaregivers(id);
  }

  async assignCaregiver(participantId: number, caregiverId: number, assignedBy: string): Promise<any> {
    return this.participantRepository.assignCaregiver(participantId, caregiverId, assignedBy);
  }

  async unassignCaregiver(participantId: number, caregiverId: number): Promise<any> {
    return this.participantRepository.unassignCaregiver(participantId, caregiverId);
  }

  async findByStatus(isActive: boolean): Promise<Participant[]> {
    return this.participantRepository.findByStatus(isActive);
  }

  async findByDateRange(startDate: string, endDate: string): Promise<Participant[]> {
    return this.participantRepository.findByDateRange(startDate, endDate);
  }  
}