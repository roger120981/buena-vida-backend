/* import { z } from 'zod';

export const CreateAgencySchema = z.object({
  name: z.string().min(2, 'Agency name must have at least 2 characters'),
});

export type CreateAgencyDto = z.infer<typeof CreateAgencySchema>;
 */

import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAgencyDto {
  @IsString()
  name: string;
}

export class ConnectAgencyDto {
  @IsOptional()
  @IsInt()
  id?: number;
}
