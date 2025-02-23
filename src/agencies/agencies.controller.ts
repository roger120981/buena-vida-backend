/* import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('agencies')
@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  // Crear una nueva agencia
  @Post()
  @ApiBody({
    description: 'Datos para crear una nueva agencia',
    schema: {
      type: 'object',
      properties: {
        name: { 
          type: 'string', 
          minLength: 2, 
          description: 'Nombre de la agencia, debe tener al menos 2 caracteres'
        },
      },
      required: ['name'], // El nombre es obligatorio al crear una nueva agencia
    },
  })  
  create(@Body() createAgenciesDto: CreateAgencyDto) {
    return this.agenciesService.create(createAgenciesDto);
  }

  // Obtener todas las agencias
  @Get()
  findAll() {
    return this.agenciesService.findAll();
  }

  // Obtener una agencia por id
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.agenciesService.findOne(id);
  }

  // Actualizar una agencia
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una agencia existente' })
  @ApiBody({
    description: 'Datos para actualizar una agencia',
    schema: {
      type: 'object',
      properties: {
        name: { 
          type: 'string', 
          minLength: 2, 
          description: 'Nombre de la agencia, debe tener al menos 2 caracteres' 
        },
      },
      required: ['name'], // El nombre es obligatorio al actualizar una agencia
    },
  })
  @ApiResponse({
    status: 200,
    description: 'La agencia ha sido actualizada correctamente.',
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 404, description: 'Agencia no encontrada' })
  update(@Param('id') id: number, @Body() updateAgenciesDto: UpdateAgencyDto) {
    return this.agenciesService.update(id, updateAgenciesDto);
  }

  // Eliminar una agencia
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.agenciesService.remove(id);
  }
}
 */

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Agencies')
@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  // Crear una nueva agencia
  @Post()
  @ApiBody({
    description: 'Datos para crear una nueva agencia',
    schema: {
      type: 'object',
      properties: {
        name: { 
          type: 'string', 
          minLength: 2, 
          description: 'Nombre de la agencia, debe tener al menos 2 caracteres',
        },
      },
      required: ['name'], // El nombre es obligatorio al crear una nueva agencia
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Agencia creada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud incorrecta',
  })
  create(@Body() createAgenciesDto: CreateAgencyDto) {
    return this.agenciesService.create(createAgenciesDto);
  }

  // Obtener todas las agencias
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las agencias',
  })
  findAll() {
    return this.agenciesService.findAll();
  }

  // Obtener una agencia por id
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Agencia encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Agencia no encontrada',
  })
  findOne(@Param('id') id: number) {
    return this.agenciesService.findOne(id);
  }

  // Actualizar una agencia
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una agencia existente' })
  @ApiBody({
    description: 'Datos para actualizar una agencia',
    schema: {
      type: 'object',
      properties: {
        name: { 
          type: 'string', 
          minLength: 2, 
          description: 'Nombre de la agencia, debe tener al menos 2 caracteres' 
        },
      },
      required: ['name'], // El nombre es obligatorio al actualizar una agencia
    },
  })
  @ApiResponse({
    status: 200,
    description: 'La agencia ha sido actualizada correctamente.',
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 404, description: 'Agencia no encontrada' })
  update(@Param('id') id: number, @Body() updateAgenciesDto: UpdateAgencyDto) {
    return this.agenciesService.update(id, updateAgenciesDto);
  }

  // Eliminar una agencia
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Agencia eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Agencia no encontrada',
  })
  remove(@Param('id') id: number) {
    return this.agenciesService.remove(id);
  }
}
