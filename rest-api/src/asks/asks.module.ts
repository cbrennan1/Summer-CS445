import { Module } from '@nestjs/common';
import { AsksService } from './asks.service';
import { AsksController } from './asks.controller';
import { HttpModule } from '@nestjs/axios';


@Module({
  controllers: [AsksController],
  providers: [AsksService],
  exports: [AsksService],
  imports: [HttpModule]
})
export class AsksModule {}
