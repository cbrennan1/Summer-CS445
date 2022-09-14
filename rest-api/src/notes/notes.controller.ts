import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { NotesCreationDto } from '../dto/dto.notes';
import { NotesModel } from './notes.interface';
import { NotesService } from './notes.service';
import { NotesConversationModel } from './notesConversation.interface';

@Controller('bn/api/')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}
    //Post Create Notes
    @Post('notes')
    create(@Body() createNotesDto: NotesCreationDto, @Res( {passthrough: true}) res?) {
        let locationHeader = '/notes/' + this.notesService.counter;
        if (res){
        /* istanbul ignore next */
        res.header('Location', locationHeader);
        }
        return this.notesService.create(createNotesDto);
    }
    //Put Notes
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put('notes/:nid')
    updateNote(@Param('nid', ParseIntPipe) nid: number, @Body() note: NotesModel) {
        return this.notesService.update(nid, note);
    }
    //Get Notes
    @Get('notes')
    viewNotes(@Query() query?: { c_by?: string, v_by?: string, type?: string, agid?: string, key?: string}, ): NotesModel[] | NotesConversationModel[] {
        if (query.c_by){
        return this.notesService.viewNotes(parseInt(query.c_by), parseInt(query.v_by), query.type, parseInt(query.agid));
        }
        if (query.v_by && !query.c_by){
            return this.notesService.viewNotesTwo(parseInt(query.v_by), query.type, parseInt(query.agid));
            }
        if (query.key){
            return []
        }
        else {return this.notesService.findAll();}
    }
}
