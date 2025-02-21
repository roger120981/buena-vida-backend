import { z } from 'zod';

export const CreateCaregiverSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters').max(255, 'Name must be at most 255 characters'),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be a valid 10-digit number').optional(),
  address: z.string().min(5, 'Address must have at least 5 characters'),
  isActive: z.boolean(),
});

export type CreateCaregiverDto = z.infer<typeof CreateCaregiverSchema>;


  

