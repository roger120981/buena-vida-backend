import { ApiProperty } from '@nestjs/swagger';
import { CaregiverDto } from './caregiver.dto';

/**
 * DTO para la respuesta paginada de cuidadores.
 */
export class PaginatedCaregiverResponseDto {
  @ApiProperty({ type: [CaregiverDto], description: 'Lista de cuidadores' })
  data: CaregiverDto[];

  @ApiProperty({ description: 'Número total de cuidadores' })
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