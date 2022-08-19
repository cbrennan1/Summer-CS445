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

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService, private asksService: AsksService, private givesService: GivesService, private thanksService: ThanksService, private notesService: NotesService, private reportsService: ReportsService){}
    
    //End Points Regarding Accounts
    //Post Create Account
    @Post()
    create(@Body() createAccountDto: CreateAccountDto, @Res( {passthrough: true}) res) {
        let locationHeader = '/accounts/' + this.accountsService.counter;
        res.header('Location', locationHeader);
        return this.accountsService.create(createAccountDto);
    }
    //Get Activate Account
    @Get(':uid/activate')
    activateAccount(@Param('uid')uid: string): AccountModel {
        return this.accountsService.activate(parseInt(uid));
    }
    //Put Update Account
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put(':uid')
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
    @Delete(':uid')
    deleteAccount(@Param('uid') uid: string): void {
        this.accountsService.delete(parseInt(uid));
    }
    //Get Find Accounts
    @Get()
    findAccounts(@Query() query?: { key?: string, start_date?: Date, end_date?: Date}): AccountModel[] {
        //console.log(query);
        return this.accountsService.findAll(query.key, query.start_date, query.end_date);
    }
    //Get Find Account by UID
    @Get(':uid')
    findOneAccount(@Param('uid') uid: string): AccountModel {
        return this.accountsService.findOne(parseInt(uid));
    }

    //End Points Regarding Asks
    //Post Create Asks
    @Post(':uid/asks')
    createAsk(@Param('uid') uid: string, @Body() createAskDto: CreateAskDto, @Res( {passthrough: true}) res) {
        if (!this.accountsService.accounts[parseInt(uid)].is_active) {
            throw new BadRequestException('Account is not active, unable to create an Ask');
        }
        let locationHeader = '/accounts/' + createAskDto.uid + '/asks/' + this.asksService.counter;
        res.header('Location', locationHeader);
        return this.asksService.create(createAskDto);
    }
    //Get Deactivate Asks
    @Get(':uid/asks/:aid/deactivate')
    deactivateAsk(@Param('uid') uid: string, @Param('aid') aid: string): AsksModel {
        return this.asksService.deactivate(parseInt(uid), parseInt(aid));
    }
    //Put Update Asks
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put(':uid/asks/:aid')
    updateAsk(@Param('uid') uid: string, @Param('aid') aid: string, @Body() ask: AsksModel): void {
        return this.asksService.update(parseInt(uid), parseInt(aid), ask);
    }
    //Delete Delete 
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':uid/asks/:aid')
    deleteAsk(@Param('uid') uid: string, @Param('aid') aid: string): void {
        return this.asksService.delete(parseInt(uid), parseInt(aid));
    }
    //Get Get Users Asks
    @Get(':uid/asks')
    getMyAsks(@Param('uid', ParseIntPipe) uid: number, @Query() query?: {is_active?: string}) {
        return this.asksService.getMyAsks(uid, query.is_active);
    }
    //Testing
    @Get(':uid/asks/:aid')
    getUsersAsk(@Param('uid') uid: string, @Param('aid') aid: string,){
        return this.asksService.getMyAsks(parseInt(uid), aid);
    }

    //End Points Regarding Gives
    //Post Creating Gives
    @Post(':uid/gives')
    createGive(@Body() createGiveDto: CreateGiveDto) {
        return this.givesService.create(createGiveDto);
    }
    //Get Deactivate Gives
    @Get(':uid/gives/:gid/deactivate')
    deactivateGive() { 
        return this.givesService.deactivate();
    }
    //Put Update Gives
    @Put(':uid/gives/:gid')
    updateGive() {
        return this.givesService.update();
    }
    //Delete Delete Gives
    @Delete(':uid/gives/:gid')
    deleteGive() {
        return this.givesService.delete();
    }
    //Get Get Users Gives
    @Get(':uid/gives')
    getMyGives() {
        return this.givesService.viewMyGives();
    }

    //End Points Regarding Thanks
    //Post Create Thanks
    @Post(':uid/thanks')
    createThanks(@Body() createThankDto: CreateThankDto) {
        return this.thanksService.createThank(createThankDto);
    }
    //Put Update Thanks
    @Put(':uid/thanks/:tid')
    updateThanks() {
        return this.thanksService.update();
    }
    //Get Get Users Thanks
    @Get(':uid/thanks')
    getAccountThanks() {
        return this.thanksService.getMyThanks();
    }

    //End Points Regarding Notes
    //Put Update Asks Notes
    @Put(':uid/asks/:aid/notes/:nid')
    updateAskNote() {
        return this.notesService.updateAskNote();
    }
    //Put Update Gives Notes
    @Put(':uid/gives/:gid/notes/:nid')
    updateGiveNote() {
        return this.notesService.updateGiveNote();
    }

    //Delete Delete Asks Notes
    @Delete(':uid/asks/:aid/notes/:nid')
    deleteAskNote() {
        return this.notesService.deleteAskNote();
    }
    //Delete Delete Gives Notes
    @Delete(':uid/gives/:gid/notes/:nid')
    deleteGiveNote() {
        return this.notesService.deleteGiveNote();
    }

    //Get View Asks Notes
    @Get(':uid/asks/:aid/notes/:nid')
    getAskNotes() {
        return this.notesService.viewNotes();
    }
    //Get View Gives Notes
    @Get(':uid/gives/:gid/notes/:nid')
    getGiveNotes() {
        return this.notesService.viewNotes();
    }
}