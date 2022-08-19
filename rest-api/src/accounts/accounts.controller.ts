//Imports
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Header, HttpStatus, HttpCode, HttpException, BadRequestException, Res } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AsksService } from '../asks/asks.service'
import { GivesService } from '../gives/gives.service';
import { ThanksService } from '../thanks/thanks.service';
import { NotesService } from '../notes/notes.service';
import { ReportsService } from '../reports/reports.service';
import { AccountModel } from '../accounts/accounts.interface';
import { CreateAccountDto } from '../dto/dto.accounts';
import { CreateAskDto } from '../dto/dto.asks';
import { CreateGiveDto } from '../dto/dto.gives';
import { CreateThankDto } from '../dto/dto.thanks';
import { NotesModel } from '../notes/notes.interface';
import { AccountsModule } from './accounts.module';
import { AsksModel } from '../asks/asks.interface';
import { GivesModel } from '../gives/gives.interface';
import { HttpService } from '@nestjs/axios';

@Controller('bn/api/')
export class AccountsController {
    constructor(private accountsService: AccountsService, private asksService: AsksService, private givesService: GivesService, private thanksService: ThanksService, private notesService: NotesService, private reportsService: ReportsService, private http: HttpService){}
    
    //End Points Regarding Accounts
    //Post Create Account
    @Post('accounts')
    create(@Body() createAccountDto: CreateAccountDto, @Res( {passthrough: true}) res) {
        let locationHeader = '/accounts/' + this.accountsService.counter;
        res.header('Location', locationHeader);
        return this.accountsService.create(createAccountDto);
    }
    //Get Activate Account
    @Get('accounts/:uid/activate')
    activateAccount(@Param('uid')uid: string): AccountModel {
        return this.accountsService.activate(parseInt(uid));
    }
    //Put Update Account
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put('accounts/:uid')
     updateAccount(@Param('uid') uid: string, @Body() account: AccountModel): void {
        this.accountsService.update(parseInt(uid), account);
        /*throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            type: 'http://cs.iit.edu/~virgil/cs445/mail.spring2022/project/api/problems/data-validation',
            detail: 'You may not use PUT to activate an account, use GET /accounts/3/activate instead',
            instance: '/accounts/3',
            error: 'Custom Bad Request Error Message',
          }, HttpStatus.BAD_REQUEST);*/    
    }
    //Delete Delete Account
    @Delete('accounts/:uid')
    deleteAccount(@Param('uid') uid: string): void {
        this.accountsService.delete(parseInt(uid));
    }
    //Get Find Accounts
    @Get('accounts')
    findAccounts(@Query() query?: { key?: string, start_date?: Date, end_date?: Date}): AccountModel[] {
        //console.log(query);
        return this.accountsService.findAll(query.key, query.start_date, query.end_date);
    }
    //Get Find Account by UID
    @Get('accounts/:uid')
    findOneAccount(@Param('uid') uid: string): AccountModel {
        return this.accountsService.findOne(parseInt(uid));
    }

    //End Points Regarding Asks
    //Post Create Asks
    @Post('accounts/:uid/asks')
    createAsk(@Param('uid') uid: string, @Body() createAskDto: CreateAskDto, @Res( {passthrough: true}) res) {
        if (!this.accountsService.accounts[parseInt(uid)].is_active) {
            throw new BadRequestException('Account is not active, unable to create an Ask.');
        }
        let locationHeader = '/accounts/' + createAskDto.uid + '/asks/' + this.asksService.counter;
        res.header('Location', locationHeader);
        console.log('PostedFromAccountController');
        //this.http.post('http://localhost:8080/bn/api/asks', createAskDto);
        this.postAsks;
        return this.asksService.create(createAskDto);
    }

    postAsks(@Body() createAskDto: CreateAskDto){
        return this.http.post('http://localhost:8080/bn/api/asks', createAskDto);
    }

