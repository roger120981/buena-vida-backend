import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CaseManagersService } from './case-managers.service';
import { CreateCaseManagerDto } from './dto/create-case-manager.dto';
import { UpdateCaseManagerDto } from './dto/update-case-manager.dto';

@Controller('case-managers')
export class CaseManagersController {
  constructor(private readonly caseManagersService: CaseManagersService) {}

  @Post()
  create(@Body() createCaseManagerDto: CreateCaseManagerDto) {
    return this.caseManagersService.create(createCaseManagerDto);
  }

  @Get()
  findAll() {
    return this.caseManagersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caseManagersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCaseManagerDto: UpdateCaseManagerDto) {
    return this.caseManagersService.update(+id, updateCaseManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caseManagersService.remove(+id);
  }
}
