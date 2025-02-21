import { z } from 'zod';

export const CreateParticipantSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  gender: z.enum(['Male', 'Female', 'Other']),
  medicaidId: z.string().length(10, 'Medicaid ID must be exactly 10 characters'),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  location: z.string(),
  community: z.string(),
  address: z.string().min(5),
  primaryPhone: z.string().regex(/^\d{10}$/, 'Primary phone must be a valid 10-digit number'),
  secondaryPhone: z.string().optional(),
  isActive: z.boolean(),
  locStartDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  locEndDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  pocStartDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  pocEndDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  units: z.number().min(1),
  hours: z.number().min(1),
  hdm: z.boolean(),
  adhc: z.boolean(),
});

export type CreateParticipantDto = z.infer<typeof CreateParticipantSchema>;

