import { Module } from '@nestjs/common';
import { GivesService } from './gives.service';
import { GivesController } from './gives.controller';
import { AccountsService } from '../accounts/accounts.service';

@Module({
  providers: [GivesService, AccountsService],
  controllers: [GivesController],
  exports: [GivesService]
})
export class GivesModule {}
