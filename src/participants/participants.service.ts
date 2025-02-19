// participants.service.ts
import { Injectable } from '@nestjs/common';
import { ParticipantRepository } from './repositories/participant.repository';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { NotificationsGateway } from '../notifications.gateway';
import { WebhookService } from '../webhook.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { FilterDto } from '../common/dto/filter.dto';

@Injectable()
export class ParticipantsService {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly notificationsGateway: NotificationsGateway,
    private readonly webhookService: WebhookService,
  ) {}

  async create(createParticipantDto: CreateParticipantDto) {
    const newParticipant = await this.participantRepository.create(createParticipantDto);
    this.notificationsGateway.notifyAll(`Nuevo participante creado: ${newParticipant.name}`);
    this.webhookService.sendWebhook('https://crm.miempresa.com/webhooks', { event: 'participant_created', data: newParticipant });
    return newParticipant;
  }

  async findAll(paginationDto: PaginationDto, filterDto: FilterDto) {
    return this.participantRepository.findAll(paginationDto, filterDto);
  }

  async findOne(id: number) {
    return this.participantRepository.findOne(id);
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    const updatedParticipant = await this.participantRepository.update(id, updateParticipantDto);
    this.notificationsGateway.notifyAll(`El participante ${updatedParticipant.name} ha sido actualizado.`);
    return updatedParticipant;
  }

  async remove(id: number) {
    return this.participantRepository.remove(id);
  }
}
