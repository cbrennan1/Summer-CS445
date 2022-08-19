import { Module } from '@nestjs/common';
import { AsksService } from './asks.service';
import { AsksController } from './asks.controller';


@Module({
  controllers: [AsksController],
  providers: [AsksService],
  exports: [AsksService],
})
export class AsksModule {}
