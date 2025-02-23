/* import { CreateParticipantSchema } from './create-participant.dto';
import { z } from 'zod';

export const UpdateParticipantSchema = CreateParticipantSchema.partial();
export type UpdateParticipantDto = z.infer<typeof UpdateParticipantSchema>; */

import { PartialType } from "@nestjs/swagger";
import { CreateParticipantDto } from "./create-participant.dto";

// DTO de actualización utilizando PartialType
export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {}
