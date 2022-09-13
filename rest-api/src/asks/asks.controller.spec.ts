import { HttpModule, HttpService } from '@nestjs/axios';
import { BadRequestException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { AsksController } from './asks.controller';
import { AsksService } from './asks.service';

describe('AsksController', () => {
  let controller: AsksController;
  let askService: AsksService;
  let http: HttpModule;
  let testAsk1 = {
    uid: 0,
    aid: null,
    type: "service",
    description: "This is a test service for asks",
    start_date: "2022-03-01",
    end_date: null,
    extra_zip: null,
    is_active: false,
    date_created: null
  }
  let testAsk2= {
    uid: 0,
    aid: null,
    type: "service",
    description: "This is a test service for asks",
    start_date: "2022-03-01",
    end_date: null,
    extra_zip: null,
    is_active: true,
    date_created: null
  }
  let testAsk3= {
    uid: 0,
    aid: null,
    type: "service",
    description: "This is another test service for asks",
    start_date: "2022-03-01",
    end_date: null,
    extra_zip: null,
    is_active: true,
    date_created: null
  }
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
  it('findasks', () => {
    let expectedResponse = askService.asks;
    let createdResponse = controller.findAsks({'v_by': 2, 'is_active': true});
    expect(expectedResponse).toEqual(createdResponse);
  });
  it('get thanks by aid', () => {
    askService.createAsk(testAsk1);
    let createdResponse = controller.findOneAsk('0');
    let expectedResponse = askService.asks[0];
    expect(createdResponse).toEqual(expectedResponse);
  });
  it('createask throw bad request', () => {
    askService.createAsk(testAsk1);
    expect(() => {controller.createAsk('0', '',testAsk2);}).toThrow(HttpException)
  });
  it('createask good request', () => {
    askService.createAsk(testAsk1);
    askService.createAsk(testAsk2);
    let expectedResponse = askService.createAsk(testAsk3);
    let createdResponse = controller.createAsk('1', '', testAsk3);
    expect(createdResponse == createdResponse).toBeFalsy;
  })
});
