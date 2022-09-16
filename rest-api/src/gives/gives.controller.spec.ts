import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from '../accounts/accounts.service';
import { GivesController } from './gives.controller';
import { GivesService } from './gives.service';

describe('GivesController', () => {
  //Set Up
  let controller: GivesController;
  let givesService: GivesService;
  let testGive1 = {
    uid: 0,
    gid: null,
    type: "service",
    description: "This is a test service for gives",
    start_date: "2022-03-01",
    end_date: null,
    extra_zip: null, 
    is_active: true,
    date_created: null
  }
  //Compile and Initalize
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GivesService, AccountsService],
      controllers: [GivesController],
      exports: [GivesService]
    }).compile();

    controller = module.get<GivesController>(GivesController);
    givesService = module.get<GivesService>(GivesService)

  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be defined', () => {
    expect(givesService).toBeDefined();
  });
  //Testing
  it('get thanks', () => {
    let expectedResponse = givesService.gives;
    let createdResponse = controller.findGives({'v_by': '2', 'is_active': true})
    expect(expectedResponse).toEqual(createdResponse);
  });
  it('get thanks by tid', () => {
    givesService.create(testGive1);
    let createdResponse = controller.findOneGive(0);
    let expectedResponse = givesService.gives[0];
    expect(createdResponse).toEqual(expectedResponse);
  });
  it('get thanks by key', () => {
    let key = "thank";
    let createdResponse = controller.searchGives({key})
    let expectedResponse = givesService.gives.filter(give => {
      return (give.uid == 0);
    })
    expect(expectedResponse).toEqual(createdResponse);
  });
});
