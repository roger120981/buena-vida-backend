import { ApiProperty } from '@nestjs/swagger';
import { CaseManagerDto } from './case-manager.dto';

/**
 * DTO para la respuesta paginada de administradores de casos.
 */
export class PaginatedCaseManagerResponseDto {
  @ApiProperty({ type: [CaseManagerDto], description: 'Lista de administradores de casos' })
  data: CaseManagerDto[];

  @ApiProperty({ description: 'Número total de administradores de casos' })
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