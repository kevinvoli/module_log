import { Test, TestingModule } from '@nestjs/testing';
import { CorbeilleService } from './corbeille.service';

describe('CorbeilleService', () => {
  let service: CorbeilleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorbeilleService],
    }).compile();

    service = module.get<CorbeilleService>(CorbeilleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
