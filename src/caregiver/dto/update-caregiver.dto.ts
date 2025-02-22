import { z } from 'zod';

export const UpdateCaregiverSchema = z.object({
  name: z.string().min(2, 'Caregiver name must have at least 2 characters').optional(),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be a valid 10-digit number').optional(),
  isActive: z.boolean().optional(),
});

export type UpdateCaregiverDto = z.infer<typeof UpdateCaregiverSchema>;
