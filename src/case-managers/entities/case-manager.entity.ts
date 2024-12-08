import { CaseManager } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CaseManagerEntity implements CaseManager {
    
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    agencyId: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
