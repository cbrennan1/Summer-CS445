import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { create } from 'domain';
import { AsksController } from '../asks/asks.controller';
import { AsksService } from '../asks/asks.service';
import { GivesController } from '../gives/gives.controller';
import { GivesService } from '../gives/gives.service';
import { NotesController } from '../notes/notes.controller';
import { NotesService } from '../notes/notes.service';
import { ReportsController } from '../reports/reports.controller';
import { ReportsService } from '../reports/reports.service';
import { ThanksController } from '../thanks/thanks.controller';
import { ThanksService } from '../thanks/thanks.service';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

describe('AccountsController', () => {
  //Testing Setup
  let controller: AccountsController;
  let accountsService: AccountsService;
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
  const mockAccountsService = {
    findAll(){
      return this.accounts;
    }, 
    create(){

    }
  }
  const mockAsksService = {

  }
  const mockGivesService = {

  }
  const mockNotesService = {

  }
  const mockReportsService = {

  }
  const mockThanksService = {

  }
  const mockcreateAccountDto = {
    uid: null,
    name: "",
    address: { street : "", zip : "" },
    phone: "",
    picture: "",
    is_active: true || false,
    date_created: ""
  }
  function mockRes(res) {
    res.setHeader('content-type', 'application/json');
    return res();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController, AsksController, GivesController, NotesController, ReportsController, ThanksController],
      providers: [AccountsService, AsksService, GivesService, NotesService, ReportsService, ThanksService],
      imports: [HttpModule]
    })
    .overrideProvider(AsksService)
    .useValue(mockAsksService)
    .overrideProvider(GivesService)
    .useValue(mockGivesService)
    .overrideProvider(NotesService)
    .useValue(mockNotesService)
    .overrideProvider(ReportsService)
    .useValue(mockReportsService)
    .overrideProvider(ThanksService)
    .useValue(mockThanksService)
    .compile();

    controller = module.get<AccountsController>(AccountsController);
    accountsService = module.get<AccountsService>(AccountsService);
    accountsService.create(testAccount1);
    accountsService.create(testAccount2);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  
});
