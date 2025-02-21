import { z } from 'zod';

export const CreateCaseManagerSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'), // Campo obligatorio
  email: z.string().email('Invalid email format').optional(),     // Campo opcional
  phone: z.string().regex(/^\d{10}$/, 'Phone must be a valid 10-digit number').optional(),  // Campo opcional
  agencyId: z.number().int().positive('Agency ID must be a valid positive number'),  // Campo obligatorio
});

export type CreateCaseManagerDto = z.infer<typeof CreateCaseManagerSchema>;

     
