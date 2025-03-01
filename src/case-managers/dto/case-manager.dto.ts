import { ApiProperty } from '@nestjs/swagger';
import { CaseManagerEntity } from '../entities/case-manager.entity';

/**
 * DTO que representa un administrador de casos para la API.
 */
export class CaseManagerDto extends CaseManagerEntity {
  @ApiProperty({ description: 'ID del administrador de casos', example: 1 })
  declare id: number;

  @ApiProperty({ description: 'Nombre del administrador de casos', example: 'Jane Smith' })
  declare name: string;

  @ApiProperty({ description: 'Correo electrónico del administrador', example: 'jane@example.com', required: false })
  declare email?: string;

  @ApiProperty({ description: 'Teléfono del administrador', example: '555-5678', required: false })
  declare phone?: string;

  @ApiProperty({ description: 'ID de la agencia asociada', example: 1 })
  declare agencyId: number;

  @ApiProperty({ description: 'Fecha de creación', example: '2023-01-01T00:00:00Z' })
  declare createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización', example: '2023-01-02T00:00:00Z' })
  declare updatedAt: Date;
}