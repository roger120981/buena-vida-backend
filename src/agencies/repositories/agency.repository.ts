import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAgencyDto } from '../dto/create-agency.dto';
import { UpdateAgencyDto } from '../dto/update-agency.dto';

@Injectable()
export class AgencyRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateAgencyDto) {
    return this.prisma.agency.create({ data });
  }

  findAll() {
    return this.prisma.agency.findMany();
  }

  findOne(id: number) {
    return this.prisma.agency.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateAgencyDto) {
    return this.prisma.agency.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.agency.delete({ where: { id } });
  }
}
