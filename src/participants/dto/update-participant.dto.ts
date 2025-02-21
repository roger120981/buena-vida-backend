import { CreateParticipantSchema } from './create-participant.dto';
import { z } from 'zod';

export const UpdateParticipantSchema = CreateParticipantSchema.partial();
export type UpdateParticipantDto = z.infer<typeof UpdateParticipantSchema>;

