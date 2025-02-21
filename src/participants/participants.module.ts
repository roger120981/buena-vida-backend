// participants.module.ts
import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { ParticipantRepository } from './repositories/participant.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CaregiversModule } from 'src/caregiver/caregivers.module';

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsService, ParticipantRepository],
  exports: [ParticipantsService],
  imports: [PrismaModule, CaregiversModule],
})
export class ParticipantsModule {}