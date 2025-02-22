import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAgencyDto } from '../dto/create-agency.dto';
import { UpdateAgencyDto } from '../dto/update-agency.dto';

@Injectable()
export class AgencyRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Crear una nueva agencia
  async create(data: CreateAgencyDto) {
    const { name } = data;
    return this.prisma.agency.create({
      data: { name },
    });
  }

  // Obtener todas las agencias
  async findAll() {
    return this.prisma.agency.findMany();
  }

  // Obtener una agencia por su id
  async findOne(id: number) {
    return this.prisma.agency.findUnique({ where: { id } });
  }

  // Actualizar una agencia
  async update(id: number, data: UpdateAgencyDto) {
    return this.prisma.agency.update({
      where: { id },
      data,
    });
  }

  // Eliminar una agencia
  async remove(id: number) {
    return this.prisma.agency.delete({ where: { id } });
  }
}
