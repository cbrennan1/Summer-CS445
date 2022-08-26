import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ThanksModel } from './thanks.interface';
import { ThanksService } from './thanks.service';

@Controller('bn/api/')
export class ThanksController {
    constructor(private thanksService: ThanksService){}
    
    @Get('thanks')
    findThanks(): ThanksModel[] {
        return this.thanksService.findAll();
    }
    @Get('thanks/:tid')
    findOneThank(@Param('tid', ParseIntPipe) tid: number): ThanksModel {
        return this.thanksService.findOne(tid);
    }
    @Get('thanks/received/:uid')
    findThanksForUser(@Param('uid') uid: string): ThanksModel[] {
        return this.thanksService.findAllForUser(parseInt(uid));
    }
    @Get('thanks/:key')
    searchThanks(@Query() query?: { key?: string, start_date?: Date, end_date?: Date}): ThanksModel[] {
        return this.thanksService.searchThanks(query.key, query.start_date, query.end_date);
    }
}
