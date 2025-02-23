import { PartialType } from "@nestjs/swagger";
import { CreateParticipantDto } from "./create-participant.dto";

// DTO de actualización utilizando PartialType
export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {}
