import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

describe('NotesController', () => {
  //Testing Setup
  let controller: NotesController;
  let notesService: NotesService;
  let testNote1 = {
    uid : 0,
    nid : 0,
    to_type: "gift",
    to_user_id: 0,
    to_id: 0,
    description: "test note",
    date_created: null
  }
  let testNote2 = {
    uid : 0,
    nid : 1,
    to_type: "gift",
    to_user_id: 0,
    to_id: 0,
    description: "test note",
    date_created: null
  }

  //Compile and Initialize
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotesService],
      controllers: [NotesController],
      exports: [NotesService]    }).compile();

    controller = module.get<NotesController>(NotesController);
    notesService= module.get<NotesService>(NotesService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be defined', () => {
    expect(notesService).toBeDefined();
  });
  it('should create a note', () => {
    notesService.create(testNote1);
    let createdResponse = controller.create(testNote1);
    expect(createdResponse).toEqual(testNote2);
  });
  it('should create a note with res', () => {
    notesService.create(testNote1);
    let createdResponse = controller.create(testNote1, '');
    expect(createdResponse).toEqual(testNote2);
  });

  it('should update a note', () => {
    notesService.create(testNote1);
    let createdResponse = controller.updateNote(0, testNote1);
    expect(createdResponse).toEqual(undefined);
  });
  it('should viewNote just cby', () => {
    let expectedResponse = notesService.viewNotes(1, null, null, null);
    let createdResponse = controller.viewNotes({c_by:'1'});
    expect(createdResponse).toEqual(expectedResponse);
  });
  it('should viewNote just vby and no cby', () => {
    let expectedResponse = notesService.viewNotesTwo(2,'', null);
    let createdResponse = controller.viewNotes({v_by:'1'});
    expect(createdResponse).toEqual(expectedResponse);
  });
  it('should viewNote just key', () => {
    let expectedResponse = [];
    let createdResponse = controller.viewNotes({key:'1'});
    expect(createdResponse).toEqual(expectedResponse);
  });
  it('should viewNote just key', () => {
    let expectedResponse = notesService.findAll();
    let createdResponse = controller.viewNotes({c_by:''});
    expect(createdResponse).toEqual(expectedResponse);
  });
});
