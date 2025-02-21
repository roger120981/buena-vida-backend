import { CreateCaseManagerSchema } from './create-case-manager.dto';
import { z } from 'zod';

export const UpdateCaseManagerSchema = CreateCaseManagerSchema.partial();
export type UpdateCaseManagerDto = z.infer<typeof UpdateCaseManagerSchema>;
