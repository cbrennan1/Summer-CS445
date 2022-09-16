import { HttpModule } from '@nestjs/axios';
import { BadRequestException, HttpException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { create } from 'domain';
import { AsksController } from '../asks/asks.controller';
import { AsksModel } from '../asks/asks.interface';
import { AsksService } from '../asks/asks.service';
import { CreateAskDto } from '../dto/dto.asks';
import { GivesController } from '../gives/gives.controller';
import { GivesService } from '../gives/gives.service';
import { NotesController } from '../notes/notes.controller';
import { NotesService } from '../notes/notes.service';
import { ReportsController } from '../reports/reports.controller';
import { ReportsService } from '../reports/reports.service';
import { ThanksController } from '../thanks/thanks.controller';
import { ThanksService } from '../thanks/thanks.service';
import { AccountsController } from './accounts.controller';
import { AccountModel } from './accounts.interface';
import { AccountsService } from './accounts.service';

describe('AccountsController', () => {
  //Testing Setup
  let accountsController: AccountsController;
  let asksController: AsksController;
  let accountsService: AccountsService;
  let asksService: AsksService;

  let testAccount1 = {
    uid: null,
    name: 'Created Name 1',
    address: { street : '1111 testing St', zip : '60616' },
    phone: '312-111-1111',
    picture: 'http://testing/exampleimage.com',
    is_active: false,
    date_created: null
  }
  let testAccount2 = {
    uid: null,
    name: 'Created Name 2',
    address: { street : '2222 testing St', zip : '60616' },
    phone: '312-222-2222',
    picture: 'http://testing/exampleimage.com',
    is_active: true,
    date_created: null
  }
  const testUpdatedAccont = {
    uid: null,
    name: "Updated Test",
    address: { street : '666 testing St', zip : '60616' },
    phone: '312-111-1111',
    picture: 'http://testing/exampleimage.com',
    is_active: true,
    date_created: ""
  }
  //Ask Setup
  function mockcreateAsk(createAskDto: CreateAskDto): AsksModel {
    let counter = 0;
    let asks = [];
    let aid = counter;
    let dc = new Date();
    const newAsk: AsksModel = {
        ...createAskDto,
        aid
    };
    newAsk.date_created = dc;
    newAsk.uid = +newAsk.uid;
    newAsk.aid = +newAsk.aid;
    asks.push(newAsk);
    counter ++;
    return newAsk;
}
function findOneAsk(aid: number): AsksModel { 
  mockcreateAsk(testAsk1);  
   if (aid) {
      return testAsk1;}
}
  let testAsk1 = {
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
  //Give Setup
  let testGive1 = {
    uid: 0,
    gid: null,
    type: "service",
    description: "This is a test service for gives",
    start_date: "2022-03-01",
    end_date: null,
    extra_zip: ['60616'], 
    is_active: true,
    date_created: null
  }
  //Thank Setup
  let testThanks1 = {
    uid: null,
    tid: null,
    thank_to: 0,
    description: "This is a thank you test",
    date_created: null,
  }
  let testThanks2 = {
    uid: null,
    tid: null,
    thank_to: 0,
    description: null,
    date_created: null,
  }
  //Compile and Initialize
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController, AsksController, GivesController, NotesController, ReportsController, ThanksController],
      providers: [AccountsService, AsksService, GivesService, NotesService, ReportsService, ThanksService],
      imports: [HttpModule]
    })
    .compile();
    accountsController = module.get<AccountsController>(AccountsController);
    accountsService = module.get<AccountsService>(AccountsService);
  });
  it('should be defined', () => {
    expect(accountsController).toBeDefined();
  });
  it('should be defined', () => {
    expect(accountsService).toBeDefined();
  });
//------------------------------------------------------------------------------------------------------------------------------/
    //End Points Regarding Accounts
