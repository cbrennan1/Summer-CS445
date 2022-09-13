import { Test, TestingModule } from '@nestjs/testing';
import { ThanksController } from './thanks.controller';
import { ThanksModule } from './thanks.module';
import { ThanksService } from './thanks.Service';

describe('ThanksModule', () => {
  //Testing Setup
  let thanksModule: ThanksModule;
  let thanksService: ThanksService;
    //Compile and Initialize
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [ThanksService, ThanksModule],
          controllers: [ThanksController],
          exports: [ThanksService]
        }).compile();
        thanksService = module.get<ThanksService>(ThanksService);
        thanksModule = module.get<ThanksModule>(ThanksModule);
      });
      it('should be defined', () => {
        expect(thanksModule).toBeDefined();
      });
      it('should be defined', () => {
        expect(thanksService).toBeDefined();
      });
});