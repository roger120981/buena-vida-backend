import { ApiProperty } from '@nestjs/swagger';
import { ParticipantEntity } from '../entities/participant.entity';

export class ParticipantDto extends ParticipantEntity {
  @ApiProperty({ description: 'ID del participante', example: 1 })
  declare id: number;

  @ApiProperty({ description: 'Nombre del participante', example: 'John Doe' })
  declare name: string;

  @ApiProperty({ description: 'Género del participante', example: 'M' })
  declare gender: string;

  @ApiProperty({ description: 'ID de Medicaid', example: '1234567890' })
  declare medicaidId: string;

  @ApiProperty({ description: 'Fecha de nacimiento', example: '1990-01-01T00:00:00Z' })
  declare dob: Date;

  @ApiProperty({ description: 'Ubicación del participante', example: 'NY' })
  declare location: string;

  @ApiProperty({ description: 'Comunidad del participante', example: 'Downtown' })
  declare community: string;

  @ApiProperty({ description: 'Dirección del participante', example: '123 Main St' })
  declare address: string;

  @ApiProperty({ description: 'Teléfono principal', example: '555-1234' })
  declare primaryPhone: string;

  @ApiProperty({ description: 'Teléfono secundario', example: '555-5678', required: false })
  declare secondaryPhone: string;

  @ApiProperty({ description: 'Estado de actividad', example: true })
  declare isActive: boolean;

  @ApiProperty({ description: 'Fecha de inicio en la ubicación', example: '2023-01-01T00:00:00Z' })
  declare locStartDate: Date;

  @ApiProperty({ description: 'Fecha de fin en la ubicación', example: '2023-12-31T00:00:00Z' })
  declare locEndDate: Date;

  @ApiProperty({ description: 'Fecha de inicio del plan de cuidado', example: '2023-01-01T00:00:00Z' })
  declare pocStartDate: Date;

  @ApiProperty({ description: 'Fecha de fin del plan de cuidado', example: '2023-12-31T00:00:00Z' })
  declare pocEndDate: Date;

  @ApiProperty({ description: 'Unidades asignadas', example: 10 })
  declare units: number;

  @ApiProperty({ description: 'Horas asignadas', example: 20.5 })
  declare hours: number;

  @ApiProperty({ description: 'Indicador de HDM', example: true })
  declare hdm: boolean;

  @ApiProperty({ description: 'Indicador de ADHC', example: false })
  declare adhc: boolean;

  @ApiProperty({ description: 'ID del administrador de casos asociado', example: 1 })
  declare cmID: number;

  @ApiProperty({ description: 'Fecha de creación', example: '2023-01-01T00:00:00Z' })
  declare createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización', example: '2023-01-02T00:00:00Z' })
  declare updatedAt: Date;
}