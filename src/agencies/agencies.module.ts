import { Module } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { AgenciesController } from './agencies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AgencyRepository } from './repositories/agency.repository';

@Module({
  controllers: [AgenciesController],
  providers: [AgenciesService, AgencyRepository],
  imports: [PrismaModule],
})
export class AgenciesModule {}