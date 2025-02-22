 import { z } from 'zod';

export const CreateCaseManagerSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be a valid 10-digit number').optional(),
  agency: z.object({
    create: z.object({
      name: z.string(),  // Crear una agencia si no existe
    }).optional(),
    connect: z.object({
      id: z.number(), // Conectar una agencia existente por id
    }).optional(),
  }).optional(),
});

export type CreateCaseManagerDto = z.infer<typeof CreateCaseManagerSchema>;
     


