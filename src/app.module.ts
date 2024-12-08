import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AgenciesModule } from './agencies/agencies.module';
import { CaseManagersModule } from './case-managers/case-managers.module';

@Module({
  imports: [PrismaModule, AgenciesModule,  CaseManagersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
