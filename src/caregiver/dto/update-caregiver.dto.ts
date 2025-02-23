/* import { z } from 'zod';

export const UpdateCaregiverSchema = z.object({
  name: z.string().min(2, 'Caregiver name must have at least 2 characters').optional(),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be a valid 10-digit number').optional(),
  isActive: z.boolean().optional(),
});

export type UpdateCaregiverDto = z.infer<typeof UpdateCaregiverSchema>;
 */

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
