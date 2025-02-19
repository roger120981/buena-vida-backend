import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { CreateCaregiverDto } from '../dto/create-caregiver.dto';
import { UpdateCaregiverDto } from '../dto/update-caregiver.dto';

@Injectable()
export class CaregiverRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCaregiverDto) {
    return this.prisma.caregiver.create({ data });
  }

  findAll() {
    return this.prisma.caregiver.findMany();
  }

  findOne(id: number) {
    return this.prisma.caregiver.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateCaregiverDto) {
    return this.prisma.caregiver.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.caregiver.delete({ where: { id } });
  }
}
