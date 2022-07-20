import { Module } from '@nestjs/common';
import { AsksService } from './asks.service';
import { AsksController } from './asks.controller';

@Module({
  providers: [AsksService],
  controllers: [AsksController],
  exports: [AsksService]
})
export class AsksModule {}
