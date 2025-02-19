import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CaregiversService } from './caregivers.service';
import { CreateCaregiverDto } from './dto/create-caregiver.dto';
import { UpdateCaregiverDto } from './dto/update-caregiver.dto';

@Controller('caregivers')
export class CaregiversController {
  constructor(private readonly caregiversService: CaregiversService) {}

  @Post()
  create(@Body() createCaregiverDto: CreateCaregiverDto) {
    return this.caregiversService.create(createCaregiverDto);
  }

  @Get()
  findAll() {
    return this.caregiversService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caregiversService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCaregiverDto: UpdateCaregiverDto) {
    return this.caregiversService.update(+id, updateCaregiverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caregiversService.remove(+id);
  }
}

