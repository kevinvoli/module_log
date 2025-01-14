import { Test, TestingModule } from '@nestjs/testing';
import { AutorisationService } from './autorisation.service';

describe('AutorisationService', () => {
  let service: AutorisationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutorisationService],
    }).compile();

    service = module.get<AutorisationService>(AutorisationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
