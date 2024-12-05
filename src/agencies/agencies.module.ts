import { Module } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { AgenciesController } from './agencies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AgenciesController],
  providers: [AgenciesService],
  imports: [PrismaModule],
})
export class AgenciesModule {}
