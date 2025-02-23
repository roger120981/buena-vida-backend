/* import { z } from 'zod';

export const CreateCaseManagerSchema = z.object({
  name: z.string(),
  agency: z.object({
    create: z.object({
      name: z.string(),  // Crear una nueva agencia si no existe
    }).optional(),
    connect: z.object({
      id: z.number(), // Conectar una agencia existente por ID
    }).optional(),
  }).optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type CreateCaseManagerDto = z.infer<typeof CreateCaseManagerSchema>;
 */

import { Type } from 'class-transformer';
import { IsString, IsEmail, IsBoolean, IsOptional, IsInt, ValidateNested } from 'class-validator';
import { ConnectAgencyDto, CreateAgencyDto } from 'src/agencies/dto/create-agency.dto';

export class CreateCaseManagerDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAgencyDto)
  agency?: {
    create?: CreateAgencyDto;
    connect?: ConnectAgencyDto;
  };
}
