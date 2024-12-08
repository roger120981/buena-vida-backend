import { Injectable } from '@nestjs/common';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AgenciesService {
  constructor(private prisma: PrismaService) {}

  create(createAgencyDto: CreateAgencyDto) {
    return this.prisma.agency.create({data: createAgencyDto});
  }

  findAll() {
    return this.prisma.agency.findMany();
  }

  findOne(id: number) {
    return this.prisma.agency.findUnique({ where: { id } });
  }

  update(id: number, updateAgencyDto: UpdateAgencyDto) {
    return this.prisma.agency.update({
      where: { id },
      data: updateAgencyDto,
    });
  }

  remove(id: number) {
    return this.prisma.agency.delete({where: { id }});
  }
}
