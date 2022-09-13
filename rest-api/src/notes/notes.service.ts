import { All, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { NotesCreationDto } from '../dto/dto.notes';
import { NotesModel } from './notes.interface';
import { NotesConversationModel } from './notesConversation.interface';


@Injectable()
export class NotesService {
    //Declerations
    public readonly notes: NotesModel[] = [];
    public readonly conversations: NotesConversationModel[] = [];
    public counter = 0;

    //Create Notes Service
    create(createNotesDto: NotesCreationDto): NotesModel {
        //Creating Notes in notes: NotesModel
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
        //Conversation Logic
        //Check to see if New Note is not of type 'note'
        if (newNote.to_type == 'note'){
            let conversationIndex = (this.conversations.findIndex(conversation => {return (conversation.uid == newNote.uid) || (conversation.uid == newNote.to_user_id)}));
            let noteReplyIndex: number;
            if ((this.conversations[conversationIndex].conversations.findIndex(note => {return (note.with_uid == newNote.to_user_id)})) != -1) {
                noteReplyIndex = (this.conversations[conversationIndex].conversations.findIndex(note => {return (note.with_uid == newNote.to_user_id)})); 
            } else {
                noteReplyIndex = (this.conversations[conversationIndex].conversations.findIndex(note => {return (note.notes.at(-1).nid == newNote.to_id)}));
                //return newNote;
            }
            this.conversations[conversationIndex].conversations[noteReplyIndex].notes.push(newNote);
            return newNote; 
        }
        else if (newNote.to_type === 'ask' || 'give' || 'thanks') {
            //Check to see if a conversation exists where the sourceID is equal to newnote toID
            if (this.conversations.find(conversation => {return conversation.source_id == newNote.to_id})) {
                let index = this.conversations.findIndex(conversation => {return conversation.source_id == newNote.to_id}); 
                let conversationIndex = this.conversations[index].conversations[this.conversations[index].conversations.findIndex(conversation => {return conversation.with_uid == newNote.uid})];
                //If conversation index is undefined then create new conversation thread below
                if (conversationIndex == undefined) {
                    const newConvoThread = {
                        'with_uid': newNote.uid,
                        'notes': [{
                            uid: newNote.uid,
                            nid: newNote.nid,
                            to_type: newNote.to_type,
                            to_user_id: newNote.to_user_id,
                            to_id: newNote.to_id,
                            description: newNote.description,
                            date_created: newNote.date_created
                        }]
                    };
                    this.conversations[index].conversations.push(newConvoThread);
                } else {
                    this.conversations[index].conversations[this.conversations[index].conversations.findIndex(conversation => {return conversation.with_uid == newNote.uid})].with_uid = newNote.uid;
                    this.conversations[index].conversations[this.conversations[index].conversations.findIndex(conversation => {return conversation.with_uid == newNote.uid})].notes.push(newNote);
                }
            }
            //Create Conversation where sourceID is equal to newNote toID
            else {
                const newConversation: NotesConversationModel = {
                    'uid' : newNote.to_user_id,
                    'source_id': newNote.to_id,
                    'conversations' : [{
                        'with_uid' : newNote.uid, 
                        'notes' : [{
                            uid: newNote.uid,
                            nid: newNote.nid,
                            to_type: newNote.to_type,
                            to_user_id: newNote.to_user_id,
                            to_id: newNote.to_id,
                            description: newNote.description,
                            date_created: newNote.date_created
                        }]
                    }]
                };
                this.conversations.push(newConversation);
            }
        }
        return newNote;
    }

    //Update Notes Service
    update(nid: number, note: NotesModel) {
        if (!this.notes[nid]) {
            throw new NotFoundException('Note NID: '+nid+' was not found, unable to update.');
        }
        const updatedNote: NotesModel = {
            ...note
        };
        updatedNote.uid = +updatedNote.uid;
        updatedNote.nid = + updatedNote.nid;
        updatedNote.to_id = +updatedNote.to_id
        updatedNote.to_user_id = +updatedNote.to_user_id;
        updatedNote.date_created = this.notes[nid].date_created;
        this.notes[nid] = updatedNote;
        let conversationIndex: number;
        let noteReplyIndex: number;

        //Obtain Conversation Index
        if (this.conversations.findIndex(conversation => {return (conversation.uid == updatedNote.to_user_id)}) != -1) {
            conversationIndex = this.conversations.findIndex(conversation => {return (conversation.uid == updatedNote.to_user_id)})
        } else {
            conversationIndex = this.conversations.findIndex(conversation => {return (conversation.uid == updatedNote.uid)})
        }
        //Obtain Note Reply Index
        if (this.conversations[conversationIndex].conversations.findIndex(note => {return (note.with_uid == updatedNote.uid)}) != -1) {
            noteReplyIndex = this.conversations[conversationIndex].conversations.findIndex(note => {return (note.with_uid == updatedNote.uid)})
        } else {
            noteReplyIndex = this.conversations[conversationIndex].conversations.findIndex(note => {return (note.with_uid == updatedNote.to_user_id)})
        }
        //Update Note
        if (this.conversations[conversationIndex].conversations[noteReplyIndex].notes.find(note => {return note.nid == updatedNote.nid})) {
            let noteIndex = this.conversations[conversationIndex].conversations[noteReplyIndex].notes.findIndex(note => {return note.nid == updatedNote.nid});
            this.conversations[conversationIndex].conversations[noteReplyIndex].notes[noteIndex] = updatedNote;
        }

    }
    //Delete Notes Service
    delete(uid: number, nid: number): void {
        //Error Handling
        if (!this.notes[nid]) {
            throw new NotFoundException('Error: Note NID: ' +nid+ ' was not found, unable to delete.');
        }else if (uid != this.notes[nid].uid) {
            throw new NotFoundException('Error: Account UID: ' +uid+ ' invalid, unable to delete.');
        }
        //Deletion of note
        this.notes.splice(nid, 1);
    }
    //Find All Notes Service
    findAll(): NotesConversationModel[] {
        return this.conversations;
    }
    //View Notes with no c_by Service
    viewNotesTwo(v_by: number, type?: string, agid?: number): NotesConversationModel[] {
        if (v_by != null) {
                return this.conversations.map(conversation => {
                    conversation.conversations = conversation.conversations.filter(element => element.with_uid == v_by)
                    return conversation;
                })}}
    //View Singular Note Service
    viewNote(nid: number): NotesModel {
        const note: NotesModel = this.notes.find(note => note.uid === nid);

        if (!note) {
            throw new NotFoundException('Note "'+nid+'" was not found.');
        }
        return note;
    }
    //View Notes with c_by service
    viewNotes(c_by?: number, v_by?: number, type?: string, agid?: number): NotesModel[] | NotesConversationModel[] {
        return this.conversations.filter(thread => { 
            return (thread.uid == c_by)
        });
    }
}