    //Get Deactivate Asks
    @Get('accounts/:uid/asks/:aid/deactivate')
    deactivateAsk(@Param('uid') uid: string, @Param('aid') aid: string): AsksModel {
        return this.asksService.deactivate(parseInt(uid), parseInt(aid));
    }
    //Put Update Asks
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put('accounts/:uid/asks/:aid')
    updateAsk(@Param('uid') uid: string, @Param('aid') aid: string, @Body() ask: AsksModel): void {
        return this.asksService.update(parseInt(uid), parseInt(aid), ask);
    }
    //Delete Delete 
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('accounts/:uid/asks/:aid')
    deleteAsk(@Param('uid') uid: string, @Param('aid') aid: string): void {
        return this.asksService.delete(parseInt(uid), parseInt(aid));
    }
    //Get Get Users Asks
    @Get('accounts/:uid/asks')
    getMyAsks(@Param('uid', ParseIntPipe) uid: number, @Query() query?: {is_active?: string}) {
        return this.asksService.getMyAsks(uid, query.is_active);
    }
    //Testing
    @Get('accounts/:uid/asks/:aid')
    getUsersAsk(@Param('uid') uid: string, @Param('aid') aid: string,){
        return this.asksService.getMyAsks(parseInt(uid), aid);
    }

    //End Points Regarding Gives
    //Post Creating Gives
    @Post('accounts/:uid/gives')
    createGive(@Param('uid') uid: string, @Body() createGiveDto: CreateGiveDto, @Res( {passthrough: true}) res) {
        if (!this.accountsService.accounts[parseInt(uid)].is_active) {
            throw new BadRequestException('Account is not active, unable to create a Give.');
        }
        let locationHeader = '/accounts/' + createGiveDto.uid + '/gives/' + this.givesService.counter;
        res.header('Location', locationHeader);
        return this.givesService.create(createGiveDto);
    }
    //Get Deactivate Gives
    @Get('accounts/:uid/gives/:gid/deactivate')
    deactivateGive(@Param('uid') uid: string, @Param('gid') gid: string): GivesModel { 
        return this.givesService.deactivateGive(parseInt(uid), parseInt(gid));
    }
    //Put Update Gives
    @Put('accounts/:uid/gives/:gid')
    @HttpCode(HttpStatus.NO_CONTENT)
    updateGive(@Param('uid') uid: string, @Param('gid') gid: string, @Body() give: GivesModel): void {
        return this.givesService.update(parseInt(uid), parseInt(gid), give);
    }
    //Delete Delete Gives
    @Delete('accounts/:uid/gives/:gid')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteGive(@Param('uid') uid: string, @Param('gid') gid: string): void {
        return this.givesService.delete(parseInt(uid), parseInt(gid));
    }
    //Get Users Gives
    @Get('accounts/:uid/gives')
    getMyGives(@Param('uid', ParseIntPipe) uid: number, @Query() query?: {is_active?: string}) {
        return this.givesService.getMyGives(uid, query.is_active);
    }

    //End Points Regarding Thanks
    //Post Create Thanks
    @Post('accounts/:uid/thanks')
    createThanks(@Body() createThankDto: CreateThankDto) {
        return this.thanksService.createThank(createThankDto);
    }
    //Put Update Thanks
    @Put('accounts/:uid/thanks/:tid')
    updateThanks() {
        return this.thanksService.update();
    }
    //Get Get Users Thanks
    @Get('accounts/:uid/thanks')
    getAccountThanks() {
        return this.thanksService.getMyThanks();
    }

    //End Points Regarding Notes
    //Put Update Asks Notes
    @Put('accounts/:uid/asks/:aid/notes/:nid')
    updateAskNote() {
        return this.notesService.updateAskNote();
    }
    //Put Update Gives Notes
    @Put('accounts/:uid/gives/:gid/notes/:nid')
    updateGiveNote() {
        return this.notesService.updateGiveNote();
    }

    //Delete Delete Asks Notes
    @Delete('accounts/:uid/asks/:aid/notes/:nid')
    deleteAskNote() {
        return this.notesService.deleteAskNote();
    }
    //Delete Delete Gives Notes
    @Delete('accounts/:uid/gives/:gid/notes/:nid')
    deleteGiveNote() {
        return this.notesService.deleteGiveNote();
    }

    //Get View Asks Notes
    @Get('accounts/:uid/asks/:aid/notes/:nid')
    getAskNotes() {
        return this.notesService.viewNotes();
    }
    //Get View Gives Notes
    @Get('accounts/:uid/gives/:gid/notes/:nid')
    getGiveNotes() {
        return this.notesService.viewNotes();
    }
}