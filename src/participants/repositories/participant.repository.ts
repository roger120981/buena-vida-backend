import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterOptions, applyFilters } from '../../common/utils/pagination.filter.util'; // Usamos la función común
import { Participant } from '@prisma/client';
import { CreateParticipantDto, CreateParticipantSchema } from '../dto/create-participant.dto';

@Injectable()
export class ParticipantRepository {
  constructor(private readonly prisma: PrismaService) {}

   // Crear un nuevo participante
  async create(data: CreateParticipantDto): Promise<Participant> {
    const validation = CreateParticipantSchema.safeParse(data);
    if (!validation.success) {
      throw new Error(`Validation failed: ${validation.error.errors.map(e => e.message).join(', ')}`);
    }

    try {
      return await this.prisma.participant.create({
        data: {
          ...validation.data,
          caseManager: {
            create: data.caseManager?.create,
            connectOrCreate: data.caseManager?.connectOrCreate,
            connect: data.caseManager?.connect,
          },
        },
      });
    } catch (error) {
      console.error('Error details:', error);
      throw new Error(`Failed to create participant: ${error.message}`);
    }
  }

  // Obtener todos los participantes con filtros, búsqueda, paginación y ordenamiento
  async findAll(
    filters: FilterOptions = {},
    page: number = 1,
    pageSize: number = 10,
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'asc'
  ) {
    try {
      return applyFilters(
        this.prisma.participant,
        filters,
        { page, pageSize },
        { sortBy, sortOrder }
      );
    } catch (error) {
      console.error('Error fetching participants:', error);
      throw new Error(`Failed to fetch participants: ${error.message}`);
    }
  }

  // Obtener un participante por ID
  async findOne(id: number) {
    try {
      const participant = await this.prisma.participant.findUnique({ where: { id } });
      if (!participant) {
        throw new Error(`Participant with ID ${id} not found`);
      }
      return participant;
    } catch (error) {
      console.error('Error fetching participant by ID:', error);
      throw new Error(`Failed to fetch participant by ID: ${error.message}`);
    }
  }

  // Actualizar un participante por ID
  async update(id: number, data: any) {
    try {
      return await this.prisma.participant.update({ where: { id }, data });
    } catch (error) {
      console.error('Error updating participant:', error);
      throw new Error(`Failed to update participant: ${error.message}`);
    }
  }

  // Eliminar un participante por ID (Soft Delete)
  async remove(id: number) {
    try {
      return await this.prisma.participant.update({
        where: { id },
        data: { isActive: false }, // Soft delete
      });
    } catch (error) {
      console.error('Error deleting participant:', error);
      throw new Error(`Failed to delete participant: ${error.message}`);
    }
  }
  
  // Método para encontrar un participante por ID
  async findById(participantId: number): Promise<Participant | null> {
    try {
      return await this.prisma.participant.findUnique({
        where: { id: participantId },
      });
    } catch (error) {
      console.error(`Error finding participant with ID ${participantId}:`, error);
      throw new Error(`An error occurred while retrieving participant with ID ${participantId}`);
    }
  }
  
  // Obtener los cuidadores asignados a un participante
  async findCaregivers(participantId: number) {
    try {
      return await this.prisma.participant.findUnique({
        where: { id: participantId },
        select: { caregivers: true },
      });
    } catch (error) {
      console.error('Error fetching caregivers for participant:', error);
      throw new Error(`Failed to fetch caregivers for participant: ${error.message}`);
    }
  }

  // Asignar un cuidador a un participante
  async assignCaregiver(participantId: number, caregiverId: number, assignedBy: string) {
    try {
      return await this.prisma.participantsOnCaregivers.create({
        data: { participantId, caregiverId, assignedBy },
      });
    } catch (error) {
      console.error('Error assigning caregiver to participant:', error);
      throw new Error(`Failed to assign caregiver to participant: ${error.message}`);
    }
  }

  // Desvincular un cuidador de un participante
  async unassignCaregiver(participantId: number, caregiverId: number) {
    try {
      return await this.prisma.participantsOnCaregivers.delete({
        where: {
          participantId_caregiverId: {
            participantId,
            caregiverId,
          },
        },
      });
    } catch (error) {
      console.error('Error unassigning caregiver from participant:', error);
      throw new Error(`Failed to unassign caregiver from participant: ${error.message}`);
    }
  }

  // Buscar participantes por estatus (activo/inactivo)
  async findByStatus(isActive: boolean) {
    try {
      return await this.prisma.participant.findMany({ where: { isActive } });
    } catch (error) {
      console.error('Error fetching participants by status:', error);
      throw new Error(`Failed to fetch participants by status: ${error.message}`);
    }
  }

  // Buscar participantes por rango de fechas
  async findByDateRange(startDate: string, endDate: string) {
    try {
      return await this.prisma.participant.findMany({
        where: {
          locStartDate: { gte: startDate },
          locEndDate: { lte: endDate },
        },
      });
    } catch (error) {
      console.error('Error fetching participants by date range:', error);
      throw new Error(`Failed to fetch participants by date range: ${error.message}`);
    }
  }
}
