import { CreateCaregiverSchema } from './create-caregiver.dto';
import { z } from 'zod';

export const UpdateCaregiverSchema = CreateCaregiverSchema.partial();
export type UpdateCaregiverDto = z.infer<typeof UpdateCaregiverSchema>;

