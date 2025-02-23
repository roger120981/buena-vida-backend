/* import { z } from 'zod';

export const UpdateAgencySchema = z.object({
  name: z.string().min(2, 'Agency name must have at least 2 characters').optional(),
});

export type UpdateAgencyDto = z.infer<typeof UpdateAgencySchema>;
 */

import { IsString, IsOptional } from 'class-validator';

export class UpdateAgencyDto {
  @IsOptional()
  @IsString()
  name?: string;  // El nombre de la agencia (opcional para actualizar parcialmente)
}
