import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';

@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  // Crear una nueva agencia
  @Post()
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
  update(@Param('id') id: number, @Body() updateAgenciesDto: UpdateAgencyDto) {
    return this.agenciesService.update(id, updateAgenciesDto);
  }

  // Eliminar una agencia
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.agenciesService.remove(id);
  }
}
