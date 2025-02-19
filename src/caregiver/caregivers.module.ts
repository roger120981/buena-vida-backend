import { Module } from '@nestjs/common';
import { CaregiversService } from './caregivers.service';
import { CaregiversController } from './caregivers.controller';
import { CaregiverRepository } from './repositories/caregiver.repository';

@Module({
  controllers: [CaregiversController],
  providers: [CaregiversService, CaregiverRepository],
  exports: [CaregiversService],
})
export class CaregiversModule {}

