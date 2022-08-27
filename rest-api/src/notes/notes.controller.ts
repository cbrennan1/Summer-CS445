import { Controller } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('bn/api/')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}
}
