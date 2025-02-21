import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CaregiversService } from './caregivers.service';
import { CreateCaregiverDto, CreateCaregiverSchema } from './dto/create-caregiver.dto';
import { UpdateCaregiverDto, UpdateCaregiverSchema } from './dto/update-caregiver.dto';
import { ValidationException } from '../common/exceptions/validation.exception';
import { NotFoundException } from '../common/exceptions/not-found.exception';

@Controller('caregivers')
export class CaregiversController {
  constructor(private readonly caregiversService: CaregiversService) {}

  @Post()
  async create(@Body() createCaregiverDto: CreateCaregiverDto) {
    const parsed = CreateCaregiverSchema.safeParse(createCaregiverDto);
    if (!parsed.success) throw new ValidationException(parsed.error.format());
    return this.caregiversService.create(parsed.data);
  }

  @Get()
  async findAll() {
    return this.caregiversService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const caregiver = await this.caregiversService.findOne(+id);
    if (!caregiver) throw new NotFoundException('Caregiver', id);
    return caregiver;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCaregiverDto: UpdateCaregiverDto) {
    const parsed = UpdateCaregiverSchema.safeParse(updateCaregiverDto);
    if (!parsed.success) throw new ValidationException(parsed.error.format());
    return this.caregiversService.update(+id, parsed.data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.caregiversService.remove(+id);
    if (!deleted) throw new NotFoundException('Caregiver', id);
    return { success: true, message: 'Caregiver deleted successfully' };
  }
}
