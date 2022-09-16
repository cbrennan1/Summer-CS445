import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from '../accounts/accounts.service';
import { AsksService } from '../asks/asks.service';
import { GivesService } from '../gives/gives.service';
import { NotesService } from '../notes/notes.service';
import { ReportsController } from './reports.controller';
import { ReportsModule } from './reports.module';
import { ReportsService } from './reports.service';

describe('ReportsModule', () => {
  //Testing Setup
  let reportsModule: ReportsModule;
  let reportsService: ReportsService;
    //Compile and Initialize
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [ReportsService, AsksService, GivesService, NotesService, AccountsService, ReportsModule],
          controllers: [ReportsController],
          exports: [ReportsService],
          imports: [HttpModule]
        }).compile();
        reportsModule = module.get<ReportsModule>(ReportsModule);
        reportsService = module.get<ReportsService>(ReportsService);
      });
      it('should be defined', () => {
        expect(reportsModule).toBeDefined();
      });
      it('should be defined', () => {
        expect(reportsService).toBeDefined();
      });
});
