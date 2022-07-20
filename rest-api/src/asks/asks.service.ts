import { Injectable } from '@nestjs/common';
import { AsksModel } from './asks.interface';
import { AsksModule } from './asks.module';

@Injectable()
export class AsksService {
    private asks: Array<AsksModel> = [];
}
