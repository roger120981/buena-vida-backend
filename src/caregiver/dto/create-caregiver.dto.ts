import { z } from 'zod';

export const CreateCaregiverSchema = z.object({
  name: z.string().min(2, 'Caregiver name must have at least 2 characters'),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be a valid 10-digit number').optional(),
  isActive: z.boolean(),
});

export type CreateCaregiverDto = z.infer<typeof CreateCaregiverSchema>;
