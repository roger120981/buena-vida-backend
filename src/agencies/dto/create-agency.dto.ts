import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAgencyDto {
    @ApiProperty({
        example: 'Caretenders',
        description: 'Name of the CM Agency',
      })
      @IsNotEmpty()
      @IsString()
    name: string;
  
}
