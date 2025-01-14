import { Test, TestingModule } from '@nestjs/testing';
import { AutorisationController } from './autorisation.controller';
import { AutorisationService } from './autorisation.service';

describe('AutorisationController', () => {
  let controller: AutorisationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutorisationController],
      providers: [AutorisationService],
    }).compile();

    controller = module.get<AutorisationController>(AutorisationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
