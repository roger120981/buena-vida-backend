import { IsString, IsOptional } from 'class-validator';

export class UpdateAgencyDto {
  @IsOptional()
  @IsString()
  name?: string;  // El nombre de la agencia (opcional para actualizar parcialmente)
}
