import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCaregiverDto, CreateCaregiverSchema } from '../dto/create-caregiver.dto';
import { UpdateCaregiverDto } from '../dto/update-caregiver.dto';
import { Caregiver } from '@prisma/client';

@Injectable()
export class CaregiverRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Crear un nuevo Caregiver
  async create(data: CreateCaregiverDto): Promise<Caregiver> {
    // Validación con Zod antes de pasar los datos a Prisma
    const validation = CreateCaregiverSchema.safeParse(data);
    if (!validation.success) {
      throw new Error(`Validation failed: ${validation.error.errors.map(e => e.message).join(', ')}`);
    }

    try {
      return await this.prisma.caregiver.create({ data });
    } catch (error) {
      console.error('Error details:', error);  // Imprimir detalles del error
      throw new Error(`Failed to create caregiver: ${error.message}`);
    }
  }

  // Método para encontrar un cuidador por ID
  async findById(caregiverId: number): Promise<Caregiver | null> {
    try {
      return await this.prisma.caregiver.findUnique({
        where: { id: caregiverId },
      });
    } catch (error) {
      console.error(`Error finding caregiver with ID ${caregiverId}:`, error);
      throw new Error(`An error occurred while retrieving caregiver with ID ${caregiverId}`);
    }
  }

  // Obtener todos los cuidadores
  async findAll(): Promise<Caregiver[]> {
    try {
      return await this.prisma.caregiver.findMany();
    } catch (error) {
      console.error('Error fetching caregivers:', error);
      throw new Error('An error occurred while retrieving caregivers');
    }
  }

  // Obtener un cuidador por id
  async findOne(id: number): Promise<Caregiver | null> {
    try {
      return await this.prisma.caregiver.findUnique({ where: { id } });
    } catch (error) {
      console.error(`Error fetching caregiver with id ${id}:`, error);
      throw new Error(`An error occurred while retrieving caregiver with id ${id}`);
    }
  }

  // Actualizar un Caregiver
  async update(id: number, data: UpdateCaregiverDto): Promise<Caregiver> {
    try {
      return await this.prisma.caregiver.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error(`Error updating caregiver with id ${id}:`, error);
      throw new Error(`Failed to update caregiver with id ${id}: ${error.message}`);
    }
  }

  // Eliminar un Caregiver
  async remove(id: number): Promise<Caregiver> {
    try {
      return await this.prisma.caregiver.delete({ where: { id } });
    } catch (error) {
      console.error(`Error deleting caregiver with id ${id}:`, error);
      throw new Error(`Failed to delete caregiver with id ${id}: ${error.message}`);
    }
  }
}
