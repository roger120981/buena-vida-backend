import { PartialType } from '@nestjs/swagger';
import { CreateCaseManagerDto } from './create-case-manager.dto';

export class UpdateCaseManagerDto extends PartialType(CreateCaseManagerDto) {}
