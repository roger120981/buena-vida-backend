/* import { z } from 'zod';

export const CreateCaregiverSchema = z.object({
  name: z.string().min(2, 'Caregiver name must have at least 2 characters'),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be a valid 10-digit number').optional(),
  isActive: z.boolean(),
});

export type CreateCaregiverDto = z.infer<typeof CreateCaregiverSchema>;
 */

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
