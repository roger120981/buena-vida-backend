import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAgencyDto {
  @IsString()
  name: string;
}

export class ConnectAgencyDto {
  @IsOptional()
  @IsInt()
  id?: number;
}
