import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AgenciesModule } from './agencies/agencies.module';
import { CaseManagersModule } from './case-managers/case-managers.module';
import { ParticipantModule } from './participant/participant.module';
import { CaregiverModule } from './caregiver/caregiver.module';

@Module({
  imports: [PrismaModule, AgenciesModule,  CaseManagersModule, ParticipantModule, CaregiverModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
