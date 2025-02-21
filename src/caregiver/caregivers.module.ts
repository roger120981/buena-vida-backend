import { Module } from '@nestjs/common';
import { CaregiversService } from './caregivers.service';
import { CaregiversController } from './caregivers.controller';
import { CaregiverRepository } from './repositories/caregiver.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CaregiversController],
  providers: [CaregiversService, CaregiverRepository],
  exports: [CaregiversService],
  imports: [PrismaModule],
})
export class CaregiversModule {}


