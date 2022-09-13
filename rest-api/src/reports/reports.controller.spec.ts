import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from '../accounts/accounts.service';
import { AsksService } from '../asks/asks.service';
import { GivesService } from '../gives/gives.service';
import { NotesService } from '../notes/notes.service';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

describe('ReportsController', () => {
  let controller: ReportsController;
  let reportsService: ReportsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportsService, AsksService, GivesService, NotesService, AccountsService],
      controllers: [ReportsController],
      exports: [ReportsService],
      imports: [HttpModule]
    }).compile();

    reportsService = module.get<ReportsService>(ReportsService);
    controller = module.get<ReportsController>(ReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('get reports', () => {
    let expectedResponse = reportsService.reports;
    let createdResponse = controller.viewBasicReports()
    expect(createdResponse).toEqual(expectedResponse);
  });
  it('get reports by rid', () => {
    let createdResponse = controller.viewSingleReport({'rid':'1'},{c_by:'1',v_by:'2'});
    let expectedResponse = reportsService.reportByZip;
    expect(createdResponse).toEqual(expectedResponse);
  });
});
