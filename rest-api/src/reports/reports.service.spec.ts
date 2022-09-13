import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from '../notes/notes.service';
import { AccountsService } from '../accounts/accounts.service';
import { AsksService } from '../asks/asks.service';
import { GivesService } from '../gives/gives.service';
import { ReportsService } from './reports.service';
import { HttpModule } from '@nestjs/axios';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ReportsService', () => {
  let reportsService: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportsService, AccountsService, AsksService, GivesService, NotesService],
      imports: [HttpModule]
    }).compile();

    reportsService = module.get<ReportsService>(ReportsService);
  });

//////////////////////////////////////////FindAll TESTING//////////////////////////////////////////
//Testing to return available reports: zip/communication  
it('should return available reports', () => {
    let testReportsAvailable = reportsService.findAll();
    expect(testReportsAvailable).toEqual(
      [{  
          rid: 1,
          name: 'Asks/gives broken down by zip'
        },{
          rid: 2,
          name: 'Asks/gives and communications for a user'
      }]
      );
  });


//////////////////////////////////////////'Get My Gives" TESTING//////////////////////////////////////////
  //Testing Bad FindSingleReports
  it('should throw a badrequest for null rid', () => {
    expect(() => {reportsService.findSingleReport(null, '2', 2)}).toThrow(BadRequestException)
  });
  it('should throw a badrequest for null vby report1', () => {
    expect(() => {reportsService.findSingleReport(1, '2', null)}).toThrow(BadRequestException)
  });
  it('should throw a badrequest for ru instead of csr report1', () => {
    expect(() => {reportsService.findSingleReport(1, '2', 0)}).toThrow(BadRequestException)
  });
  it('should throw a badrequest for null vby report2', () => {
    expect(() => {reportsService.findSingleReport(2, '2', null)}).toThrow(BadRequestException)
  });
  it('should throw a badrequest for ru instead of csr report3', () => {
    expect(() => {reportsService.findSingleReport(2, '2', 0)}).toThrow(BadRequestException)
  });
  it('should throw a not found for unfound reportid', () => {
    expect(() => {reportsService.findSingleReport(3, '2', 0)}).toThrow(NotFoundException)
  });
  it('should return reports by ZIP', () => {
    let testReportsAvailable = reportsService.findSingleReport(1, '2', 2);
    expect(reportsService.reportByZip).toEqual(testReportsAvailable);
  });
  it('should return reports of COMMUNICATIONS', () => {
    let testReportsAvailable = reportsService.findSingleReport(2, '2', 2);
    expect(reportsService.communicationReport).toEqual(testReportsAvailable);
  });
  it('should return reports of COMMUNICATIONS', () => {
    let testReportsAvailable = reportsService.findSingleReport(2, '', 2);
    expect(reportsService.communicationReport).toEqual(testReportsAvailable);
  });

});
