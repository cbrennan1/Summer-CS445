import { Module } from '@nestjs/common';
import { AsksService } from './asks.service';
import { AsksController } from './asks.controller';

@Module({
  providers: [AsksService],
  controllers: [AsksController]
})
export class AsksModule {}
