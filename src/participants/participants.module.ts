// participants.module.ts
import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { ParticipantRepository } from './repositories/participant.repository';

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsService, ParticipantRepository],
  exports: [ParticipantsService],
})
export class ParticipantsModule {}