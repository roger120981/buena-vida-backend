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

    /*@ApiProperty({
        example: ['caseManager1', 'caseManager2'],
        description: 'All the case managers belongs to agency',
        required: false,
      })
      // @ArrayNotEmpty()
    @IsString({ each: true })
    caseManagers: string[];*/
    
}
