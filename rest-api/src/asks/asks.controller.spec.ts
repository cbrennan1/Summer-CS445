import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AsksController } from './asks.controller';
import { AsksService } from './asks.service';

describe('AsksController', () => {
  let controller: AsksController;
  let askService: AsksService;
  let http: HttpModule;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsksService, AsksController],
      controllers: [AsksController],
      exports: [AsksService],
      imports: [HttpModule]

    }).compile();
    http = module.get<HttpModule>(HttpModule);
    controller = module.get<AsksController>(AsksController);
    askService = module.get<AsksService>(AsksService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be defined', () => {
    expect(askService).toBeDefined();
  });
  it('should be defined', () => {
    expect(http).toBeDefined();
  });
});
