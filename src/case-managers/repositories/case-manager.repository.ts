import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCaseManagerDto, CreateCaseManagerSchema } from '../dto/create-case-manager.dto';

@Injectable()
export class CaseManagerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    // Validación con Zod
    /*const validation = CreateCaseManagerSchema.safeParse(data);
    if (!validation.success) {
      const validationErrors = validation.error.errors.map(e => e.message).join(', ');
      throw new Error(`Validation failed: ${validationErrors}`);
    }*/

    try {
      return await this.prisma.caseManager.create({ data: data });
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

  async update(id: number, data: CreateCaseManagerDto) {
    return this.prisma.caseManager.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.caseManager.delete({ where: { id } });
  }
}
