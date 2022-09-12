import { Module } from '@nestjs/common';
import { AsksService } from './asks.service';
import { AsksController } from './asks.controller';
import { HttpModule } from '@nestjs/axios';
import { AccountsController } from '../accounts/accounts.controller';
import { AccountsService } from '../accounts/accounts.service';
import { AccountsModule } from '../accounts/accounts.module';


@Module({
  controllers: [AsksController],
  providers: [AsksService],
  exports: [AsksService],
  imports: [HttpModule]
})
export class AsksModule {}
