import { Injectable, NotFoundException } from '@nestjs/common';
import { ParticipantRepository } from './repositories/participant.repository';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participant } from '@prisma/client';

@Injectable()
export class ParticipantsService {
  constructor(private readonly participantRepository: ParticipantRepository) {}

  // Crear un nuevo participante
  async create(createParticipantDto: CreateParticipantDto) {
    return this.participantRepository.create(createParticipantDto);
  }

  // Obtener todos los participantes con filtros, búsqueda, paginación y ordenamiento
  async findAll(
    filters: any = {},
    page: number = 1,
    pageSize: number = 10,
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'asc'
  ) {
    return this.participantRepository.findAll(filters, page, pageSize, sortBy, sortOrder);
  }

  // Obtener un participante por ID
  async findOne(id: number) {
    return this.participantRepository.findOne(id);
  }

  // Actualizar un participante por ID
  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return this.participantRepository.update(id, updateParticipantDto);
  }

  // Eliminar un participante por ID (Soft Delete)
  async remove(id: number) {
    return this.participantRepository.remove(id);
  }

  // Obtener los cuidadores asignados a un participante
  async findCaregivers(id: number) {
    return this.participantRepository.findCaregivers(id);
  }

  // Asignar un cuidador a un participante
  async assignCaregiver(participantId: number, caregiverId: number, asignedBy: string) {
    return this.participantRepository.assignCaregiver(participantId, caregiverId, asignedBy);
  }

  // Desvincular un cuidador de un participante
  async unassignCaregiver(participantId: number, caregiverId: number) {
    return this.participantRepository.unassignCaregiver(participantId, caregiverId);
  }

  // Método para encontrar un participante por ID
  async findById(participantId: number): Promise<Participant> {
    // Validación para verificar que el ID es un número válido
    if (isNaN(participantId)) {
      throw new Error('The participantId must be a valid number');
    }

    // Buscar al participante usando el repositorio
    const participant = await this.participantRepository.findById(participantId);

    // Si no se encuentra el participante, lanzar una excepción
    if (!participant) {
      throw new NotFoundException(`Participant with ID ${participantId} not found`);
    }

    return participant;
  }
  
  // Buscar participantes por estatus (activo/inactivo)
  async findByStatus(isActive: boolean) {
    return this.participantRepository.findByStatus(isActive);
  }

  // Buscar participantes por rango de fechas
  async findByDateRange(startDate: string, endDate: string) {
    return this.participantRepository.findByDateRange(startDate, endDate);
  }
}
