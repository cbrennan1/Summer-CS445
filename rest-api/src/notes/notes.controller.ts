import { Body, Controller, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateAccountDto } from '../dto/dto.accounts';
import { NotesCreationDto } from '../dto/dto.notes';
import { NotesModel } from './notes.interface';
import { NotesService } from './notes.service';

@Controller('bn/api/')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}
    //Post Create Notes
    @Post('notes')
    create(@Body() createNotesDto: NotesCreationDto, @Res( {passthrough: true}) res) {
        let locationHeader = '/notes/' + this.notesService.counter;
        res.header('Location', locationHeader);
        return this.notesService.create(createNotesDto);
    }
    //Put Notes
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put('notes/:nid')
    updateNotes(@Param('nid') nid: number, @Param('uid') uid: number, @Body() createNotesDto: NotesModel, @Res( {passthrough: true}) res): void {
        let locationHeader = '/notes/' + createNotesDto.nid;
        res.header('Location', locationHeader);
        this.notesService.update(uid, nid, createNotesDto);
    }
}
