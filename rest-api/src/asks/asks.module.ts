import { Module } from '@nestjs/common';
import { AsksService } from './asks.service';
import { AsksController } from './asks.controller';

@Module({
  providers: [AsksController],
  controllers: [AsksService],
  exports: [AsksService]
})
export class AsksModule {}
