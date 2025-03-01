import { IsString, IsInt, IsOptional } from 'class-validator';

/**
 * DTO para crear un nuevo administrador de casos.
 */
export class CreateCaseManagerDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsString({ message: 'Email must be a string' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'Phone must be a string' })
  @IsOptional()
  phone?: string;

  @IsInt({ message: 'AgencyId must be an integer' })
  agencyId: number;
}