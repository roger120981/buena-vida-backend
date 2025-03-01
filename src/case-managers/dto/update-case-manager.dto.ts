import { IsString, IsInt, IsOptional } from 'class-validator';

/**
 * DTO para actualizar un administrador de casos existente.
 */
export class UpdateCaseManagerDto {
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'Email must be a string' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'Phone must be a string' })
  @IsOptional()
  phone?: string;

  @IsInt({ message: 'AgencyId must be an integer' })
  @IsOptional()
  agencyId?: number;
}