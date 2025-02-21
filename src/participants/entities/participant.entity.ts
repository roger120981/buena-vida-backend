import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsDate, IsBoolean, IsEmail, IsNumber } from 'class-validator';
import { Participant } from '@prisma/client';  // Importación del tipo generado por Prisma
import { Type } from 'class-transformer';

/**
 * Clase que representa la entidad Participant para la API
 */
export class ParticipantEntity implements Participant {
  @ApiProperty({
    description: 'Identificador único del participante',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'Nombre completo del participante',
    example: 'Juan Pérez',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Género del participante',
    example: 'Masculino',
  })
  @IsString()
  gender: string;

  @ApiProperty({
    description: 'Número de Medicaid del participante',
    example: '123456789',
  })
  @IsString()
  medicaidId: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del participante',
    example: '1990-05-15',
  })
  @IsDate()
  @Type(() => Date)
  dob: Date;

  @ApiProperty({
    description: 'Ubicación del participante',
    example: 'Ciudad X, Estado Y',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Comunidad del participante',
    example: 'Comunidad ABC',
  })
  @IsString()
  community: string;

  @ApiProperty({
    description: 'Dirección del participante',
    example: 'Calle Ficticia 123, Ciudad, País',
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Número de teléfono principal del participante',
    example: '1234567890',
  })
  @IsString()
  primaryPhone: string;

  @ApiProperty({
    description: 'Número de teléfono secundario del participante',
    example: '0987654321',
    required: false,
  })
  @IsString()
  secondaryPhone: string;

  @ApiProperty({
    description: 'Indica si el participante está activo',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'Fecha de inicio de ubicación del participante',
    example: '2023-01-01T14:30:00Z',
  })
  @IsDate()
  @Type(() => Date)
  locStartDate: Date;

  @ApiProperty({
    description: 'Fecha de fin de ubicación del participante',
    example: '2023-12-31T14:30:00Z',
  })
  @IsDate()
  @Type(() => Date)
  locEndDate: Date;

  @ApiProperty({
    description: 'Fecha de inicio del Plan de Cuidado del Participante',
    example: '2023-01-01T14:30:00Z',
  })
  @IsDate()
  @Type(() => Date)
  pocStartDate: Date;

  @ApiProperty({
    description: 'Fecha de fin del Plan de Cuidado del Participante',
    example: '2023-12-31T14:30:00Z',
  })
  @IsDate()
  @Type(() => Date)
  pocEndDate: Date;

  @ApiProperty({
    description: 'Número de unidades asignadas al participante',
    example: 10,
  })
  @IsInt()
  units: number;

  @ApiProperty({
    description: 'Número de horas asignadas al participante',
    example: 40.5,
  })
  @IsNumber()
  hours: number;

  @ApiProperty({
    description: 'Indica si el participante es parte del programa HDM (Home Delivered Meals)',
    example: true,
  })
  @IsBoolean()
  hdm: boolean;

  @ApiProperty({
    description: 'Indica si el participante está en el programa ADHC (Adult Day Health Care)',
    example: true,
  })
  @IsBoolean()
  adhc: boolean;

  @ApiProperty({
    description: 'Lista de cuidadores asignados al participante',
    type: [String], // Asumimos que se devolverán nombres de cuidadores como ejemplo
    required: false,
  })
  caregivers?: string[];

  @ApiProperty({
    description: 'El gestor de caso asignado al participante',
    example: 'Case Manager 1',
  })
  @IsInt()
  cmID: number;

  @ApiProperty({
    description: 'Fecha de creación del registro del participante',
    example: '2023-01-01T14:30:00Z',
  })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de la última actualización del registro del participante',
    example: '2023-02-01T14:30:00Z',
  })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}

