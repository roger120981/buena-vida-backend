import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCaregiverDto } from '../dto/create-caregiver.dto';
import { UpdateCaregiverDto } from '../dto/update-caregiver.dto';
import { Caregiver } from '@prisma/client';

@Injectable()
export class CaregiverRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Crear un nuevo Caregiver
  async create(data: CreateCaregiverDto): Promise<Caregiver> {
    const { name, email, phone, isActive } = data;

    // Verificación de campos obligatorios
    if (!name || isActive === undefined) {
      throw new Error('Name and isActive are required fields');
    }

    try {
      return await this.prisma.caregiver.create({
        data: {
          name,
          email,
          phone,
          isActive,
        },
      });
    } catch (error) {
      console.error('Error details:', error);
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

  // Obtener todos los Caregivers
  async findAll(): Promise<Caregiver[]> {
    return this.prisma.caregiver.findMany();
  }

  // Obtener un Caregiver por ID
  async findOne(id: number): Promise<Caregiver | null> {
    return this.prisma.caregiver.findUnique({ where: { id } });
  }

  // Actualizar un Caregiver
  async update(id: number, data: UpdateCaregiverDto): Promise<Caregiver> {
    return this.prisma.caregiver.update({ where: { id }, data });
  }

  // Eliminar un Caregiver
  async remove(id: number): Promise<Caregiver> {
    return this.prisma.caregiver.delete({ where: { id } });
  }
}
