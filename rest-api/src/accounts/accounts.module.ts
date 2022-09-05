import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AsksService } from '../asks/asks.service';
import { GivesService } from '../gives/gives.service';
import { NotesService } from '../notes/notes.service';
import { ReportsService } from '../reports/reports.service';
import { ThanksService } from '../thanks/thanks.service';
import { HttpModule } from '@nestjs/axios';
import { AsksController } from '../asks/asks.controller';
import { GivesController } from '../gives/gives.controller';
import { ThanksController } from '../thanks/thanks.controller';
import { ReportsController } from '../reports/reports.controller';


@Module({
  controllers: [AccountsController, AsksController, GivesController, ThanksController, ReportsController],
  providers: [AccountsService, AsksService, GivesService, NotesService, ReportsService, ThanksService],
  exports: [AccountsService],
  imports: [HttpModule]
})
export class AccountsModule {}
