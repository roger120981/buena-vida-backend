import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCaseManagerDto } from '../dto/create-case-manager.dto';
import { UpdateCaseManagerDto } from '../dto/update-case-manager.dto';

@Injectable()
export class CaseManagerRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCaseManagerDto) {
    return this.prisma.caseManager.create({ data });
  }

  findAll() {
    return this.prisma.caseManager.findMany();
  }

  findOne(id: number) {
    return this.prisma.caseManager.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateCaseManagerDto) {
    return this.prisma.caseManager.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.caseManager.delete({ where: { id } });
  }
}
