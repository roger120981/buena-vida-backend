import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCaseManagerDto, CreateCaseManagerSchema } from '../dto/create-case-manager.dto';
import { UpdateCaseManagerDto, UpdateCaseManagerSchema } from '../dto/update-case-manager.dto';
import { CaseManager } from '@prisma/client';

@Injectable()
export class CaseManagerRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Crear un nuevo CaseManager
  async create(data: CreateCaseManagerDto): Promise<CaseManager> {
    // Validación con Zod
    const validation = CreateCaseManagerSchema.safeParse(data);
    if (!validation.success) {
      const validationErrors = validation.error.errors.map((e) => e.message).join(', ');
      throw new Error(`Validation failed: ${validationErrors}`);
    }

    // Desestructurar los datos de entrada
    const { agency, name, email, phone } = data;

    // Verificar que 'name' esté presente (campo obligatorio)
    if (!name) {
      throw new Error('Name is a required field for CaseManager creation');
    }

    // Manejo de la relación con 'agency'
    const agencyData = agency?.create
      ? { create: { name: agency.create.name } }
      : agency?.connect
      ? { connect: { id: agency.connect.id } }
      : undefined;

    try {
      return await this.prisma.caseManager.create({
        data: {
          name,      // Pasamos el nombre de forma obligatoria
          email,
          phone,
          agency: agencyData, // Relación con la agencia
        },
      });
    } catch (error) {
      console.error('Error details:', error);  // Imprimir detalles del error
      throw new Error(`Failed to create case manager: ${error.message}`);
    }
  }

  async findAll() {
    return this.prisma.caseManager.findMany();
  }

  async findOne(id: number) {
    return this.prisma.caseManager.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateCaseManagerDto) {
    // Validación con el DTO de actualización
    const validation = UpdateCaseManagerSchema.safeParse(data);
    if (!validation.success) {
      const validationErrors = validation.error.errors.map((e) => e.message).join(', ');
      throw new Error(`Validation failed: ${validationErrors}`);
    }

    const { agency, ...caseManagerData } = data;

    let agencyData: any = {};

    if (agency?.connect) {
      agencyData = {
        connect: {
          id: agency.connect.id,
        },
      };
    }

    try {
      return await this.prisma.caseManager.update({
        where: { id },
        data: {
          ...caseManagerData,
          agency: agencyData,
        },
      });
    } catch (error) {
      console.error('Error details:', error);
      throw new Error(`Failed to update case manager: ${error.message}`);
    }
  }

  async remove(id: number) {
    return this.prisma.caseManager.delete({ where: { id } });
  }
}
