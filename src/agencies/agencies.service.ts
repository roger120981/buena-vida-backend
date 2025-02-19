import { Injectable } from '@nestjs/common';
import { AgencyRepository } from './repositories/agency.repository';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';

@Injectable()
export class AgenciesService {
  constructor(private readonly agencyRepository: AgencyRepository) {}

  create(createAgencyDto: CreateAgencyDto) {
    return this.agencyRepository.create(createAgencyDto);
  }

  findAll() {
    return this.agencyRepository.findAll();
  }

  findOne(id: number) {
    return this.agencyRepository.findOne(id);
  }

  update(id: number, updateAgencyDto: UpdateAgencyDto) {
    return this.agencyRepository.update(id, updateAgencyDto);
  }

  remove(id: number) {
    return this.agencyRepository.remove(id);
  }
}
