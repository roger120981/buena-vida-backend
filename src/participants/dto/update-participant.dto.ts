import { IsString, IsBoolean, IsNumber, IsDateString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCaseManagerDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsString({ message: 'Email must be a string' })
  email: string;

  @IsString({ message: 'Phone must be a string' })
  phone: string;

  @IsNumber({}, { message: 'AgencyId must be a number' })
  agencyId: number;
}

export class ConnectCaseManagerDto {
  @IsNumber({}, { message: 'ID must be a number' })
  id: number;
}

export class CaseManagerRelationDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCaseManagerDto)
  create?: CreateCaseManagerDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectCaseManagerDto)
  connect?: ConnectCaseManagerDto;
}

export class UpdateParticipantDto {
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;

  @IsBoolean({ message: 'IsActive must be a boolean' })
  @IsOptional()
  isActive?: boolean;

  @IsString({ message: 'Gender must be a string' })
  @IsOptional()
  gender?: string;

  @IsString({ message: 'MedicaidId must be a string' })
  @IsOptional()
  medicaidId?: string;

  @IsDateString({}, { message: 'Dob must be a valid date string' })
  @IsOptional()
  dob?: string;

  @IsString({ message: 'Location must be a string' })
  @IsOptional()
  location?: string;

  @IsString({ message: 'Community must be a string' })
  @IsOptional()
  community?: string;

  @IsString({ message: 'Address must be a string' })
  @IsOptional()
  address?: string;

  @IsString({ message: 'PrimaryPhone must be a string' })
  @IsOptional()
  primaryPhone?: string;

  @IsString({ message: 'SecondaryPhone must be a string' })
  @IsOptional()
  secondaryPhone?: string;

  @IsDateString({}, { message: 'LocStartDate must be a valid date string' })
  @IsOptional()
  locStartDate?: string;

  @IsDateString({}, { message: 'LocEndDate must be a valid date string' })
  @IsOptional()
  locEndDate?: string;

  @IsDateString({}, { message: 'PocStartDate must be a valid date string' })
  @IsOptional()
  pocStartDate?: string;

  @IsDateString({}, { message: 'PocEndDate must be a valid date string' })
  @IsOptional()
  pocEndDate?: string;

  @IsNumber({}, { message: 'Units must be a number' })
  @IsOptional()
  units?: number;

  @IsNumber({}, { message: 'Hours must be a number' })
  @IsOptional()
  hours?: number;

  @IsBoolean({ message: 'Hdm must be a boolean' })
  @IsOptional()
  hdm?: boolean;

  @IsBoolean({ message: 'Adhc must be a boolean' })
  @IsOptional()
  adhc?: boolean;

  @IsOptional()
  @ValidateNested({ message: 'CaseManager must be a valid nested object' })
  @Type(() => CaseManagerRelationDto)
  caseManager?: CaseManagerRelationDto;
}