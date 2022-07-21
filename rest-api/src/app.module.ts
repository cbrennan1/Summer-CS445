import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { AsksModule } from './asks/asks.module';
import { GivesModule } from './gives/gives.module';
import { NotesModule } from './notes/notes.module';
import { ReportsModule } from './reports/reports.module';
import { ThanksModule } from './thanks/thanks.module';




@Module({
  imports: [AccountsModule, AsksModule, GivesModule, NotesModule, ReportsModule, ThanksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
