import { ApiProperty } from '@nestjs/swagger';
import { AgencyEntity } from '../entities/agency.entity';

/**
 * DTO que representa una agencia para la API.
 */
export class AgencyDto extends AgencyEntity {
  @ApiProperty({ description: 'ID de la agencia', example: 1 })
  declare id: number;

  @ApiProperty({ description: 'Nombre de la agencia', example: 'Health Agency' })
  declare name: string;

  @ApiProperty({ description: 'Fecha de creación', example: '2023-01-01T00:00:00Z' })
  declare createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización', example: '2023-01-02T00:00:00Z' })
  declare updatedAt: Date;
}