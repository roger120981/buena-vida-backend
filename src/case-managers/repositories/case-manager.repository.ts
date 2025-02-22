import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCaseManagerDto, CreateCaseManagerSchema } from '../dto/create-case-manager.dto';
import { UpdateCaseManagerDto, UpdateCaseManagerSchema } from '../dto/update-case-manager.dto';

@Injectable()
export class CaseManagerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCaseManagerDto) {
    // Validación con Zod
    const validation = CreateCaseManagerSchema.safeParse(data);
    if (!validation.success) {
      const validationErrors = validation.error.errors.map((e) => e.message).join(', ');
      throw new Error(`Validation failed: ${validationErrors}`);
    }

    const { agency, ...caseManagerData } = data;

    let agencyData: any = {};

    if (agency?.create) {
      agencyData = {
        create: {
          name: agency.create.name,
        },
      };
    } else if (agency?.connect) {
      agencyData = {
        connect: {
          id: agency.connect.id,
        },
      };
    }

    try {
      return await this.prisma.caseManager.create({
        data: {
          ...caseManagerData,
          agency: agencyData, // Aquí pasamos la relación con la agencia
        },
      });
    } catch (error) {
      console.error('Error details:', error);
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
