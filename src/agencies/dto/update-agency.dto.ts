import { z } from 'zod';

export const UpdateAgencySchema = z.object({
  name: z.string().min(2, 'Agency name must have at least 2 characters').optional(),
});

export type UpdateAgencyDto = z.infer<typeof UpdateAgencySchema>;
