import { Transform, Type } from 'class-transformer';
import { IsString, IsEmail, IsBoolean, IsOptional, IsInt, ValidateNested } from 'class-validator';
import { ConnectAgencyDto, CreateAgencyDto } from 'src/agencies/dto/create-agency.dto';

export class CreateCaseManagerDto {
  @IsString()
  @Transform(({ value }) => value.toString())
  name: string;

  @IsString()
  @Transform(({ value }) => value.toString())
  email: string;

  @IsString()
  @Transform(({ value }) => value.toString())
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
