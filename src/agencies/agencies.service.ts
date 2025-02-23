/* import { Injectable } from '@nestjs/common';
import { AgencyRepository } from './repositories/agency.repository';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';

@Injectable()
export class AgenciesService {
  constructor(private readonly agenciesRepository: AgencyRepository) {}

  // Crear una nueva agencia
  create(createAgenciesDto: CreateAgencyDto) {
    return this.agenciesRepository.create(createAgenciesDto);
  }

  // Obtener todas las agencias
  findAll() {
    return this.agenciesRepository.findAll();
  }

  // Obtener una agencia por id
  findOne(id: number) {
    return this.agenciesRepository.findOne(id);
  }

  // Actualizar una agencia
  update(id: number, updateAgenciesDto: UpdateAgencyDto) {
    return this.agenciesRepository.update(id, updateAgenciesDto);
  }

  // Eliminar una agencia
  remove(id: number) {
    return this.agenciesRepository.remove(id);
  }
}
 */

import { Injectable } from '@nestjs/common';
import { AgencyRepository } from './repositories/agency.repository';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';

@Injectable()
export class AgenciesService {
  constructor(private readonly agenciesRepository: AgencyRepository) {}

  // Crear una nueva agencia
  create(createAgenciesDto: CreateAgencyDto) {
    return this.agenciesRepository.create(createAgenciesDto);
  }

  // Obtener todas las agencias
  findAll() {
    return this.agenciesRepository.findAll();
  }

  // Obtener una agencia por id
  findOne(id: number) {
    return this.agenciesRepository.findOne(id);
  }

  // Actualizar una agencia
  update(id: number, updateAgenciesDto: UpdateAgencyDto) {
    return this.agenciesRepository.update(id, updateAgenciesDto);
  }

  // Eliminar una agencia
  remove(id: number) {
    return this.agenciesRepository.remove(id);
  }
}
