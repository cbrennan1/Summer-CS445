import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AsksController } from './asks.controller';
import { AsksModule } from './asks.module';
import { AsksService } from './asks.Service';

describe('AsksService', () => {
  //Testing Setup
  let asksModule: AsksModule;
  let asksServices: AsksService;
  let http: HttpModule;
    //Compile and Initialize
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AsksService, AsksModule],
            controllers: [AsksController],
            exports: [AsksService],
            imports: [HttpModule]
        }).compile();
        http = module.get<HttpModule>(HttpModule);
        asksModule = module.get<AsksModule>(AsksModule);
        asksServices = module.get<AsksService>(AsksService);
      });
      it('should be defined', () => {
        expect(asksModule).toBeDefined();
      });
      it('should be defined', () => {
        expect(asksServices).toBeDefined();
      });
      it('should be defined', () => {
        expect(http).toBeDefined();
      });
});