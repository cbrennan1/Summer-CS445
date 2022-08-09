import { Injectable } from '@nestjs/common';
import { NotesModel } from './notes.interface';


@Injectable()
export class NotesService {
    private readonly notes: NotesModel[] = [];

    create(note: NotesModel) {
        this.notes.push(note);
    }
    updateAskNote() {

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
