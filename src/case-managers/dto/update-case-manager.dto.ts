import { PartialType } from '@nestjs/swagger';
import { CreateCaseManagerDto } from './create-case-manager.dto';

// DTO de actualización utilizando PartialType
export class UpdateCaseManagerDto extends PartialType(CreateCaseManagerDto) {}
