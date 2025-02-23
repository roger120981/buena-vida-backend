import { IsString, IsOptional, IsBoolean, IsEmail } from 'class-validator';

export class CreateCaregiverDto {
  @IsString()
  name: string; // Nombre del cuidador (obligatorio)

  @IsOptional()
  @IsEmail()
  email?: string; // Correo electrónico (opcional)

  @IsOptional()
  @IsString()
  phone?: string; // Teléfono (opcional)

  @IsBoolean()
  isActive: boolean; // Estado del cuidador (activo o no activo)
}
