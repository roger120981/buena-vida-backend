/* import { Injectable } from '@nestjs/common';
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
 */

import { Injectable } from '@nestjs/common';
import { CaseManagerRepository } from './repositories/case-manager.repository';
import { CreateCaseManagerDto } from './dto/create-case-manager.dto';
import { UpdateCaseManagerDto } from './dto/update-case-manager.dto';

@Injectable()
export class CaseManagersService {
  constructor(private readonly caseManagerRepository: CaseManagerRepository) {}

  // Crear un nuevo CaseManager
  create(createCaseManagerDto: CreateCaseManagerDto) {
    return this.caseManagerRepository.create(createCaseManagerDto);
  }

  // Obtener todos los CaseManagers
  findAll() {
    return this.caseManagerRepository.findAll();
  }

  // Obtener un CaseManager por ID
  findOne(id: number) {
    return this.caseManagerRepository.findOne(id);
  }

  // Actualizar un CaseManager por ID
  update(id: number, updateCaseManagerDto: UpdateCaseManagerDto) {
    return this.caseManagerRepository.update(id, updateCaseManagerDto);
  }

  // Eliminar un CaseManager por ID
  remove(id: number) {
    return this.caseManagerRepository.remove(id);
  }
}
