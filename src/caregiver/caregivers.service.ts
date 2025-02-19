import { Injectable } from '@nestjs/common';
import { CaregiverRepository } from './repositories/caregiver.repository';
import { CreateCaregiverDto } from './dto/create-caregiver.dto';
import { UpdateCaregiverDto } from './dto/update-caregiver.dto';

@Injectable()
export class CaregiversService {
  constructor(private readonly caregiverRepository: CaregiverRepository) {}

  create(createCaregiverDto: CreateCaregiverDto) {
    return this.caregiverRepository.create(createCaregiverDto);
  }

  findAll() {
    return this.caregiverRepository.findAll();
  }

  findOne(id: number) {
    return this.caregiverRepository.findOne(id);
  }

  update(id: number, updateCaregiverDto: UpdateCaregiverDto) {
    return this.caregiverRepository.update(id, updateCaregiverDto);
  }

  remove(id: number) {
    return this.caregiverRepository.remove(id);
  }
}

