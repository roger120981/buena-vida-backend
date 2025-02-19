import { Injectable } from '@nestjs/common';
import { CaseManagerRepository } from './repositories/case-manager.repository';
import { CreateCaseManagerDto } from './dto/create-case-manager.dto';
import { UpdateCaseManagerDto } from './dto/update-case-manager.dto';

@Injectable()
export class CaseManagersService {
  constructor(private readonly caseManagerRepository: CaseManagerRepository) {}

  create(createCaseManagerDto: CreateCaseManagerDto) {
    return this.caseManagerRepository.create(createCaseManagerDto);
  }

  findAll() {
    return this.caseManagerRepository.findAll();
  }

  findOne(id: number) {
    return this.caseManagerRepository.findOne(id);
  }

  update(id: number, updateCaseManagerDto: UpdateCaseManagerDto) {
    return this.caseManagerRepository.update(id, updateCaseManagerDto);
  }

  remove(id: number) {
    return this.caseManagerRepository.remove(id);
  }
}
