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

export class CreateParticipantDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsBoolean({ message: 'IsActive must be a boolean' })
  isActive: boolean;

  @IsString({ message: 'Gender must be a string' })
  gender: string;

  @IsString({ message: 'MedicaidId must be a string' })
  medicaidId: string;

  @IsDateString({}, { message: 'Dob must be a valid date string' })
  dob: string;

  @IsString({ message: 'Location must be a string' })
  location: string;

  @IsString({ message: 'Community must be a string' })
  community: string;

  @IsString({ message: 'Address must be a string' })
  address: string;

  @IsString({ message: 'PrimaryPhone must be a string' })
  primaryPhone: string;

  @IsString({ message: 'SecondaryPhone must be a string' })
  @IsOptional()
  secondaryPhone?: string;

  @IsDateString({}, { message: 'LocStartDate must be a valid date string' })
  locStartDate: string;

  @IsDateString({}, { message: 'LocEndDate must be a valid date string' })
  locEndDate: string;

  @IsDateString({}, { message: 'PocStartDate must be a valid date string' })
  pocStartDate: string;

  @IsDateString({}, { message: 'PocEndDate must be a valid date string' })
  pocEndDate: string;

  @IsOptional()
  @IsNumber({}, { message: 'Units must be a number' })
  units?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Hours must be a number' })
  hours?: number;

  @IsOptional()
  @IsBoolean({ message: 'Hdm must be a boolean' })
  hdm?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Adhc must be a boolean' })
  adhc?: boolean;

  @ValidateNested({ message: 'CaseManager is required and must be a valid nested object' })
  @Type(() => CaseManagerRelationDto)
  caseManager: CaseManagerRelationDto; // Ahora obligatorio
}