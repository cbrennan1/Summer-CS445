import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  //Testing Setup
  let notesService: NotesService;
  let conversationIndex: number;

  let testNote1 = {
    uid: 0,
    nid: null,
    to_type: 'give',
    to_user_id: 0,
    to_id: 0,
    description: 'this is a test note with nid0',
    date_created: null
  }
  let testNote2 = {
    uid: 0,
    nid: null,
    to_type: 'note',
    to_user_id: 0,
    to_id: 0,
    description: 'this is also a test note with nid1',
    date_created: null
  }
  let updatedNote = {
    uid: 1,
    nid: 0,
    to_type: 'note',
    to_user_id: 0,
    to_id: 0,
    description: 'this is a test note that has been updated',
    date_created: null
  }
  let testNote3 = {
    uid: 5,
    nid: 9,
    to_type: 'note',
    to_user_id: 0,
    to_id: 0,
    description: 'this is a test note that has been updated',
    date_created: null
  }
  let updatedTestNote3 = {
    uid: 5,
    nid: 9,
    to_type: 'give',
    to_user_id: 0,
    to_id: 0,
    description: 'this note has been updated to give',
    date_created: null
  }
  //Compile and Initialize
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotesService],
    }).compile();
    notesService = module.get<NotesService>(NotesService);
    notesService.create(testNote1);
    notesService.create(testNote2);
  });

//////////////////////////////////////////CREATION TESTING//////////////////////////////////////////
  //Testing Creating a Note
  it('should create a note with NID', () => {
    let createdNote = notesService.create(testNote1);
    let nid = createdNote.nid;
    let date = createdNote.date_created;
    expect(createdNote).toEqual(
      {
        uid: 0,
        nid: nid,
        to_type: 'give',
        to_user_id: 0,
        to_id: 0,
        description: 'this is a test note with nid0',
        date_created: date
      });
  });
  //Testing New Note Type: Note
  it('testing new note type: note', () => {
    let newNote = notesService.create(testNote2);
    let date = newNote.date_created;
    if (newNote.to_type == 'note'){
    let conversationIndex = (notesService.conversations.findIndex(conversation => {return (conversation.uid == newNote.uid) || (conversation.uid == newNote.to_user_id)}));
    let noteReplyIndex: number;
    if ((notesService.conversations[conversationIndex].conversations.findIndex(note => {return (note.with_uid == newNote.to_user_id)})) != -1) {
        noteReplyIndex = (notesService.conversations[conversationIndex].conversations.findIndex(note => {return (note.with_uid == newNote.to_user_id)}));
    } else {
        noteReplyIndex = (notesService.conversations[conversationIndex].conversations.findIndex(note => {return (note.notes.at(-1).nid == newNote.to_id)}));
    }
    notesService.conversations[conversationIndex].conversations[noteReplyIndex].notes.push(newNote);    
    expect(newNote).toEqual(
      {
        uid: 0,
        nid: 2,
        to_type: 'note',
        to_user_id: 0,
        to_id: 0,
        description: 'this is also a test note with nid1',
        date_created: date
      });
  }
  expect(newNote).toEqual(
    {
      uid: 0,
      nid: 2,
      to_type: 'note',
      to_user_id: 0,
      to_id: 0,
      description: 'this is also a test note with nid1',
      date_created: date
    });
  });

