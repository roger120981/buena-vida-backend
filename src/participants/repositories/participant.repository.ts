import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Participant, Prisma } from '@prisma/client';
import { CreateParticipantDto } from '../dto/create-participant.dto';
import { UpdateParticipantDto } from '../dto/update-participant.dto';
import { FilterOptions, PaginationOptions, SortOptions, PaginatedResult, applyFilters, QueryOptions } from 'src/common/utils/pagination.filter.util';

@Injectable()
export class ParticipantRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateParticipantDto): Promise<Participant> {
    if (!data.caseManager?.create && !data.caseManager?.connect) {
      throw new BadRequestException('caseManager must include either create or connect');
    }
  
    try {
      return await this.prisma.participant.create({
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
            : { connect: { id: data.caseManager.connect!.id } },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        // P2002 es el código de Prisma para violación de unicidad
        throw new BadRequestException(`Participant with name "${data.name}" already exists`);
      }
      throw error; // Otros errores se propagan como 500
    }
  }

  // Resto del código sin cambios...
  async findAll(
    filters: FilterOptions = {},
    pagination: PaginationOptions = { page: 1, pageSize: 1000 },
    sort: SortOptions = { sortBy: 'createdAt', sortOrder: 'asc' },
  ): Promise<PaginatedResult<Participant> & { filterCounts: { isActive: { true: number; false: number }; gender: { M: number; F: number; O: number } } }> {
    const queryOptions: QueryOptions = {
      include: {
        caseManager: {
          select: { id: true, name: true },
        },
        caregivers: {
          include: {
            caregiver: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    };

    const paginatedResult = await applyFilters(
      this.prisma.participant,
      filters,
      pagination,
      sort,
      ['id', 'name', 'gender', 'medicaidId', 'dob', 'location', 'community', 'address', 'primaryPhone', 'secondaryPhone', 'isActive', 'locStartDate', 'locEndDate', 'pocStartDate', 'pocEndDate', 'units', 'hours', 'hdm', 'adhc', 'cmID', 'createdAt', 'updatedAt'],
      queryOptions,
    );

    const [activeCount, inactiveCount, genderMCount, genderFCount, genderOCount] = await Promise.all([
      this.prisma.participant.count({ where: { ...filters, isActive: true } }),
      this.prisma.participant.count({ where: { ...filters, isActive: false } }),
      this.prisma.participant.count({ where: { ...filters, gender: 'M' } }),
      this.prisma.participant.count({ where: { ...filters, gender: 'F' } }),
      this.prisma.participant.count({ where: { ...filters, gender: 'O' } }),
    ]);

    return {
      ...paginatedResult,
      filterCounts: {
        isActive: { true: activeCount, false: inactiveCount },
        gender: { M: genderMCount, F: genderFCount, O: genderOCount },
      },
    };
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
    const participant = await this.prisma.participant.findUnique({
      where: { id },
      include: {
        caregivers: {
          include: {
            caregiver: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
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

  async softDelete(id: number): Promise<Participant> {
    return this.prisma.participant.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async hardDelete(id: number): Promise<void> {
    try {
      await this.prisma.participantsOnCaregivers.deleteMany({
        where: { participantId: id },
      });

      await this.prisma.participant.update({
        where: { id },
        data: {
          caseManager: {
            connect: { id: 1 },
          },
        },
      });

      await this.prisma.participant.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Participant with ID ${id} not found`);
      }
      throw new Error(`Failed to delete participant: ${error.message}`);
    }
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