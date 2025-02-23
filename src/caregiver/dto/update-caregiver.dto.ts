import { IsString, IsOptional, IsBoolean, IsEmail } from 'class-validator';

export class UpdateCaregiverDto {
  @IsOptional()
  @IsString()
  name?: string; // Nombre del cuidador (opcional)

  @IsOptional()
  @IsEmail()
  email?: string; // Correo electrónico (opcional)

  @IsOptional()
  @IsString()
  phone?: string; // Teléfono (opcional)

  @IsOptional()
  @IsBoolean()
  isActive?: boolean; // Estado del cuidador (opcional)
}