//////////////////////////////////////////UPDATING TESTING//////////////////////////////////////////
  //Testing NID not found: Updating
  it('should throw a notfoundexception for invalid NID when updating', () => {
    expect(() => {notesService.update(420, updatedNote)}).toThrow(NotFoundException)
  });  
  //Testing Updating A Note
  it('should update the pre-existng note with new note', () => {
    notesService.update(notesService.notes[0].nid, updatedNote);
    let date = notesService.notes[0].date_created;
    expect(notesService.notes[0]).toEqual({
      uid: 1,
      nid: 0,
      to_type: 'note',
      to_user_id: 0,
      to_id: 0,
      description: 'this is a test note that has been updated',
      date_created: date
    });
  });
  //Testing Verify Conversation Index When Updating
  it('should return a conversation index', () => {
    notesService.create(testNote3);
    notesService.update(2, updatedTestNote3);
    if (notesService.conversations.findIndex(conversation => {return (conversation.uid == updatedNote.to_user_id)}) != -1) {
      conversationIndex = notesService.conversations.findIndex(conversation => {return (conversation.uid == updatedNote.to_user_id)})
  } else {
      conversationIndex = notesService.conversations.findIndex(conversation => {return (conversation.uid == updatedNote.uid)})
  }    
  expect(conversationIndex).toBeGreaterThanOrEqual(0);
  });
  //Testing Verify Note Reply Index When Updating
  it('should return a note reply index', () => {
    notesService.create(testNote3);
    notesService.update(2, updatedTestNote3);
    let noteReplyIndex: number;
    if (notesService.conversations[conversationIndex].conversations.findIndex(note => {return (note.with_uid == updatedNote.uid)}) != -1) {
      noteReplyIndex = notesService.conversations[conversationIndex].conversations.findIndex(note => {return (note.with_uid == updatedNote.uid)})
  } else {
      noteReplyIndex = notesService.conversations[conversationIndex].conversations.findIndex(note => {return (note.with_uid == updatedNote.to_user_id)})
  }  
  expect(noteReplyIndex).toBeGreaterThanOrEqual(0);
  })
//////////////////////////////////////////DELETION TESTING//////////////////////////////////////////
  //Testing NID not found: Deletion
  it('should throw a notfoundexception', () => {
    expect(() => {notesService.delete(420, 420)}).toThrow(NotFoundException)
  });
  //Testing UID validation: Deletion
  it('should throw a notfoundexception', () => {
    expect(() => {notesService.delete(420, 0)}).toThrow(NotFoundException)
  });  
  //Testing Note Deletion
  it('should delete the note identified by NID', () => {
    let preDelete = notesService.notes.length;
    notesService.delete(notesService.notes[0].uid, notesService.notes[0].nid);
    expect(preDelete == notesService.notes.length).toBeFalsy();
  });

//////////////////////////////////////////FINDALL TESTING//////////////////////////////////////////
  it('should find all conversations', () => {
    let createdResponse = notesService.findAll();
    expect(createdResponse).toEqual(notesService.conversations);
  });

//////////////////////////////////////////VIEWNOTETWO TESTING//////////////////////////////////////////
//Testing ViewNotesTwo
it('should return note from proivded nid', () => {
  let expectedResponse = notesService.conversations.map(conversation => {
    conversation.conversations = conversation.conversations.filter(element => element.with_uid == 0)
  return conversation;});
  let createdResponse = notesService.viewNotesTwo(0);
  expect(createdResponse).toEqual(expectedResponse);

});

//////////////////////////////////////////VIEWNOTE TESTING//////////////////////////////////////////
  //Testing NID not found: VIEWNotes
  it('should throw a notfoundexception', () => {
    expect(() => {notesService.viewNote(420)}).toThrow(NotFoundException)
  });
  //Testing View Single Note
  it('should return note from proivded nid', () => {
    let createdResponse = notesService.viewNote(0);
    expect(createdResponse).toEqual(notesService.notes[0]);
  });

//////////////////////////////////////////VIEWNOTES TESTING//////////////////////////////////////////
//View Notes as a CSR
  it('should find all notes in the existing list of notes when the user viewing them is CSR', () => {
    // User #2 is the Customer notesService Representative (CSR)
    let allNotesby0 = notesService.viewNotes(0, 2);
    expect(allNotesby0).toEqual(notesService.viewNotes(0, 2));
  });
//Testing View Notes that match parameters
  it('should search all notes that match parameters', () => {
    let keyNotes = notesService.viewNotes(null, null, null, null);
    expect(notesService.viewNotes(null, null, null, null)).toEqual(keyNotes);
  });
});
