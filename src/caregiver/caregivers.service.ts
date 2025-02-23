/* import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CaregiverRepository } from './repositories/caregiver.repository';
import { CreateCaregiverDto } from './dto/create-caregiver.dto';
import { UpdateCaregiverDto } from './dto/update-caregiver.dto';
import { Caregiver } from '@prisma/client';

@Injectable()
export class CaregiversService {
  constructor(private readonly caregiverRepository: CaregiverRepository) {}

  // Crear un nuevo Caregiver
  async create(createCaregiverDto: CreateCaregiverDto): Promise<Caregiver> {
    return this.caregiverRepository.create(createCaregiverDto);
  }

  // Obtener todos los Caregivers
  async findAll(): Promise<Caregiver[]> {
    return this.caregiverRepository.findAll();
  }

  // Buscar un Caregiver por ID
  async findById(caregiverId: number): Promise<Caregiver> {
    // Verificamos que el ID sea un número válido
    if (isNaN(caregiverId)) {
      throw new BadRequestException('The caregiverId must be a valid number');
    }

    // Buscar al cuidador en la base de datos
    const caregiver = await this.caregiverRepository.findById(caregiverId);

    // Si el cuidador no existe, lanzamos una excepción
    if (!caregiver) {
      throw new NotFoundException(`Caregiver with ID ${caregiverId} not found`);
    }

    return caregiver;
  }

  // Obtener un Caregiver por su ID
  async findOne(id: number): Promise<Caregiver | null> {
    return this.caregiverRepository.findOne(id);
  }

  // Actualizar un Caregiver
  async update(id: number, updateCaregiverDto: UpdateCaregiverDto): Promise<Caregiver> {
    // Verificamos que el ID sea válido antes de actualizar
    const caregiver = await this.findById(id); // Aquí reutilizamos la validación
    if (!caregiver) {
      throw new NotFoundException(`Caregiver with ID ${id} not found`);
    }

    return this.caregiverRepository.update(id, updateCaregiverDto);
  }

  // Eliminar un Caregiver
  async remove(id: number): Promise<Caregiver> {
    const caregiver = await this.findById(id); // Verificamos que exista el Caregiver
    if (!caregiver) {
      throw new NotFoundException(`Caregiver with ID ${id} not found`);
    }

    return this.caregiverRepository.remove(id);
  }
}
 */

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CaregiverRepository } from './repositories/caregiver.repository';
import { CreateCaregiverDto } from './dto/create-caregiver.dto';
import { UpdateCaregiverDto } from './dto/update-caregiver.dto';
import { Caregiver } from '@prisma/client';

@Injectable()
export class CaregiversService {
  constructor(private readonly caregiverRepository: CaregiverRepository) {}

  // Crear un nuevo Caregiver
  async create(createCaregiverDto: CreateCaregiverDto): Promise<Caregiver> {
    return this.caregiverRepository.create(createCaregiverDto);
  }

  // Obtener todos los Caregivers
  async findAll(): Promise<Caregiver[]> {
    return this.caregiverRepository.findAll();
  }

  // Buscar un Caregiver por ID
  async findById(caregiverId: number): Promise<Caregiver> {
    // Verificamos que el ID sea un número válido
    if (isNaN(caregiverId)) {
      throw new BadRequestException('The caregiverId must be a valid number');
    }

    // Buscar al cuidador en la base de datos
    const caregiver = await this.caregiverRepository.findById(caregiverId);

    // Si el cuidador no existe, lanzamos una excepción
    if (!caregiver) {
      throw new NotFoundException(`Caregiver with ID ${caregiverId} not found`);
    }

    return caregiver;
  }

  // Obtener un Caregiver por su ID
  async findOne(id: number): Promise<Caregiver | null> {
    return this.caregiverRepository.findOne(id);
  }

  // Actualizar un Caregiver
  async update(id: number, updateCaregiverDto: UpdateCaregiverDto): Promise<Caregiver> {
    // Verificamos que el ID sea válido antes de actualizar
    const caregiver = await this.findById(id); // Aquí reutilizamos la validación
    if (!caregiver) {
      throw new NotFoundException(`Caregiver with ID ${id} not found`);
    }

    return this.caregiverRepository.update(id, updateCaregiverDto);
  }

  // Eliminar un Caregiver
  async remove(id: number): Promise<Caregiver> {
    const caregiver = await this.findById(id); // Verificamos que exista el Caregiver
    if (!caregiver) {
      throw new NotFoundException(`Caregiver with ID ${id} not found`);
    }

    return this.caregiverRepository.remove(id);
  }
}
