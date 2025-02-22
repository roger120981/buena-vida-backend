import { z } from 'zod';
import { CreateCaseManagerSchema } from './create-case-manager.dto'; // Usamos el schema de creación para la base

export const UpdateCaseManagerSchema = CreateCaseManagerSchema.extend({
  // Ahora, hacemos los campos opcionales para la actualización
  name: z.string().min(2, 'Name must have at least 2 characters').optional(),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be a valid 10-digit number').optional(),
  agency: z.object({
    connect: z.object({
      id: z.number(),
    }).optional(),
  }).optional(),
});

export type UpdateCaseManagerDto = z.infer<typeof UpdateCaseManagerSchema>;
