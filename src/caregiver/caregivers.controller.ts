/* import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { CaregiversService } from './caregivers.service';
import { CreateCaregiverDto, CreateCaregiverSchema } from './dto/create-caregiver.dto';
import { UpdateCaregiverDto, UpdateCaregiverSchema } from './dto/update-caregiver.dto';
import { NotFoundException } from '../common/exceptions/not-found.exception';

@Controller('caregivers')
export class CaregiversController {
  constructor(private readonly caregiversService: CaregiversService) {}

  // Crear un nuevo Caregiver
  @Post()
  async create(@Body() createCaregiverDto: CreateCaregiverDto) {
    // Validación usando Zod
    const parsed = CreateCaregiverSchema.safeParse(createCaregiverDto);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.errors);  // Usamos BadRequestException para los errores de validación
    }
    return this.caregiversService.create(parsed.data); // Llamamos al servicio para crear el Caregiver
  }

  // Obtener todos los Caregivers
  @Get()
  async findAll() {
    return this.caregiversService.findAll();
  }

  // Obtener un Caregiver por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const caregiverId = +id;  // Convertimos el id a número
    if (isNaN(caregiverId)) {
      throw new BadRequestException('The caregiver ID must be a valid number');
    }

    const caregiver = await this.caregiversService.findOne(caregiverId);
    if (!caregiver) {
      throw new NotFoundException('Caregiver', id);  // Lanzamos una excepción si no encontramos el recurso
    }
    return caregiver;
  }

  // Actualizar un Caregiver
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCaregiverDto: UpdateCaregiverDto) {
    const parsed = UpdateCaregiverSchema.safeParse(updateCaregiverDto);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.errors);  // Usamos BadRequestException para los errores de validación
    }
    return this.caregiversService.update(+id, parsed.data); // Llamamos al servicio para actualizar el Caregiver
  }

  // Eliminar un Caregiver
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const caregiverId = +id;  // Convertimos el id a número
    if (isNaN(caregiverId)) {
      throw new BadRequestException('The caregiver ID must be a valid number');
    }

    const deleted = await this.caregiversService.remove(caregiverId);
    if (!deleted) {
      throw new NotFoundException('Caregiver', id);  // Lanzamos una excepción si no encontramos el recurso
    }
    return { success: true, message: 'Caregiver deleted successfully' }; // Mensaje de éxito
  }
}
 */

import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { CaregiversService } from './caregivers.service';
import { CreateCaregiverDto } from './dto/create-caregiver.dto';
import { UpdateCaregiverDto } from './dto/update-caregiver.dto';
import { NotFoundException } from '../common/exceptions/not-found.exception';

@Controller('caregivers')
export class CaregiversController {
  constructor(private readonly caregiversService: CaregiversService) {}

  // Crear un nuevo Caregiver
  @Post()
  async create(@Body() createCaregiverDto: CreateCaregiverDto) {
    return this.caregiversService.create(createCaregiverDto); // Llamamos al servicio para crear el Caregiver
  }

  // Obtener todos los Caregivers
  @Get()
  async findAll() {
    return this.caregiversService.findAll();
  }

  // Obtener un Caregiver por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const caregiverId = +id;  // Convertimos el id a número
    if (isNaN(caregiverId)) {
      throw new BadRequestException('The caregiver ID must be a valid number');
    }

    const caregiver = await this.caregiversService.findOne(caregiverId);
    if (!caregiver) {
      throw new NotFoundException('Caregiver', id);  // Lanzamos una excepción si no encontramos el recurso
    }
    return caregiver;
  }

  // Actualizar un Caregiver
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCaregiverDto: UpdateCaregiverDto) {
    return this.caregiversService.update(+id, updateCaregiverDto); // Llamamos al servicio para actualizar el Caregiver
  }

  // Eliminar un Caregiver
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const caregiverId = +id;  // Convertimos el id a número
    if (isNaN(caregiverId)) {
      throw new BadRequestException('The caregiver ID must be a valid number');
    }

    const deleted = await this.caregiversService.remove(caregiverId);
    if (!deleted) {
      throw new NotFoundException('Caregiver', id);  // Lanzamos una excepción si no encontramos el recurso
    }
    return { success: true, message: 'Caregiver deleted successfully' }; // Mensaje de éxito
  }
}
