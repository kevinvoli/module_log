import { Test, TestingModule } from '@nestjs/testing';
import { CorbeilleController } from './corbeille.controller';
import { CorbeilleService } from './corbeille.service';

describe('CorbeilleController', () => {
  let controller: CorbeilleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorbeilleController],
      providers: [CorbeilleService],
    }).compile();

    controller = module.get<CorbeilleController>(CorbeilleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
