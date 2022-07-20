import { Module } from '@nestjs/common';
import { GivesService } from './gives.service';
import { GivesController } from './gives.controller';

@Module({
  providers: [GivesService],
  controllers: [GivesController],
  exports: [GivesService]
})
export class GivesModule {}
