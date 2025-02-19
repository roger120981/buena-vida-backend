import { IsString, IsBoolean, IsOptional, IsEmail } from 'class-validator';

export class CreateCaregiverDto {
  @IsString() name: string;
  
  @IsEmail() @IsOptional()
  email?: string;

  @IsString() @IsOptional()
  phone?: string;

  @IsBoolean() isActive: boolean;
}

