/* import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CaseManagerEntity } from 'src/case-managers/entities/case-manager.entity';

export class CreateCaseManagerDto {
    @ApiProperty({
        example: 'Aisha Brady',
        description: 'Name of the Case Manager',
      })
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @ApiProperty({
        example: 'random@gmail.com',
        description: 'Email of the Case Manager',
      })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '502-345-9921',
        description: 'Phone of the Case Manager',
      })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({
        example: '2',
        description: 'ID of the CM Agency',
      })
    @IsNotEmpty()
    @IsNumber()
    agencyId: number;

    /*@ApiProperty()
    agency: CaseManagerEntity;*
} */

    import { IsString, IsEmail, IsOptional } from 'class-validator';

    export class CreateCaseManagerDto {
      @IsString() name: string;
    
      @IsEmail() @IsOptional()
      email?: string;
    
      @IsString() @IsOptional()
      phone?: string;
    
      @IsOptional() agencyId?: number;
    }
     
