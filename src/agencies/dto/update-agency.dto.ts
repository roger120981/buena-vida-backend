import { IsString, IsOptional } from 'class-validator';

/**
 * DTO para actualizar una agencia existente.
 */
export class UpdateAgencyDto {
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;
}