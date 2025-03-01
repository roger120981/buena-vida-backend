import { ApiProperty } from '@nestjs/swagger';
import { CaregiverEntity } from '../entities/caregiver.entity';

/**
 * DTO que representa un cuidador para la API.
 */
export class CaregiverDto extends CaregiverEntity {
  @ApiProperty({ description: 'ID del cuidador', example: 1 })
  declare id: number;

  @ApiProperty({ description: 'Nombre del cuidador', example: 'John Doe' })
  declare name: string;

  @ApiProperty({ description: 'Correo electrónico del cuidador', example: 'john@example.com', required: false })
  declare email?: string;

  @ApiProperty({ description: 'Teléfono del cuidador', example: '555-1234', required: false })
  declare phone?: string;

  @ApiProperty({ description: 'Estado de actividad del cuidador', example: true })
  declare isActive: boolean;

  @ApiProperty({ description: 'Fecha de creación', example: '2023-01-01T00:00:00Z' })
  declare createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización', example: '2023-01-02T00:00:00Z' })
  declare updatedAt: Date;
}