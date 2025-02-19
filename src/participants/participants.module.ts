// participants.module.ts
import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { ParticipantRepository } from './repositories/participant.repository';
import { NotificationsGateway } from '../notifications.gateway';
import { WebhookService } from '../webhook.service';

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsService, ParticipantRepository, NotificationsGateway, WebhookService],
  exports: [ParticipantsService],
})
export class ParticipantsModule {}