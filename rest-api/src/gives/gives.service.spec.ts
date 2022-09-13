import { HttpModule } from '@nestjs/axios';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from '../accounts/accounts.service';
import { GivesService } from './gives.service';

describe('GivesService', () => {
  //Testing SetUp
  let givesService: GivesService;
  let accountService: AccountsService;
  let testGive1 = {
    uid: 0,
    gid: null,
    type: "service",
    description: "This is a test service for gives",
    start_date: "2022-03-01",
    end_date: null,
    extra_zip: ['60616'], 
    is_active: true,
    date_created: null
  }
  let testGive2 = {
    uid: 1,
    gid: null,
    type: "gift",
    description: "This is a test gift for gives",
    start_date: "2022-03-01",
    end_date: null,
    extra_zip: ["60630"],
    is_active: false,
    date_created: null
  }
  let testingGiveCreation = {
    uid: 0,
    gid: null,
    type: "creationtest",
    description: "This is for testing creation service",
    start_date: "2022-03-01",
    end_date: null,
    extra_zip: ["60616","60630"],
    is_active: true,
    date_created: null
  }
  let testingUpdatedGive = {
    uid: 0,
    gid: 0,
    type: "service",
    description: "This is an updated test service testing the updating",
    start_date: "2022-03-01",
    end_date: null,
    extra_zip: ["60616","60630"],
    is_active: true,
    date_created: null
  }
  let testingUpdatedGive2 = {
    uid:3,
    gid: 10,
    type: "gift",
    description: "This is a test gift",
    start_date: "2022-03-01",
    end_date: null,
    extra_zip: ["60616"],
    is_active: true,
    date_created: null
  }
  let testingUpdatedGive3 = {
    uid:1,
    gid: 10,
    type: "gift",
    description: "This is a test gift",
    start_date: "2022-03-01",
    end_date: null,
    extra_zip: ["60616", "60630"],
    is_active: false,
    date_created: null
  }
  //Compile and Initialize
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GivesService, AccountsService],
      imports: [HttpModule]
    }).compile();
    givesService = module.get<GivesService>(GivesService);
    givesService.create(testGive1);
    givesService.create(testGive2);
    givesService.create(testingUpdatedGive3);
  });
  it('should be defined', () => {
    expect(givesService).toBeDefined();
  });

//////////////////////////////////////////CREATION TESTING//////////////////////////////////////////
  //Testing Creating a Give
  it('should create an give with AID', () => {
    let createdGive = givesService.create(testingGiveCreation);
    let gid = createdGive.gid;
    let date = createdGive.date_created;
    expect(createdGive).toEqual(
      {
        uid: 0,
        gid: gid,
        type: "creationtest",
        description: "This is for testing creation service",
        start_date: "2022-03-01",
        end_date: null,
        extra_zip: ["60616","60630"],
        is_active: true,
        date_created: date
      });
  });

//////////////////////////////////////////DEACTIVATION TESTING//////////////////////////////////////////
  //Testing when GID Not Found
  it('should throw a notfoundexception', () => {
    expect(() => {givesService.deactivateGive(420, 420)}).toThrow(NotFoundException)
  })
  //Testing Invalid UID with GID
  it('should throw a notfoundexception', () => {
    expect(() => {givesService.deactivateGive(420, 0)}).toThrow(NotFoundException)
  })  
  //Testing Deactivating Gives
  it('should deactivate an give with GID', () => {
    let deactivatedGive = givesService.deactivateGive(givesService.gives[0].uid, givesService.gives[0].gid);
    expect(deactivatedGive.is_active).toEqual(false);
  });

