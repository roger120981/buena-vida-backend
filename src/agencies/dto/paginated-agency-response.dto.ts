import { ApiProperty } from '@nestjs/swagger';
import { AgencyDto } from './agency.dto';

/**
 * DTO para la respuesta paginada de agencias.
 */
export class PaginatedAgencyResponseDto {
  @ApiProperty({ type: [AgencyDto], description: 'Lista de agencias' })
  data: AgencyDto[];

  @ApiProperty({ description: 'Número total de agencias' })
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