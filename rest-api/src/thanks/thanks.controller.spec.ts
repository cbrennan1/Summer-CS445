import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { ThanksController } from './thanks.controller';
import { ThanksService } from './thanks.service';

describe('ThanksController', () => {
  let controller: ThanksController;
  let thanksService: ThanksService;
  let testThanks1 = {
    uid: 0,
    tid: null,
    thank_to: 0,
    description: "This is a thank you test",
    date_created: null,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThanksService],
      controllers: [ThanksController],
      exports: [ThanksService]
    }).compile();

    controller = module.get<ThanksController>(ThanksController);
    thanksService = module.get<ThanksService>(ThanksService);
    thanksService.createThanks(testThanks1);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be defined', () => {
    expect(thanksService).toBeDefined();
  });
  it('get thanks', () => {
    let expectedResponse = thanksService.thanks;
    let createdResponse = controller.findThanks()
    expect(createdResponse).toEqual(expectedResponse);
  });
  it('get thanks by tid', () => {
    let createdResponse = controller.findOneThank(0);
    let expectedResponse = thanksService.thanks[0];
    expect(createdResponse).toEqual(expectedResponse);
  });
  it('get thanks by uid', () => {
    thanksService.createThanks(testThanks1);
    let createdResponse = controller.findThanksForUser('1');
    let expectedResponse = thanksService.thanks.filter(thank => {
      return (thank.uid == 1);
    })
    expect(createdResponse).toEqual(expectedResponse);
  });
  it('get thanks by key', () => {
    let key = "thank";
    let createdResponse = controller.searchThanks({key})
    let expectedResponse = thanksService.thanks.filter(thank => {
      return (thank.uid == 0);
    })
    expect(expectedResponse).toEqual(createdResponse);
  });
});
