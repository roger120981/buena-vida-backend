/* import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterOptions, applyFilters } from '../../common/utils/pagination.filter.util'; // Usamos la función común
import { Participant } from '@prisma/client';
import { CreateParticipantDto, CreateParticipantSchema } from '../dto/create-participant.dto';

@Injectable()
export class ParticipantRepository {
  constructor(private readonly prisma: PrismaService) {}

   // Crear un nuevo Participant
async create(data: CreateParticipantDto): Promise<Participant> {
  // Validación con Zod (verifica que los datos cumplen las reglas definidas)
  const validation = CreateParticipantSchema.safeParse(data);
  if (!validation.success) {
    const validationErrors = validation.error.errors.map((e) => e.message).join(', ');
    throw new Error(`Validation failed: ${validationErrors}`);
  }

  // Desestructuración de los datos y validación de campos obligatorios
  const {
    name,
    isActive,
    gender,
    medicaidId,
    dob,
    location,
    community,
    address,
    primaryPhone,
    secondaryPhone,
    locStartDate,
    locEndDate,
    pocStartDate,
    pocEndDate,
    units,
    hours,
    hdm,
    adhc,
    caseManager,
  } = data;

  // Validamos que 'name' sea obligatorio
  if (!name) {
    throw new Error('Name is a required field for Participant creation');
  }

  // Conversión de las fechas de string a Date
  const formattedDob = new Date(dob);
  const formattedLocStartDate = new Date(locStartDate);
  const formattedLocEndDate = new Date(locEndDate);
  const formattedPocStartDate = new Date(pocStartDate);
  const formattedPocEndDate = new Date(pocEndDate);

  // Validamos que las conversiones hayan sido exitosas
  if (isNaN(formattedDob.getTime())) {
    throw new Error('Invalid date format for dob');
  }
  if (isNaN(formattedLocStartDate.getTime())) {
    throw new Error('Invalid date format for locStartDate');
  }
  if (isNaN(formattedLocEndDate.getTime())) {
    throw new Error('Invalid date format for locEndDate');
  }
  if (isNaN(formattedPocStartDate.getTime())) {
    throw new Error('Invalid date format for pocStartDate');
  }
  if (isNaN(formattedPocEndDate.getTime())) {
    throw new Error('Invalid date format for pocEndDate');
  }

  // Validamos que 'caseManager' esté presente si se está creando
  let caseManagerData: any = {};

  if (caseManager?.create) {
    // Si estamos creando un nuevo CaseManager, aseguramos que 'name' esté presente
    const { name: cmName, email: cmEmail, phone: cmPhone, isActive: cmIsActive, agency } = caseManager.create;
    if (!cmName) {
      throw new Error('CaseManager name is a required field for CaseManager creation');
    }

    // Aseguramos que la relación con agency esté bien estructurada
    let agencyData: any = {};
    if (agency?.create) {
      agencyData = {
        create: {
          name: agency.create.name,  // Crear nueva agencia
        },
      };
    } else if (agency?.connect) {
      agencyData = {
        connect: {
          id: agency.connect.id,  // Conectar con una agencia existente
        },
      };
    }

    // Estructuramos los datos para crear un nuevo CaseManager con la agencia
    caseManagerData = {
      create: {
        name: cmName,
        email: cmEmail,
        phone: cmPhone,
        isActive: cmIsActive,
        agency: agencyData, // Relación con la agencia
      },
    };
  } else if (caseManager?.connect) {
    // Si estamos conectando con un CaseManager existente, aseguramos que 'id' esté presente
    if (!caseManager.connect.id) {
      throw new Error('CaseManager ID is required to connect with an existing CaseManager');
    }
    // Estructuramos los datos para conectar con un CaseManager existente
    caseManagerData = {
      connect: {
        id: caseManager.connect.id,
      },
    };
  }

  try {
    // Creamos el Participant con la relación con CaseManager
    return await this.prisma.participant.create({
      data: {
        name, 
        isActive,
        gender,
        medicaidId,
        dob: formattedDob,
        location,
        community,
        address,
        primaryPhone,
        secondaryPhone,
        locStartDate: formattedLocStartDate,
        locEndDate: formattedLocEndDate,
        pocStartDate: formattedPocStartDate,
        pocEndDate: formattedPocEndDate,
        units,
        hours,
        hdm,
        adhc,
        caseManager: caseManagerData,  // Relación con CaseManager
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
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterOptions, applyFilters } from '../../common/utils/pagination.filter.util';
import { Participant } from '@prisma/client';
import { CreateParticipantDto } from '../dto/create-participant.dto';
import { UpdateParticipantDto } from '../dto/update-participant.dto';

@Injectable()
export class ParticipantRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Crear un nuevo Participant
  async create(data: CreateParticipantDto): Promise<Participant> {
    try {
      return await this.prisma.participant.create({
        data: {
          name: data.name,
          isActive: data.isActive,
          gender: data.gender,
          medicaidId: data.medicaidId,
          dob: new Date(data.dob),
          location: data.location,
          community: data.community,
          address: data.address,
          primaryPhone: data.primaryPhone,
          secondaryPhone: data.secondaryPhone,
          locStartDate: new Date(data.locStartDate),
          locEndDate: new Date(data.locEndDate),
          pocStartDate: new Date(data.pocStartDate),
          pocEndDate: new Date(data.pocEndDate),
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
                  agency: data.caseManager.create.agency?.create
                    ? {
                        create: {
                          name: data.caseManager.create.agency.create.name,
                        },
                      }
                    : data.caseManager.create.agency?.connect
                    ? {
                        connect: {
                          id: data.caseManager.create.agency.connect.id,
                        },
                      }
                    : undefined,
                },
              }
            : data.caseManager?.connect
            ? {
                connect: {
                  id: data.caseManager.connect.id,
                },
              }
            : undefined,
        },
      });
    } catch (error) {
      console.error('Error creating participant:', error);
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
  async update(id: number, data: UpdateParticipantDto) {
    try {
      return await this.prisma.participant.update({
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
        },
      });
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
