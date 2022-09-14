import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ThanksService } from './thanks.service';

describe('ThanksService', () => {
  //Testing Setup
  let thanksService: ThanksService;
  let testThanks1 = {
    uid: 0,
    tid: null,
    thank_to: 0,
    description: "This is a thank you test",
    date_created: null,
  }
  let testThanks2 = {
    uid: 0,
    tid: null,
    thank_to: 0,
    description: "This is another thank you test",
    date_created: null,
  }
  let testThanks3 = {
    uid: 2,
    tid: null,
    thank_to: 0,
    description: "This is another thank you test",
    date_created: null,
  }
  let updatedThanks = {
    uid: 2,
    tid: 0,
    thank_to: 0,
    description: "This is an updated thank you test",
    date_created: null,
  }
  let badThanks1 = {
    uid: null,
    tid: null,
    thank_to: null,
    description: null,
    date_created: null,
  }
  let badThanks2 = {
    uid: 0,
    tid: null,
    thank_to: 0,
    description: "Bad Thank Request",
    date_created: '2022-06-12T17:12:56Z',
  }
  let badThanks3 = {
    uid: 0,
    tid: 5,
    thank_to: 1,
    description: "Bad Thank Request",
    date_created: null,
  }

  //Compile and Initialize
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThanksService],
    }).compile();
    thanksService = module.get<ThanksService>(ThanksService);
    thanksService.createThanks(testThanks1);
    thanksService.createThanks(testThanks2);
  });

//////////////////////////////////////////CREATION TESTING//////////////////////////////////////////
    //Testing Bad Thanks Creations
    it('should throw a badRequest', () => {
      expect(() => {thanksService.createThanks(badThanks1)}).toThrow(BadRequestException)
    });
    it('should throw a badRequest', () => {
      expect(() => {thanksService.createThanks(badThanks2)}).toThrow(BadRequestException)
    });
    it('should throw a BadRequest', () => {
      expect(() => {thanksService.createThanks(badThanks3)}).toThrow(BadRequestException)
    });
  //Testing Creating a Thank
  it('should create an thank with tid', () => {
    let createdThank = thanksService.createThanks(testThanks2);
    let tid = createdThank.tid;
    let date = createdThank.date_created;
    expect(createdThank).toEqual(
      {
        uid: 0,
        tid: tid,
        thank_to: 0,
        description: "This is another thank you test",
        date_created: date,
      });
  });

//////////////////////////////////////////UPDATE TESTING//////////////////////////////////////////
  //Testing Bad Thanks Updates
  it('should throw a notfoundexception', () => {
    expect(() => {thanksService.update(null, 0, updatedThanks)}).toThrow(NotFoundException)
  }); 
  it('should throw a notfoundexception', () => {
    expect(() => {thanksService.update(420, 0, updatedThanks)}).toThrow(NotFoundException)
  });
  it('should throw a notfoundexception', () => {
    expect(() => {thanksService.update(0, 420, updatedThanks)}).toThrow(NotFoundException)
  }); 
  //Testing Update Thank
  it('should update the pre-existng thank with new thank', () => {
    thanksService.createThanks(testThanks3);
    thanksService.update(2, 2, updatedThanks);
    expect(thanksService.thanks[2]).toEqual(updatedThanks);
  });

//////////////////////////////////////////GetAccountThanks TESTING//////////////////////////////////////////
  //Testing Bad Thanks Updates
  it('should throw a notfoundexception', () => {
    expect(() => {thanksService.getAccountThanks(null)}).toThrow(NotFoundException)
  });
  //Testing GetAccountThanks
  it('should find all specified account active thanks', () => {
    let myThanks = thanksService.thanks.filter(thank => { 
      return (thank.uid == 1);
  });;
    expect(thanksService.getAccountThanks(1)).toEqual(myThanks);
  });

//////////////////////////////////////////FindAll TESTING//////////////////////////////////////////
  it('should find all thanks in the existing list of thanks', () => {
    // User #2 is the Customer thanksService Representative (CSR)
    let allThanks = thanksService.findAll();
    expect(allThanks == thanksService.thanks).toEqual(true);
  });

//////////////////////////////////////////FindOne TESTING//////////////////////////////////////////
  //Testing Bad Thanks FindOne
  it('should throw a notfoundexception', () => {
    expect(() => {thanksService.findOne(420)}).toThrow(NotFoundException)
  });
  it('should find one thank identified by the TID', () => {
    // User #2 is the Customer thanksService Representative (CSR)
    let index = 0;
    let firstThank = thanksService.findOne(index);
    expect(firstThank == thanksService.thanks[index]).toEqual(true);
  });

//////////////////////////////////////////FindOne TESTING//////////////////////////////////////////
  //Testing Bad Thanks FindOne
  it('should throw a notfoundexception', () => {
    expect(() => {thanksService.findAllForUser(null)}).toThrow(BadRequestException)
  });
  it('should return thanks for a user', () => {
    let expectedResponse = thanksService.thanks.filter(thank => {
      return (thank.thank_to == 1);
    });
    let createdResponse = thanksService.findAllForUser(1);
    expect(createdResponse).toEqual(expectedResponse);
  });

//////////////////////////////////////////SearchThanks TESTING//////////////////////////////////////////
  //Testing no query  
  it('search thanks no query/key', () => {
      let createdResponse = thanksService.searchThanks();
      let allThanks = thanksService.thanks;
      expect(createdResponse).toEqual(allThanks);
    });
  //Testing match keyword
  it('should find all thanks that match keyword', () => {
    let searchedThanks = thanksService.searchThanks('thanks');
    let searchResults = thanksService.thanks.filter(thank => { 
      let thankDescription = thank.description.toLowerCase();
      return thankDescription.includes('thanks'.toLowerCase())})
    expect(searchedThanks).toEqual(searchResults);
  });
  //Testing Search thanks by keyword and after start_date
  it('should find all thanks that match keyword and after start date', () => {
    let start = new Date('01-Mar-2000');
    let searchedThanks = thanksService.searchThanks('testing', start);
    let filteredSearch = thanksService.thanks.filter(thank => { 
      let thankDescription = thank.description.toLowerCase();
      return (thankDescription.includes('testing'.toLowerCase())) && ((thank.date_created > start))});
    expect(searchedThanks.join() == filteredSearch.join()).toBeTruthy();
  });
  //Testing Search thanks by keyword and before end_date
  it('should find all thanks that match keyword and before end date', () => {
    let end = new Date('01-Mar-2022');
    let searchedThanks = thanksService.searchThanks('testing', end);
    let filteredSearch = thanksService.thanks.filter(thank => { 
      let thankDescription = thank.description.toLowerCase();
      return (thankDescription.includes('testing'.toLowerCase()) ) && ((thank.date_created < end))});
    expect(searchedThanks.join() == filteredSearch.join()).toBeTruthy();
  });
  //Testing Search thanks by keyword and in date range
  it('should find all thanks that match keyword and between start and end date', () => {
    let start = new Date('01-Mar-2000');
    let end = new Date('01-Mar-2022');
    let searchedThanks = thanksService.searchThanks('testing', start, end);
    let filteredSearch = thanksService.thanks.filter(thank => { 
      let thankDescription = thank.description.toLowerCase();
      return (thankDescription.includes('testing'.toLowerCase()) ) && ((thank.date_created > start)) && ((thank.date_created < end))});
    expect(searchedThanks.join() == filteredSearch.join()).toBeTruthy();
  });
});
