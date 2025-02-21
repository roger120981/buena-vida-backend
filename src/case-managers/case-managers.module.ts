import { Module } from '@nestjs/common';
import { CaseManagersService } from './case-managers.service';
import { CaseManagersController } from './case-managers.controller';
import { CaseManagerRepository } from './repositories/case-manager.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CaseManagersController],
  providers: [CaseManagersService, CaseManagerRepository],
  exports: [CaseManagersService],
  imports: [PrismaModule],
})
export class CaseManagersModule {}

