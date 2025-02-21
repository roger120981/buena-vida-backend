import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCaregiverDto, CreateCaregiverSchema } from '../dto/create-caregiver.dto';
import { UpdateCaregiverDto } from '../dto/update-caregiver.dto';
import { Caregiver } from '@prisma/client';

@Injectable()
export class CaregiverRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any): Promise<Caregiver> {
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

  async findAll() {
    return this.prisma.caregiver.findMany();
  }

  async findOne(id: number) {
    return this.prisma.caregiver.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateCaregiverDto) {
    return this.prisma.caregiver.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.caregiver.delete({ where: { id } });
  }
}

