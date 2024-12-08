import { Agency } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AgencyEntity implements Agency {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
