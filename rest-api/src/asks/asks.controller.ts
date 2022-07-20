import { Controller } from '@nestjs/common';
import { AsksService } from './asks.service';

@Controller('asks')
export class AsksController {
    constructor(private readonly asksService: AsksService) {}
}