//------------------------------------------------------------------------------------------------------------------------------/
  it('accounts: post create account', () => {
    let createdResponse = accountsController.create(testAccount1);
    let expectedResponse = accountsService.accounts[3];
    expect(expectedResponse).toEqual(createdResponse);
  });
  it('accounts: get activate account', () => {
    accountsController.create(testAccount2);
    let createdResponse = accountsController.activateAccount('3');
    let expectedResponse = accountsService.activate(3);
    expect(expectedResponse).toEqual(createdResponse);
  });
  it('accounts: put update account', () => {
    accountsController.create(testAccount2);
    let createdResponse = accountsController.updateAccount('3', testAccount2);
    expect(createdResponse).toEqual(undefined);
  });
  it('accounts: delete delete account', () => {
    accountsController.create(testAccount2);
    let length1 = accountsService.accounts.length;
    accountsController.deleteAccount('3');
    let length2 = accountsService.accounts.length;
    expect(length1).toBeGreaterThan(length2);
  });
  it('accounts: Get Find Accounts', () => {
    let expectedResponse = accountsService.findAll();
    let createdResponse = accountsController.findAccounts({'key':'', 'start_date':null, 'end_date':null});
    expect(expectedResponse).toEqual(createdResponse);
  });
  it('accounts: Find Account by UID', () => {
    accountsController.create(testAccount1);
    let expectedResponse = accountsService.findOne(3);
    let createdResponse = accountsController.findOneAccount('3');
    expect(expectedResponse).toEqual(createdResponse);
  });
//------------------------------------------------------------------------------------------------------------------------------/
    //End Points Regarding Asks
//------------------------------------------------------------------------------------------------------------------------------/
  it('asks: Find Asks by AID', () => {
    expect(() => {accountsController.findOneAsk(null);}).toThrow(NotFoundException)
  });
  it('asks: Create Ask', () => {
    accountsController.create(testAccount1)
    expect(() => {accountsController.createAsk('3', testAsk1, '');}).toThrow(HttpException);
  });
  it('asks: Deactivate Ask', () => {
    expect(() => {accountsController.deactivateAsk('4','0');}).toThrow(NotFoundException);
  });
  it('asks: Update Ask', () => {
    expect(() => {accountsController.updateAsk(null,'2',testAsk1);}).toThrow(NotFoundException);
  });
  it('asks: Delete Ask', () => {
    expect(() => {accountsController.deleteAsk('4','0');}).toThrow(NotFoundException);
  });
  it('asks: Get My Ask', () => {
    expect(() => {accountsController.getMyAsks(null,{is_active:"true"});}).toThrow(NotFoundException);
  });
//------------------------------------------------------------------------------------------------------------------------------/
    //End Points Regarding Gives
//------------------------------------------------------------------------------------------------------------------------------/
  it('gives: Create Give', () => {
    accountsController.create(testAccount1)
    expect(() => {accountsController.createGive('3', testGive1, '');}).toThrow(HttpException);
  });
  it('gives: Deactivate Give', () => {
    accountsController.create(testAccount1)
    expect(() => {accountsController.deactivateGive('3', '12');}).toThrow(NotFoundException);
  });
  it('gives: Update Gives', () => {
    accountsController.create(testAccount1)
    expect(() => {accountsController.updateGive('3', '12', testGive1);}).toThrow(HttpException);
  });
  it('gives: Delete Gives', () => {
    accountsController.create(testAccount1)
    expect(() => {accountsController.deleteGive('3', '12');}).toThrow(HttpException);
  });
  it('gives: GetMyGives', () => {
    accountsController.create(testAccount1)
    expect(() => {accountsController.getMyGives(3, {is_active: "true"});}).toThrow(HttpException);
  });
//------------------------------------------------------------------------------------------------------------------------------/
    //End Points Regarding Thanks
//------------------------------------------------------------------------------------------------------------------------------/
it('thanks: Create Thanks', () => {
  accountsController.create(testAccount1)
  expect(() => {accountsController.createThank(null, testThanks1, '');}).toThrow(BadRequestException);
});
it('thanks: Update Thanks', () => {
  accountsController.create(testAccount1)
  expect(() => {accountsController.updateThank(null, 0, testThanks1);}).toThrow(NotFoundException);
});
it('thanks: Get Users Thanks', () => {
  accountsController.create(testAccount1)
  expect(() => {accountsController.getAccountThanks(null, {is_active: false});}).toThrow(NotFoundException);
});
//------------------------------------------------------------------------------------------------------------------------------/
    //End Points Regarding Notes
//------------------------------------------------------------------------------------------------------------------------------/
it('notes: Get Ask Note', () => {
  let createdResponse = accountsController.getAskNotes();
  expect(createdResponse).toBeTruthy;
});
it('notes: Get Give Notes', () => {
  let createdResponse = accountsController.getGiveNotes();
  expect(createdResponse).toBeTruthy;
});

});
