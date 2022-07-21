import { Module } from '@nestjs/common';
import { ThanksService } from './thanks.service';
import { ThanksController } from './thanks.controller';

@Module({
  providers: [ThanksService],
  controllers: [ThanksController],
  exports: [ThanksService]
})
export class ThanksModule {}
