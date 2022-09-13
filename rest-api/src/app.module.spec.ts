import { Test, TestingModule } from '@nestjs/testing';
import { AccountsModule } from './accounts/accounts.module';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { AsksModule } from './asks/asks.module';
import { GivesModule } from './gives/gives.module';
import { NotesModule } from './notes/notes.module';
import { ReportsModule } from './reports/reports.module';
import { ThanksModule } from './thanks/thanks.module';

describe('AppModule', () => {
  //Testing Setup
  let appModule: AppModule;
  let appService: AppService;
    //Compile and Initialize
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AccountsModule, AsksModule, GivesModule, ThanksModule, NotesModule, ReportsModule, AppModule],
            controllers: [AppController],
            providers: [AppService],
        }).compile();
        appService = module.get<AppService>(AppService);
        appModule = module.get<AppModule>(AppModule);
      });
    it('should be defined', () => {
      expect(appModule).toBeDefined();
    });
    it('should be defined', () => {
      expect(appService).toBeDefined();
    });
});
