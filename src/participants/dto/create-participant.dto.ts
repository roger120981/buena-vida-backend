import { IsString, IsOptional, ValidateNested, IsBoolean, IsInt, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

class CreateAgencyDto {
  @IsString()
  name: string;
}

class ConnectAgencyDto {
  @IsOptional()
  @IsInt()
  id?: number;
}

class CreateCaseManagerDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAgencyDto)
  agency?: {
    create?: CreateAgencyDto;
    connect?: ConnectAgencyDto;
  };
}

class ConnectCaseManagerDto {
  @IsOptional()
  @IsInt()
  id?: number;
}

export class CreateParticipantDto {
  @IsString()
  name: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  gender: string;

  @IsString()
  medicaidId: string;

  @IsDateString()
  dob: string;

  @IsString()
  location: string;

  @IsString()
  community: string;

  @IsString()
  address: string;

  @IsString()
  primaryPhone: string;

  @IsString()
  @IsOptional()
  secondaryPhone?: string;

  @IsDateString()
  locStartDate: string;

  @IsDateString()
  locEndDate: string;

  @IsDateString()
  pocStartDate: string;

  @IsDateString()
  pocEndDate: string;

  @IsOptional()
  @IsInt()
  units?: number;

  @IsOptional()
  @IsInt()
  hours?: number;

  @IsOptional()
  @IsBoolean()
  hdm?: boolean;

  @IsOptional()
  @IsBoolean()
  adhc?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCaseManagerDto)
  caseManager?: {
    create?: CreateCaseManagerDto;
    connect?: ConnectCaseManagerDto;
  };
}


