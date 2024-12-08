import { Test, TestingModule } from '@nestjs/testing';
import { CaseManagersService } from './case-managers.service';

describe('CaseManagersService', () => {
  let service: CaseManagersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaseManagersService],
    }).compile();

    service = module.get<CaseManagersService>(CaseManagersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
