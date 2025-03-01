import { ApiProperty } from '@nestjs/swagger';
import { ParticipantDto } from './participant.dto';

export class PaginatedParticipantResponseDto {
  @ApiProperty({ type: [ParticipantDto], description: 'Lista de participantes' })
  data: ParticipantDto[];

  @ApiProperty({ description: 'Número total de participantes' })
  total: number;

  @ApiProperty({ description: 'Página actual' })
  page: number;

  @ApiProperty({ description: 'Tamaño de la página' })
  pageSize: number;

  @ApiProperty({ description: 'Número total de páginas' })
  totalPages: number;

  @ApiProperty({ description: 'Indica si hay más páginas disponibles' })
  hasNext: boolean;
}