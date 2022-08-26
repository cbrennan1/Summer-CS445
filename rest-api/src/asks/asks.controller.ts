//Imports
import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Redirect, Res } from '@nestjs/common';
import { AccountModel } from '../accounts/accounts.interface';
import { CreateAskDto } from '../dto/dto.asks';
import { AsksModel } from './asks.interface';
import { AsksService } from './asks.service';
import { HttpService } from '@nestjs/axios';

@Controller('bn/api/')
export class AsksController {
    constructor(private asksService: AsksService, private http: HttpService) {}

    //Get Find Asks (Dependent on v_by and Actor)
    @Get('asks')
    findAsks(@Query() query: { v_by: string, is_active?: string}): AsksModel[] {
        return this.asksService.findAll(parseInt(query.v_by), query.is_active);
    }
    //Get Find One Ask Using AID
    @Get('asks/:aid')
    //@Redirect('http://localhost:8080/accounts/3/asks', 200)
    findOneAsk(@Param('aid') aid: string): AsksModel {
        return this.asksService.findOneAsk(parseInt(aid));
    }
    //Get Search Asks
    @Get('asks')
    searchAsks(@Query() query?: { key?: string, start_date?: Date, end_date?: Date}): AsksModel[] {
        return this.asksService.searchAsks(query.key, query.start_date, query.end_date);
    }

    @Post('asks')
    createAsk(@Param('uid') uid: string, @Body() createAskDto: CreateAskDto, @Res( {passthrough: true}) res) {
        if (!this.asksService.asks[parseInt(uid)].is_active) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                type: 'http://cs.iit.edu/~virgil/cs445/mail.spring2022/project/api/problems/data-validation',
                detail: 'This account ' +uid+ ' is not active an may not create an ask.',
                instance: '/accounts/'+uid,
                title: 'Your request data didn\'t pass validation',
              }, HttpStatus.BAD_REQUEST);
        }
        let locationHeader = '/accounts/' + createAskDto.uid + '/asks/' + this.asksService.counter;
        res.header('Location', locationHeader);
        //this.asksService.postAsk(createAskDto);
        console.log("Asks Service Post Ask has been called from Account Controller");
        return this.asksService.createAsk(createAskDto);
    }
    /*
    @Put('asks/:aid')
     updateAsk(@Param('uid') aid: string, @Param('aid') uid: string, @Body() ask: AsksModel): void {
        console.log('AsksController has been PUT'); 
        return this.asksService.update(parseInt(uid), parseInt(aid), ask);
     }
     */
}
