import { Test, TestingModule } from '@nestjs/testing';
import { CaseManagersController } from './case-managers.controller';
import { CaseManagersService } from './case-managers.service';

describe('CaseManagersController', () => {
  let controller: CaseManagersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaseManagersController],
      providers: [CaseManagersService],
    }).compile();

    controller = module.get<CaseManagersController>(CaseManagersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
