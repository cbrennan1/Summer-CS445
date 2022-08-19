//Imports
import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { AsksModel } from './asks.interface';
import { AsksService } from './asks.service';

@Controller('asks')
export class AsksController {
    constructor(private asksService: AsksService) {}

    //Get Find Asks (Dependent on v_by and Actor)
    @Get()
    findAsks(@Query() query: { v_by: string, is_active?: string}): AsksModel[] {
        return this.asksService.findAll(parseInt(query.v_by), query.is_active);
    }
    //Get Find One Ask Using AID
    @Get(':aid')
    findOneAsk(@Param('aid') aid: number): AsksModel {
        return this.asksService.findOne(aid);
    }
    //Get Search Asks
    @Get()
    searchAsks(@Query() query?: { key?: string, start_date?: Date, end_date?: Date}): AsksModel[] {
        return this.asksService.searchAsks(query.key, query.start_date, query.end_date);
    }
}
