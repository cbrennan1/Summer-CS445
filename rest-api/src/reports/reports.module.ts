import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { AsksService } from '../asks/asks.service';
import { GivesService } from '../gives/gives.service';
import { NotesService } from '../notes/notes.service';
import { HttpModule } from '@nestjs/axios';
import { AccountsService } from '../accounts/accounts.service';

@Module({
  providers: [ReportsService, AsksService, GivesService, NotesService, AccountsService],
  controllers: [ReportsController],
  exports: [ReportsService],
  imports: [HttpModule]
})
export class ReportsModule {}
