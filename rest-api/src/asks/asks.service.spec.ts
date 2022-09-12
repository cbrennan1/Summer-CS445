import { HttpModule } from '@nestjs/axios';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { AsksService } from './asks.service';

describe('AsksService', () => {
  //Testing Setup
  let asksService: AsksService;
  let testAsk1 = {
    uid: 0,
    aid: null,
    type: "service",
    description: "This is a test service for asks",
    start_date: "2022-03-01",
    end_date: null,
    extra_zip: null,
    is_active: true,
    date_created: null
  }
  let testAsk2 = {
    uid: 1,
    aid: null,
    type: "gift",
    description: "This is a test gift for asks",
    start_date: "2022-03-01",
    end_date: null,
    extra_zip: null,
    is_active: false,
    date_created: null
  }
  let testingAskCreation = {
    uid: 0,
    aid: null,
    type: "creationtest",
    description: "This is for testing creation service",
    start_date: "2022-03-01",
    end_date: null,
    extra_zip: null,
    is_active: true,
    date_created: null
  }
  let testingUpdatedAsk = {
    uid: 0,
    aid: 0,
    type: "service",
    description: "This is an updated test service testing the updating",
    start_date: "2022-03-01",
    end_date: null,
    extra_zip: null,
    is_active: true,
    date_created: null
  }
  let testingUpdatedAsk2 = {
    uid:3,
    aid: 10,
    type: "gift",
    description: "This is a test gift",
    start_date: "2022-03-01",
    end_date: null,
    extra_zip: null,
    is_active: true,
    date_created: null
  }
  let testingUpdatedAsk3 = {
    uid:3,
    aid: 10,
    type: "gift",
    description: "This is a test gift",
    start_date: "2022-03-01",
    end_date: null,
    extra_zip: null,
    is_active: true,
    date_created: null
  }

  //Compile and Initialize
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsksService],
      imports: [HttpModule]
    }).compile();
    asksService = module.get<AsksService>(AsksService);
    asksService.createAsk(testAsk1);
    asksService.createAsk(testAsk2);
    asksService.createAsk(testingUpdatedAsk3);
  });
  it('should be defined', () => {
    expect(asksService).toBeDefined();
  });
  
//////////////////////////////////////////CREATION TESTING//////////////////////////////////////////
  //Testing Creating an Ask
  it('should create an ask with AID', () => {
    let createdAsk = asksService.createAsk(testingAskCreation);
    let aid = createdAsk.aid;
    let date = createdAsk.date_created;
    expect(createdAsk).toEqual(
      {
        uid: 0,
        aid: aid,
        type: "creationtest",
        description: "This is for testing creation service",
        start_date: "2022-03-01",
        end_date: null,
        extra_zip: null,
        is_active: true,
        date_created: date
      });
  });

//////////////////////////////////////////Deactivation TESTING//////////////////////////////////////////
  //Testing when AID Not Found
  it('should throw a notfoundexception', () => {
    expect(() => {asksService.deactivate(420, 420)}).toThrow(NotFoundException)
  })
  //Testing Invalid UID with AID
  it('should throw a notfoundexception', () => {
    expect(() => {asksService.deactivate(420, 0)}).toThrow(NotFoundException)
  })  
  //Testing Deactivating Asks
  it('should deactivate an ask with AID', () => {
    let deactivatedAsk = asksService.deactivate(asksService.asks[0].uid, asksService.asks[0].aid);
    expect(deactivatedAsk.is_active).toEqual(false);
  });

//////////////////////////////////////////Update TESTING//////////////////////////////////////////
  // Not Found UID: Bad Account Activation
  it('should throw a notfoundexception', () => {
    expect(() => {asksService.update(420, 420, testingUpdatedAsk)}).toThrow(NotFoundException)
  });
  // Not matching uid: Bad Account Activation
  it('should throw a notfoundexception', () => {
    expect(() => {asksService.update(420, 0, testingUpdatedAsk)}).toThrow(NotFoundException)
  });
  // Inactive UID: Bad Account Activation
  it('should throw a badrequest', () => {
    expect(() => {asksService.update(1, 1, testingUpdatedAsk2)}).toThrow(BadRequestException)
  });
  //Testing Updating Asks
  it('should update the pre-existng ask with new updated ask', () => {
    asksService.update(asksService.asks[0].uid, asksService.asks[0].aid, testingUpdatedAsk);
    let aid = asksService.asks[0].aid;
    let date = asksService.asks[0].date_created;
    expect(asksService.asks[0]).toEqual({
      uid: 0,
      aid: aid,
      type: "service",
      description: "This is an updated test service testing the updating",
      start_date: "2022-03-01",
      end_date: null,
      extra_zip: null,
      is_active: true,
      date_created: date 
      });
  });