//////////////////////////////////////////UPDATE TESTING//////////////////////////////////////////
  //Testing Not Found UID
  it('should throw a notfoundexception', () => {
    expect(() => {givesService.update(420, 420, testingUpdatedGive)}).toThrow(NotFoundException)
  });
  //Testing Not matching uid
  it('should throw a notfoundexception', () => {
    expect(() => {givesService.update(420, 0, testingUpdatedGive)}).toThrow(NotFoundException)
  });
  // Inactive UID
  it('should throw a badrequest', () => {
    expect(() => {givesService.update(1, 1, testingUpdatedGive2)}).toThrow(BadRequestException)
  });
  //Testing Updating Gives
  it('should update the pre-existng give with new updated give', () => {
    givesService.update(givesService.gives[0].uid, givesService.gives[0].gid, testingUpdatedGive);
    let gid = givesService.gives[0].gid;
    let date = givesService.gives[0].date_created;
    expect(givesService.gives[0]).toEqual({
      uid: 0,
      gid: gid,
      type: "service",
      description: "This is an updated test service testing the updating",
      start_date: "2022-03-01",
      end_date: null,
      extra_zip: ["60616","60630"],
      is_active: true,
      date_created: date 
      });
  });

//////////////////////////////////////////DELETION TESTING//////////////////////////////////////////
  //Testing AID not found: Deletion
  it('should throw a notfoundexception', () => {
    expect(() => {givesService.delete(0, 420)}).toThrow(NotFoundException)
  })
  //Testing UID not found: Deletion
  it('should throw a notfoundexception', () => {
    expect(() => {givesService.delete(20, 1)}).toThrow(NotFoundException)
  })  
  //Deletion Testing
  it('should delete an gives from the existing list', () => {
    let currentLength = givesService.gives.length;
    givesService.delete(givesService.gives[0].uid, givesService.gives[0].gid);
    let newLength = givesService.gives.length;
    expect(newLength < currentLength).toBeTruthy();
  });
  it('should delete the give identified by gid', () => {
    let preDelete = givesService.gives[0];
    givesService.delete(givesService.gives[0].uid, givesService.gives[0].gid);
    expect(preDelete == givesService.gives[0]).toBeFalsy();
  });

  
//////////////////////////////////////////'Get My Gives" TESTING//////////////////////////////////////////
  //Throw Not Found for invalid UID
  it('should return notfoundexception for no UID', () => {
    expect(() => {givesService.getMyGives(null, 'true')}).toThrow(NotFoundException)
  });
  //View Gives when isactive is true
  it('should find all my active gives', () => {
    let myGives = givesService.gives.filter(give => { 
      return (give.uid == 1);
  });;
    expect(givesService.getMyGives(1, 'true')).toEqual(myGives);
  });
  //View Gives when isactive is false
  it('should find all my inactive gives', () => {
    let myGives = givesService.gives.filter(give => { 
      return (give.uid == 1) && (give.is_active == false);
  });;
    expect(givesService.getMyGives(1, 'false')).toEqual(myGives);
  });
  //Return Gives when isactive is null
  it('should return gives=uid', () => {
    let createdValue = givesService.getMyGives(1, null);
    let expectedValue = givesService.findOne(1);
    expect(createdValue).toContainEqual(expectedValue);
    });
  
//////////////////////////////////////////'findOne Give" TESTING//////////////////////////////////////////  
  //Test should return not found exception for not found gid
  it('should return notfoundexception for invalid gid', () => {
    expect(() => {givesService.findOne(420)}).toThrow(NotFoundException)
  });
  //Test Finding One Give
  it('should find one give identified by the AID', () => {
    let firstGive = givesService.findOne(0);
    let date = givesService.gives[0].date_created;
    expect(firstGive).toEqual({
      uid: 0,
      gid: 0,
      type: "service",
      description: "This is a test service for gives",
      start_date: "2022-03-01",
      end_date: null,
      extra_zip: ["60616"],
      is_active: true,
      date_created: date
    })
  });


