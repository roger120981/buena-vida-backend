import { IsString, IsBoolean, IsOptional } from 'class-validator';

/**
 * DTO para actualizar un cuidador existente.
 */
export class UpdateCaregiverDto {
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'Email must be a string' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'Phone must be a string' })
  @IsOptional()
  phone?: string;

  @IsBoolean({ message: 'IsActive must be a boolean' })
  @IsOptional()
  isActive?: boolean;
}