import { IsString } from 'class-validator';

/**
 * DTO para crear una nueva agencia.
 */
export class CreateAgencyDto {
  @IsString({ message: 'Name must be a string' })
  name: string;
}