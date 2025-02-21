import { Injectable, NotFoundException } from '@nestjs/common';
import { CaregiverRepository } from './repositories/caregiver.repository';
import { CreateCaregiverDto } from './dto/create-caregiver.dto';
import { UpdateCaregiverDto } from './dto/update-caregiver.dto';
import { Caregiver } from '@prisma/client';

@Injectable()
export class CaregiversService {
  constructor(private readonly caregiverRepository: CaregiverRepository) {}

  async create(createCaregiverDto: CreateCaregiverDto) {
    return this.caregiverRepository.create(createCaregiverDto);
  }

  async findAll() {
    return this.caregiverRepository.findAll();
  }


  // Método para encontrar un cuidador por ID
  async findById(caregiverId: number): Promise<Caregiver> {
    // Validación para verificar que el ID es un número válido
    if (isNaN(caregiverId)) {
      throw new Error('The caregiverId must be a valid number');
    }

    // Buscar al cuidador usando el repositorio
    const caregiver = await this.caregiverRepository.findById(caregiverId);

    // Si no se encuentra el cuidador, lanzar una excepción
    if (!caregiver) {
      throw new NotFoundException(`Caregiver with ID ${caregiverId} not found`);
    }

    return caregiver;
  }
  
  async findOne(id: number) {
    return this.caregiverRepository.findOne(id);
  }

  async update(id: number, updateCaregiverDto: UpdateCaregiverDto) {
    return this.caregiverRepository.update(id, updateCaregiverDto);
  }

  async remove(id: number) {
    return this.caregiverRepository.remove(id);
  }
}
