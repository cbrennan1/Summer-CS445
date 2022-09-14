import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
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
import { AccountsModule } from './accounts.module';
import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
  //Testing Setup
  let accountsModule: AccountsModule;
  let accountService: AccountsService;
  let http: HttpModule;
  let givesService: GivesService;
    //Compile and Initialize
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [AccountsController, AsksController, GivesController, NotesController, ReportsController, ThanksController],
          providers: [AccountsService, AsksService, GivesService, NotesService, ReportsService, ThanksService, AccountsModule],
          imports: [HttpModule]
        }).compile();
        accountService = module.get<AccountsService>(AccountsService);
        accountsModule = module.get<AccountsModule>(AccountsModule);
        http = module.get<HttpModule>(HttpModule);
        givesService = module.get<GivesService>(GivesService);
      });
      it('should be defined', () => {
        expect(accountsModule).toBeDefined();
      });
      it('should be defined', () => {
        expect(accountService).toBeDefined();
      });
      it('should be defined', () => {
        expect(http).toBeDefined();
      });
      it('should be defined', () => {
        expect(givesService).toBeDefined();
      });
});