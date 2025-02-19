import { Test, TestingModule } from '@nestjs/testing';
import { CaregiverController } from './caregivers.controller';
import { CaregiverService } from './caregivers.service';

describe('CaregiverController', () => {
  let controller: CaregiverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaregiverController],
      providers: [CaregiverService],
    }).compile();

    controller = module.get<CaregiverController>(CaregiverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
