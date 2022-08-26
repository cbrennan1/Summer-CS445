import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { GivesModel } from './gives.interface';
import { GivesService } from './gives.service';

@Controller('bn/api/')
export class GivesController {
    constructor(private givesService: GivesService){}

    @Get('gives')
    findGives(@Query() query: { v_by: string, is_active?: string}): GivesModel[] {
        return this.givesService.findAll(parseInt(query.v_by), query.is_active);
    }
    @Get('gives/:gid')
    findOneGive(@Param('gid', ParseIntPipe) gid: number): GivesModel {
        return this.givesService.findOne(gid);
    }
    @Get('gives')
    searchGives(@Query() query?: { key?: string, start_date?: Date, end_date?: Date}): GivesModel[] {
        return this.givesService.searchGives(query.key, query.start_date, query.end_date);
    }
}