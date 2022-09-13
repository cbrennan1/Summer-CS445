import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesModule } from './notes.module';
import { NotesService } from './notes.Service';

describe('NotesModule', () => {
  //Testing Setup
  let notesModule: NotesModule;
  let notesService: NotesService;
    //Compile and Initialize
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [NotesService, NotesModule],
            controllers: [NotesController],
            exports: [NotesService]
        }).compile();
        notesService = module.get<NotesService>(NotesService);
        notesModule = module.get<NotesModule>(NotesModule);
      });
      it('should be defined', () => {
        expect(notesModule).toBeDefined();
      });
      it('should be defined', () => {
        expect(notesService).toBeDefined();
      });
});