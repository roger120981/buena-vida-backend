import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AgenciesModule } from './agencies/agencies.module';

@Module({
  imports: [PrismaModule, AgenciesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
