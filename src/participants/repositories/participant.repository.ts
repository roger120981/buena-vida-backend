import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Participant } from '@prisma/client';
import { CreateParticipantDto } from '../dto/create-participant.dto';
import { UpdateParticipantDto } from '../dto/update-participant.dto';
import { FilterOptions, PaginationOptions, SortOptions, PaginatedResult, applyFilters } from 'src/common/utils/pagination.filter.util';

@Injectable()
export class ParticipantRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateParticipantDto): Promise<Participant> {
    if (!data.caseManager?.create && !data.caseManager?.connect) {
      throw new BadRequestException('caseManager must include either create or connect');
    }
  
    return this.prisma.participant.create({
      data: {
        name: data.name,
        isActive: data.isActive ?? true,
        gender: data.gender,
        medicaidId: data.medicaidId,
        dob: new Date(data.dob),
        location: data.location,
        community: data.community,
        address: data.address,
        primaryPhone: data.primaryPhone,
        secondaryPhone: data.secondaryPhone ?? '',
        locStartDate: new Date(data.locStartDate),
        locEndDate: new Date(data.locEndDate),
        pocStartDate: new Date(data.pocStartDate),
        pocEndDate: new Date(data.pocEndDate),
        units: data.units ?? 0,
        hours: data.hours ?? 0,
        hdm: data.hdm ?? false,
        adhc: data.adhc ?? false,
        caseManager: data.caseManager.create
          ? {
              create: {
                name: data.caseManager.create.name,
                email: data.caseManager.create.email,
                phone: data.caseManager.create.phone,
                agencyId: data.caseManager.create.agencyId,
              },
            }
          : { connect: { id: data.caseManager.connect!.id } }, // El ! asegura que connect existe
      },
    });
  }

  async findAll(
    filters: FilterOptions = {},
    pagination: PaginationOptions = { page: 1, pageSize: 10 },
    sort: SortOptions = { sortBy: 'createdAt', sortOrder: 'asc' },
  ): Promise<PaginatedResult<Participant>> {
    return applyFilters(
      this.prisma.participant,
      filters,
      pagination,
      sort,
      ['id', 'name', 'gender', 'medicaidId', 'dob', 'location', 'community', 'address', 'primaryPhone', 'secondaryPhone', 'isActive', 'locStartDate', 'locEndDate', 'pocStartDate', 'pocEndDate', 'units', 'hours', 'hdm', 'adhc', 'cmID', 'createdAt', 'updatedAt']
    );
  }

  async findOne(id: number): Promise<Participant> {
    const participant = await this.prisma.participant.findUnique({ where: { id } });
    if (!participant) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }
    return participant;
  }

  async findById(id: number): Promise<Participant> {
    if (isNaN(id)) {
      throw new Error('The participantId must be a valid number');
    }
    const participant = await this.prisma.participant.findUnique({ where: { id } });
    if (!participant) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }
    return participant;
  }

  async update(id: number, data: UpdateParticipantDto): Promise<Participant> {
    return this.prisma.participant.update({
      where: { id },
      data: {
        name: data.name,
        isActive: data.isActive,
        gender: data.gender,
        medicaidId: data.medicaidId,
        dob: data.dob ? new Date(data.dob) : undefined,
        location: data.location,
        community: data.community,
        address: data.address,
        primaryPhone: data.primaryPhone,
        secondaryPhone: data.secondaryPhone,
        locStartDate: data.locStartDate ? new Date(data.locStartDate) : undefined,
        locEndDate: data.locEndDate ? new Date(data.locEndDate) : undefined,
        pocStartDate: data.pocStartDate ? new Date(data.pocStartDate) : undefined,
        pocEndDate: data.pocEndDate ? new Date(data.pocEndDate) : undefined,
        units: data.units,
        hours: data.hours,
        hdm: data.hdm,
        adhc: data.adhc,
        caseManager: data.caseManager?.create
          ? {
              create: {
                name: data.caseManager.create.name,
                email: data.caseManager.create.email,
                phone: data.caseManager.create.phone,
                agencyId: data.caseManager.create.agencyId,
              },
            }
          : data.caseManager?.connect
          ? { connect: { id: data.caseManager.connect.id } }
          : undefined,
      },
    });
  }

  async remove(id: number): Promise<Participant> {
    return this.prisma.participant.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async findCaregivers(id: number): Promise<any> {
    const result = await this.prisma.participant.findUnique({
      where: { id },
      select: { caregivers: true },
    });
    if (!result) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }
    return result.caregivers;
  }

  async assignCaregiver(participantId: number, caregiverId: number, assignedBy: string): Promise<any> {
    return this.prisma.participantsOnCaregivers.create({
      data: { participantId, caregiverId, assignedBy },
    });
  }

  async unassignCaregiver(participantId: number, caregiverId: number): Promise<any> {
    return this.prisma.participantsOnCaregivers.delete({
      where: {
        participantId_caregiverId: { participantId, caregiverId },
      },
    });
  }

  async findByStatus(isActive: boolean): Promise<Participant[]> {
    return this.prisma.participant.findMany({ where: { isActive } });
  }

  async findByDateRange(startDate: string, endDate: string): Promise<Participant[]> {
    return this.prisma.participant.findMany({
      where: {
        locStartDate: { gte: new Date(startDate) },
        locEndDate: { lte: new Date(endDate) },
      },
    });
  }
}