//////////////////////////////////////////'findall" TESTING//////////////////////////////////////////  
  //should return not found exception for null vby
  it('should return BadRequestException for null vby', () => {
    expect(() => {givesService.findAll(null, true)}).toThrow(BadRequestException)
  });
  
  //Test viewing as RU
  it('should find gives for RU', () => {
    // User #1 is a Regular User (RU)
    let createdResponse = givesService.findAll(1, true);
    let partialResponse = givesService.gives.filter(give => {
      give.extra_zip.includes('60616');
    });
    let expectedValue = givesService.gives.filter(give => { 
      return ((give.uid == 1) || (partialResponse));
  });;
    expect(createdResponse == expectedValue).toBeTruthy;
  });
  
  //Test viewing as CSR
  it('should find all gives for CSR active=true', () => {
    // User #2 is the Customer Service Representative (CSR)
    let allGives = givesService.findAll(2, "true");
    let allTrue = givesService.gives.filter(give => {
      return give.is_active == true;
    })
    expect(allGives).toEqual(allTrue);
  });
  it('should find all gives for CSR active=false', () => {
    // User #2 is the Customer Service Representative (CSR)
    let allGives = givesService.findAll(2, "false");
    let allFalse = givesService.gives.filter(give => {
      return give.is_active == false;
    })
    expect(allGives).toEqual(allFalse);
  });
  it('should find all gives for CSR no active boolean', () => {
    // User #2 is the Customer Service Representative (CSR)
    let allGives = givesService.findAll(2, null);
    let gives = givesService.gives;
    expect(allGives).toEqual(gives);
  });

  //////////////////////////////////////////'searchGives" TESTING//////////////////////////////////////////  
  //Testing search gives by keyword
  it('should find all gives that match keyword', () => {
    let searchedGives = givesService.searchGives('give');
    let searchResults = givesService.gives.filter(give => { 
      let giveDescription = give.description.toLowerCase();
      let giveType = give.type.toLowerCase();
      return giveDescription.includes('give'.toLowerCase()) || giveType.includes('give'.toLowerCase())})
    expect(searchedGives).toEqual(searchResults);
  });
  //Testing serach gives match keyword and after start date
  it('should find all gives that match keyword and after start date', () => {
    let start = new Date('01-Mar-2000');
    let searchedGives = givesService.searchGives('testing', start);
    let filteredSearch = givesService.gives.filter(give => { 
      let giveDescription = give.description.toLowerCase();
      let giveType = give.type.toLowerCase();
      return (giveDescription.includes('testing'.toLowerCase()) || giveType.includes('testing'.toLowerCase()) ) && ((give.date_created > start))});
    expect(searchedGives.join() == filteredSearch.join()).toBeTruthy();
  });

  //Testing search gives match keyword and before end date
  it('should find all gives that match keyword and before end date', () => {
    let end = new Date('01-Mar-2022');
    let searchedGives = givesService.searchGives('testing', end);
    let filteredSearch = givesService.gives.filter(give => { 
      let giveDescription = give.description.toLowerCase();
      let giveType = give.type.toLowerCase();
      return (giveDescription.includes('testing'.toLowerCase()) || giveType.includes('testing'.toLowerCase()) ) && ((give.date_created < end))});
    expect(searchedGives.join() == filteredSearch.join()).toBeTruthy();
  });
  //Testing search gives match keyword in date range
  it('should find all gives that match keyword and between start and end date', () => {
    let start = new Date('01-Mar-2000');
    let end = new Date('01-Mar-2022');
    let searchedGives = givesService.searchGives('testing', start, end);
    let filteredSearch = givesService.gives.filter(give => { 
      let giveDescription = give.description.toLowerCase();
      let giveType = give.type.toLowerCase();
      return (giveDescription.includes('testing'.toLowerCase()) || giveType.includes('testing'.toLowerCase()) ) && ((give.date_created > start)) && ((give.date_created < end))});
    expect(searchedGives.join() == filteredSearch.join()).toBeTruthy();
  });
  //Testing search gives no query
  it('no query return all gives', () => {
    let allGives = givesService.gives;
    expect(givesService.searchGives()).toEqual(allGives)
  })
});
