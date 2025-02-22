import { z } from 'zod';

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
  dob: z.date(),  // Cambiado a tipo Date
  location: z.string(),
  community: z.string(),
  address: z.string().min(5),
  primaryPhone: z.string().regex(/^\d{10}$/, 'Primary phone must be a valid 10-digit number'),
  secondaryPhone: z.string().optional(),
  isActive: z.boolean(),
  locStartDate: z.date(),  // Cambiado a tipo Date
  locEndDate: z.date(),    // Cambiado a tipo Date
  pocStartDate: z.date(),  // Cambiado a tipo Date
  pocEndDate: z.date(),    // Cambiado a tipo Date
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

