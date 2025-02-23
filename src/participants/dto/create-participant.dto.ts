/* import { z } from 'zod';

const CreateCaseManagerSchema = z.object({
  name: z.string(),
  agency: z.string(),
  email: z.string().optional(),
  phone: z.string().optional(),
  isActive: z.boolean().optional(),
});

const CaseManagerWhereUniqueInputSchema = z.object({
  name: z.string(),
  id: z.number().optional(),
});

const ConnectOrCreateCaseManagerSchema = z.object({
  create: CreateCaseManagerSchema,
  where: CaseManagerWhereUniqueInputSchema,
});

export const CreateParticipantSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  gender: z.enum(['Male', 'Female', 'Other']),
  medicaidId: z.string().length(10, 'Medicaid ID must be exactly 10 characters'),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in the format YYYY-MM-DD'),  // Cambiado a string con patrón  // Cambiado a tipo Date
  location: z.string(),
  community: z.string(),
  address: z.string().min(5),
  primaryPhone: z.string().regex(/^\d{10}$/, 'Primary phone must be a valid 10-digit number'),
  secondaryPhone: z.string().optional(),
  isActive: z.boolean(),
  locStartDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in the format YYYY-MM-DD'),  // Cambiado a string con patrón
  locEndDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in the format YYYY-MM-DD'),    // Cambiado a string con patrón
  pocStartDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in the format YYYY-MM-DD'),  // Cambiado a string con patrón
  pocEndDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in the format YYYY-MM-DD'),    // Cambiado a string con patrón
  units: z.number().min(1),
  hours: z.number().min(1),
  hdm: z.boolean(),
  adhc: z.boolean(),
  caseManager: z.object({
    create: CreateCaseManagerSchema.optional(),
    connectOrCreate: ConnectOrCreateCaseManagerSchema.optional(),
    connect: CaseManagerWhereUniqueInputSchema.optional(),
  }).optional(),
});

export const CreateParticipantOpenAPISchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 2 },
    gender: { type: 'string', enum: ['Male', 'Female', 'Other'] },
    medicaidId: { type: 'string', minLength: 10, maxLength: 10 },
    dob: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
    location: { type: 'string' },
    community: { type: 'string' },
    address: { type: 'string', minLength: 5 },
    primaryPhone: { type: 'string', pattern: '^\\d{10}$' },
    secondaryPhone: { type: 'string', nullable: true },
    isActive: { type: 'boolean' },
    locStartDate: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
    locEndDate: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
    pocStartDate: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
    pocEndDate: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
    units: { type: 'number', minimum: 1 },
    hours: { type: 'number', minimum: 1 },
    hdm: { type: 'boolean' },
    adhc: { type: 'boolean' },
  },
  required: [
    'name',
    'gender',
    'medicaidId',
    'dob',
    'location',
    'community',
    'address',
    'primaryPhone',
    'isActive',
    'locStartDate',
    'locEndDate',
    'pocStartDate',
    'pocEndDate',
    'units',
    'hours',
    'hdm',
    'adhc',
  ],
};

export type CreateParticipantDto = z.infer<typeof CreateParticipantSchema>;

 */

import { IsString, IsOptional, ValidateNested, IsBoolean, IsInt, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

class CreateAgencyDto {
  @IsString()
  name: string;
}

class ConnectAgencyDto {
  @IsOptional()
  @IsInt()
  id?: number;
}

class CreateCaseManagerDto {
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

class ConnectCaseManagerDto {
  @IsOptional()
  @IsInt()
  id?: number;
}

export class CreateParticipantDto {
  @IsString()
  name: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  gender: string;

  @IsString()
  medicaidId: string;

  @IsDateString()
  dob: string;

  @IsString()
  location: string;

  @IsString()
  community: string;

  @IsString()
  address: string;

  @IsString()
  primaryPhone: string;

  @IsString()
  @IsOptional()
  secondaryPhone?: string;

  @IsDateString()
  locStartDate: string;

  @IsDateString()
  locEndDate: string;

  @IsDateString()
  pocStartDate: string;

  @IsDateString()
  pocEndDate: string;

  @IsOptional()
  @IsInt()
  units?: number;

  @IsOptional()
  @IsInt()
  hours?: number;

  @IsOptional()
  @IsBoolean()
  hdm?: boolean;

  @IsOptional()
  @IsBoolean()
  adhc?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCaseManagerDto)
  caseManager?: {
    create?: CreateCaseManagerDto;
    connect?: ConnectCaseManagerDto;
  };
}


