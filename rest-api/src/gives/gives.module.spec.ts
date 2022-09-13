import { Test, TestingModule } from '@nestjs/testing';
import { GivesController } from './gives.controller';
import { GivesModule } from './gives.module';
import { GivesService } from './gives.Service';
import { AccountsService } from '../accounts/accounts.service'

describe('GivesService', () => {
  //Testing Setup
  let givesModule: GivesModule;
  let givesService: GivesService;
    //Compile and Initialize
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [GivesService, AccountsService, GivesModule],
          controllers: [GivesController],
          exports: [GivesService]
        }).compile();
        givesModule = module.get<GivesModule>(GivesModule);
        givesService = module.get<GivesService>(GivesService)
      });
      it('should be defined', () => {
        expect(givesModule).toBeDefined();
      });
});