//////////////////////////////////////////Deletion TESTING//////////////////////////////////////////
  //Testing AID not found: Deletion
  it('should throw a notfoundexception', () => {
    expect(() => {asksService.delete(0, 420)}).toThrow(NotFoundException)
  })
  //Testing UID not found: Deletion
  it('should throw a notfoundexception', () => {
    expect(() => {asksService.delete(20, 1)}).toThrow(NotFoundException)
  })  
  //Deletion Testing
  it('should delete an asks from the existing list', () => {
    let currentLength = asksService.asks.length;
    asksService.delete(asksService.asks[0].uid, asksService.asks[0].aid);
    let newLength = asksService.asks.length;
    expect(newLength < currentLength).toBeTruthy();
  });
  it('should delete the ask identified by aid', () => {
    let preDelete = asksService.asks[0];
    asksService.delete(asksService.asks[0].uid, asksService.asks[0].aid);
    expect(preDelete == asksService.asks[0]).toBeFalsy();
  });

//////////////////////////////////////////'Get My Asks" TESTING//////////////////////////////////////////
  //Throw Not Found for invalid UID
  it('should return notfoundexception for no UID', () => {
    expect(() => {asksService.getMyAsks(null, 'true')}).toThrow(NotFoundException)
  });
  //View My  when isactive is true
  it('should find all "my" active asks', () => {
    let myAsks = asksService.asks.filter(ask => { 
      return (ask.uid == 1) && ask.is_active;
  });;
    expect(asksService.getMyAsks(1, 'true')).toEqual(myAsks);
  });
  //View Asks when isactive is false
  it('should find all "my" inactive asks', () => {
    let myAsks = asksService.asks.filter(ask => { 
      return (ask.uid == 1) && (ask.is_active == false);
  });;
    expect(asksService.getMyAsks(1, 'false')).toEqual(myAsks);
  });
  //Return Asks when isactive is null
  it('should return asks=uid', () => {
    let createdValue = asksService.getMyAsks(1, null);
    let expectedValue = asksService.findOneAsk(1);
    expect(createdValue).toContainEqual(expectedValue);
    });
  
//////////////////////////////////////////'findOneAsk" TESTING//////////////////////////////////////////  
  //Test should return not found exception for not found aid
  it('should return notfoundexception for invalid aid', () => {
    expect(() => {asksService.findOneAsk(420)}).toThrow(NotFoundException)
  });
  //Test Finding One Ask
  it('should find one ask identified by the AID', () => {
    let firstAsk = asksService.findOneAsk(0);
    let date = asksService.asks[0].date_created;
    expect(firstAsk).toEqual({
      uid: 0,
      aid: 0,
      type: "service",
      description: "This is a test service for asks",
      start_date: "2022-03-01",
      end_date: null,
      extra_zip: null,
      is_active: true,
      date_created: date
    })
  });

//////////////////////////////////////////'findall" TESTING//////////////////////////////////////////  
  //should return not found exception for null vby
  it('should return notfoundexception for null vby', () => {
    expect(() => {asksService.findAll(null, true)}).toThrow(NotFoundException)
  });
  //Test viewing as CSR
  it('should find all asks for CSR', () => {
    // User #2 is the Customer Service Representative (CSR)
    let allAsks = asksService.findAll(2, true);
    expect(allAsks == asksService.asks).toBeTruthy();
  });
  //Test viewing as RU
  it('should find asks for RU', () => {
    // User #1 is a Regular User (RU)
    let ruAsks = asksService.findAll(1, true);
    let expectedValue = asksService.findOneAsk(2);
    expect(ruAsks).toContainEqual(expectedValue);
  });

});
