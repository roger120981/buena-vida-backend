import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AgenciesModule } from './agencies/agencies.module';
import { CaseManagersModule } from './case-managers/case-managers.module';
import { ParticipantsModule } from './participants/participants.module';
import { CaregiversModule } from './caregiver/caregivers.module';

@Module({
  imports: [PrismaModule, AgenciesModule,  CaseManagersModule, ParticipantsModule, CaregiversModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
