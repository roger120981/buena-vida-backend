import { Module } from '@nestjs/common';
import { CaseManagersService } from './case-managers.service';
import { CaseManagersController } from './case-managers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CaseManagersController],
  providers: [CaseManagersService],
  imports: [PrismaModule]
})
export class CaseManagersModule {}
