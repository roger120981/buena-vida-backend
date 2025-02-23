import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCaseManagerDto } from '../dto/create-case-manager.dto';
import { UpdateCaseManagerDto } from '../dto/update-case-manager.dto';
import { CaseManager } from '@prisma/client';

@Injectable()
export class CaseManagerRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Crear un nuevo CaseManager
  async create(data: CreateCaseManagerDto): Promise<CaseManager> {
    const { agency, name, email, phone } = data;

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

  // Obtener todos los CaseManagers
  async findAll() {
    return this.prisma.caseManager.findMany();
  }

  // Obtener un CaseManager por ID
  async findOne(id: number) {
    return this.prisma.caseManager.findUnique({ where: { id } });
  }

  // Actualizar un CaseManager por ID
  async update(id: number, data: UpdateCaseManagerDto) {
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

  // Eliminar un CaseManager por ID
  async remove(id: number) {
    return this.prisma.caseManager.delete({ where: { id } });
  }
}
