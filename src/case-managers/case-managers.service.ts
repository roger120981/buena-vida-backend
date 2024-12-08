import { Injectable } from '@nestjs/common';
import { CreateCaseManagerDto } from './dto/create-case-manager.dto';
import { UpdateCaseManagerDto } from './dto/update-case-manager.dto';
import { PrismaService } from 'src/prisma/prisma.service';;

@Injectable()
export class CaseManagersService {
  constructor(private prisma: PrismaService) {}

  create(createCaseManagerDto: CreateCaseManagerDto) {
    return this.prisma.caseManager.create({data: createCaseManagerDto});
  }

  findAll() {
    return this.prisma.caseManager.findMany();
  }

  findOne(id: number) {
    return this.prisma.caseManager.findUnique({where: {id}});
  }

  update(id: number, updateCaseManagerDto: UpdateCaseManagerDto) {
    return this.prisma.caseManager.update({
      where: { id },
      data: updateCaseManagerDto,
    });;
  }

  remove(id: number) {
    return this.prisma.agency.delete({where: { id }});;
  }
}
