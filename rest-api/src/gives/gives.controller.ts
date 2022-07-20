import { Controller } from '@nestjs/common';
import { GivesService } from './gives.service';

@Controller('gives')
export class GivesController {
    constructor(private readonly givesService: GivesService) {}
}
