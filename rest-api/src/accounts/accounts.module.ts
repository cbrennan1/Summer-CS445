import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AsksService } from '../asks/asks.service';
import { GivesService } from '../gives/gives.service';
import { NotesService } from '../notes/notes.service';
import { PostsService } from '../posts/posts.service';
import { ReportsService } from '../reports/reports.service';
import { ThanksService } from '../thanks/thanks.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, AsksService, GivesService, NotesService, PostsService, ReportsService, ThanksService],
  exports: [AccountsService],
})
export class AccountsModule {}
