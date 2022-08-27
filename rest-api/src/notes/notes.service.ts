import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AsksModel } from '../asks/asks.interface';
import { NotesCreationDto } from '../dto/dto.notes';
import { NotesModel } from './notes.interface';


@Injectable()
export class NotesService {
    private readonly notes: NotesModel[] = [];
    public counter = 0;
    //Create Notes Service
    create(createNotesDto: NotesCreationDto): NotesModel {
        let nid = this.counter;
        const newNote: NotesModel = {
            ...createNotesDto,
            nid
        };
        newNote.uid = +newNote.uid;
        newNote.nid = +newNote.nid;
        newNote.to_user_id = +newNote.to_user_id;
        newNote.to_id = +newNote.to_id;
        this.notes.push(newNote);
        this.counter ++;
        return newNote;
    }
    //Update Notes Service
    update(uid: number, nid: number, notes: NotesModel): void {
        //Error Handling
        if (!this.notes[nid]) {
            throw new NotFoundException('Error: Ask AID: ' +nid+ ' was not found, unable to update.');
        }else if (uid != this.notes[nid].uid) {
            throw new NotFoundException('Error: Account UID: ' +uid+ ' is not valid, unable to update.');
        }
        //Updating Ask
        const updatedNotes: NotesModel = {
            ...notes
        };
        updatedNotes.date_created = this.notes[nid].date_created;
        this.notes[nid] = updatedNotes;
        this.notes[nid].uid = +this.notes[nid].uid;
        this.notes[nid].nid = +this.notes[nid].nid;
    }
    updateGiveNote() {

    }
    deleteAskNote() {

    }
    deleteGiveNote() {

    }
    getAskNote() {

    }
    getGiveNote() {
        
    }
    findAll(): NotesModel[] {
        return this.notes
    }
    viewNotes() {
        
    }
    searchNotes(key?: string, start_date?: Date, end_date?: Date): NotesModel[] {
        if (key) {
            return this.notes.filter(note => { 
                let noteDescription = note.description.toLowerCase();
                return noteDescription.includes(key.toLowerCase()) });
        }
        return this.notes;
    }

}
