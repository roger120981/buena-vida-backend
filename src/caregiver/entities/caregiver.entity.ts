import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsBoolean, IsEmail, IsDate } from 'class-validator';
import { Caregiver } from '@prisma/client';  // Importación del tipo generado por Prisma
import { Type } from 'class-transformer';

/**
 * Clase que representa la entidad Caregiver para la API
 */
export class CaregiverEntity implements Caregiver {
  @ApiProperty({
    description: 'Identificador único del cuidador',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'Nombre completo del cuidador',
    example: 'Ana López',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del cuidador',
    example: 'ana.lopez@example.com',
    required: false,  // Este campo es opcional
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Número de teléfono del cuidador',
    example: '9876543210',
    required: false,  // Este campo es opcional
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Indica si el cuidador está activo o inactivo',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'Lista de participantes asignados al cuidador',
    type: [String], // Suponemos que se devolverán nombres de participantes como ejemplo
    required: false,
  })
  participants?: string[];

  @ApiProperty({
    description: 'Fecha de creación del registro del cuidador',
    example: '2023-01-01T14:30:00Z',
  })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de la última actualización del registro del cuidador',
    example: '2023-02-01T14:30:00Z',
  })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}
