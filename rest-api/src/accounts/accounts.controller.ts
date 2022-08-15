import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Header, HttpStatus, HttpCode } from '@nestjs/common';
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

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService, private asksService: AsksService, private givesService: GivesService, private thanksService: ThanksService, private notesService: NotesService, private reportsService: ReportsService){}

    //End Points Regarding Accounts
    @Header('Location', 'New Account')
    @Post()
    create(@Body() createAccountDto: CreateAccountDto) {
        return this.accountsService.create(createAccountDto);
    }
    @Get(':uid/activate')
    activateAccount(@Param('uid', ParseIntPipe) uid: number): AccountModel {
        return this.accountsService.activate(uid);
    }
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put(':uid')
    update(@Param('uid', ParseIntPipe) uid: number, @Body() account: AccountModel): AccountModel {
        return this.accountsService.update(uid, account);
    }
    @Delete(':uid')
    delete(@Param('uid', ParseIntPipe) uid: number): void {
        this.accountsService.delete(uid);
    }
    @Get()
    findAccounts(@Query() query?: { key?: string, start_date?: Date, end_date?: Date}): AccountModel[] {
        console.log(query);
        return this.accountsService.findAll(query.key, query.start_date, query.end_date);
    }
    @Get(':uid')
    findOneAccount(@Param('uid', ParseIntPipe) uid: number): AccountModel {
        return this.accountsService.findOne(uid);
    }

     //End Points Regarding Asks
    @Post(':uid/asks')
    createAsk(@Body() createAskDto: CreateAskDto) {
        return this.asksService.create(createAskDto);
    }
    @Get(':uid/asks/:aid/deactivate')
    deactivateAsk(@Param('uid', ParseIntPipe) uid: number, @Param('aid', ParseIntPipe) aid: number) {
        return this.asksService.deactivate(uid, aid);
    }
    @Put(':uid/asks/:aid')
    updateAsk() {
        return this.asksService.update();
    }
    @Delete(':uid/asks/:aid')
    deleteAsk() {
        return this.asksService.delete();
    }
    @Get(':uid/asks')
    getMyAsks(@Query() query?: {is_active?: boolean}) {
        return this.asksService.getMyAsks();
    }

    //End Points Regarding Gives
    @Post(':uid/gives')
    createGive(@Body() createGiveDto: CreateGiveDto) {
        return this.givesService.create(createGiveDto);
    }
    @Get(':uid/gives/:gid/deactivate')
    deactivateGive() { 
        return this.givesService.deactivate();
    }
    @Put(':uid/gives/:gid')
    updateGive() {
        return this.givesService.update();
    }
    @Delete(':uid/gives/:gid')
    deleteGive() {
        return this.givesService.delete();
    }
    @Get(':uid/gives')
    getMyGives() {
        return this.givesService.viewMyGives();
    }

    //End Points Regarding Thanks
    @Post(':uid/thanks')
    createThank(@Body() createThankDto: CreateThankDto) {
        return this.thanksService.createThank(createThankDto);
    }
    @Put(':uid/thanks/:tid')
    updateThank() {
        return this.thanksService.update();
    }
    @Get(':uid/thanks')
    getAccountThanks() {
        return this.thanksService.getMyThanks();
    }


    //End Points Regarding NOtes

    // Update Ask
    @Put(':uid/asks/:aid/notes/:nid')
    updateAskNote() {
        return this.notesService.updateAskNote();
    }
    // Update Give
    @Put(':uid/gives/:gid/notes/:nid')
    updateGiveNote() {
        return this.notesService.updateGiveNote();
    }

    // Delete Ask
    @Delete(':uid/asks/:aid/notes/:nid')
    deleteAskNote() {
        return this.notesService.deleteAskNote();
    }
    // Delete Give
    @Delete(':uid/gives/:gid/notes/:nid')
    deleteGiveNote() {
        return this.notesService.deleteGiveNote();
    }

    // View ask notes
    @Get(':uid/asks/:aid/notes/:nid')
    getAskNotes() {
        return this.notesService.viewNotes();
    }
    // View give notes
    @Get(':uid/gives/:gid/notes/:nid')
    getGiveNotes() {
        return this.notesService.viewNotes();
    }
}