import { BadRequestException, HttpException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
  //Testing Setup
  let accountsService: AccountsService;
  let testAccount1 = {
    uid: null,
    name: 'Created Name 1',
    address: { street : '1111 testing St', zip : '60616' },
    phone: '312-111-1111',
    picture: 'http://testing/exampleimage.com',
    is_active: true,
    date_created: null
  }
  let testAccount2 = {
    uid: null,
    name: 'Created Name 2',
    address: { street : '2222 testing St', zip : '60616' },
    phone: '312-222-2222',
    picture: 'http://testing/exampleimage.com',
    is_active: true,
    date_created: null
  }
  let testUpdateAccount = {
    uid: 0,
    name: 'Updated Account Name',
    address: { street : '1111 testing St', zip : '60616' },
    phone: '312-111-1111',
    picture: 'http://testing/exampleimage.com',
    is_active: false,
    date_created: null
  }
  let testUpdateAccount2 = {
    uid: 1,
    name: 'Updated Account Name',
    address: { street : '1111 testing St', zip : '60616' },
    phone: '312-111-1111',
    picture: 'http://testing/exampleimage.com',
    is_active: true,
    date_created: null
  }
  let mockUID: number = 0;
  const mockcreateAccountDto = {
    uid: null,
    name: "",
    address: { street : "", zip : "" },
    phone: "",
    picture: "",
    is_active: true || false,
    date_created: ""
  }
  //Compile and Initialize
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsService],
    }).compile();
    accountsService = module.get<AccountsService>(AccountsService);
    accountsService.create(testAccount1);
    accountsService.create(testAccount2);
  });
  it('should be defined', () => {
    expect(accountsService).toBeDefined();
  });
//////////////////////////////////////////CREATION TESTING//////////////////////////////////////////
  //Testing No Name Account Creation
  it('should throw a BadRequestException if the mockcreateAccountDto is missing name ', () => {
    expect(() => {accountsService.create({
      uid: null,
      name: null,
      address: { street : '1111 testing St', zip : '09123' },
      phone: '312-111-1111',
      picture: 'http://testing/exampleimage.com',
      is_active: false,
      date_created: null
    })}).toThrow(BadRequestException);
  });
  //Testing No Zip Code Account Creation
  it('should throw a BadRequestException if the mockcreateAccountDto is missing address zip', () => {
    expect(() => {accountsService.create({
      uid: null,
      name: 'Test Account Name',
      address: { street : '1111 testing St', zip : null },
      phone: '312-111-1111',
      picture: 'http://testing/exampleimage.com',
      is_active: false,
      date_created: null
    })}).toThrow(BadRequestException);
  });
  //Testing No Street Account Creation
  it('should throw a BadRequestException if the mockcreateAccountDto is missing address address street', () => {
    expect(() => {accountsService.create({
      uid: null,
      name: 'Test Account Name',
      address: { street : null, zip : '09123' },
      phone: '312-111-1111',
      picture: 'http://testing/exampleimage.com',
      is_active: false,
      date_created: null
    })}).toThrow(BadRequestException);
  });
  //Testing No Phone Account Creation
  it('should throw a BadRequestException if the mockcreateAccountDto is missing phone', () => {
    expect(() => {accountsService.create({
      uid: null,
      name: 'Test Account Name',
      address: { street : '1111 testing St', zip : '09123' },
      phone: null,
      picture: 'http://testing/exampleimage.com',
      is_active: false,
      date_created: null
    })}).toThrow(BadRequestException);
  });
  //Testing No Picture Account Creation
  it('should throw a BadRequestException if the mockcreateAccountDto is missing picture', () => {
    expect(() => {accountsService.create({
      uid: null,
      name: 'Test Account Name',
      address: { street : '1111 testing St', zip : '09123' },
      phone: '312-111-1111',
      picture: null,
      is_active: false,
      date_created: null
    })}).toThrow(BadRequestException);
  });
  //Testing Account Creation
  it('should create an account', () =>
  expect(accountsService.create(mockcreateAccountDto)).toEqual({
    uid: expect.any(Number),
    name: expect.any(String),
    address: { street : "", zip : "" },
    phone: expect.any(String),
    picture: expect.any(String),
    is_active: expect.any(Boolean),
    date_created: expect.any(String)
  }));

//////////////////////////////////////////CREATION TESTING//////////////////////////////////////////
  //Testing Activating Null UID
  it('should throw a BadRequestException if attempting to activate without a number uid', () => {
    expect(() => {accountsService.activate(null)
    }).toThrow(BadRequestException);
  });
  //Testing Activating Not Found UID
  it('should throw a notfoundexception', () => {
    expect(() => {accountsService.activate(420)}).toThrow(NotFoundException)
  })  
  //Testing Activating Account 
  it('should activate an account', () =>
  expect(accountsService.activate(mockUID)).toEqual({
    uid: expect.any(Number),
    name: expect.any(String),
    address: { street : expect.any(String), zip : expect.any(String) },
    phone: expect.any(String),
    picture: expect.any(String),
    is_active: true,
    date_created: expect.any(String)
  }));

//////////////////////////////////////////Update TESTING//////////////////////////////////////////  
  //Testing with Unfound UID
  it('should throw a notfoundexception', () => {
    expect(() => {accountsService.update(420, testUpdateAccount)}).toThrow(NotFoundException)
  })
  //Testing with Inactive Account
  it('should throw a bad Request', () => {
    expect(() => {accountsService.update(1, testUpdateAccount2)}).toThrow(HttpException)
  })
  //Testing Updating Account
  it('should update an account', () => {
  let uid = accountsService.accounts[0].uid;
  accountsService.update(accountsService.accounts[0].uid, testUpdateAccount);
  expect(accountsService.accounts[0]).toEqual(
    {
      uid: uid,
      name: 'Updated Account Name',
      address: { street : '1111 testing St', zip : '60616' },
      phone: '312-111-1111',
      picture: 'http://testing/exampleimage.com',
      is_active: false,
      date_created: ""   
    });
  });

//////////////////////////////////////////Deletion TESTING//////////////////////////////////////////
  //Testing Not Found UID Deletion
  it('should throw a notfoundexception', () => {
  expect(() => {accountsService.delete(420)}).toThrow(NotFoundException)
  });
  //Testing Deletion
  it('should delete an account from the existing list', () => {
    let accountLength = accountsService.accounts.length;
    accountsService.delete(accountsService.accounts[0].uid);
    let newAccountLength = accountsService.accounts.length;
    expect(newAccountLength < accountLength).toBeTruthy();
  });
  it('should delete the account identified by uid', () => {
    let accountToDelete = accountsService.accounts[0];
    accountsService.delete(accountsService.accounts[0].uid);
    expect(accountToDelete == accountsService.accounts[0]).toBeFalsy();
  });
 
//////////////////////////////////////////'find one account' TESTING//////////////////////////////////////////  
  //Testing Finding Invalid UID
  it('throw not found exception for finding account', () => {
    expect(() => accountsService.findOne(420)).toThrow(NotFoundException)
  });
  //Testing Find one account
  it('Find One Account', () => {
    let firstAccount = accountsService.findOne(0);
    expect(firstAccount).toEqual(accountsService.accounts[0]);
    });

//////////////////////////////////////////'find all' TESTING//////////////////////////////////////////  
  //Testing find all accounts no query
  it('Find All Accounts no query', () => {
    let allAccounts = accountsService.findAll();
    expect(allAccounts).toEqual(accountsService.accounts);
  });
  //Testing find all accounts matching specified keyword
  it('should find all account that match keyword', () => {
    let accountsSearched = accountsService.findAll('created');
    let filteredAccounts = accountsService.accounts.filter(account => { 
      let accountName = account.name.toLowerCase();
      let accountAddressStreet = account.address.street.toLowerCase();
      return accountName.includes('created'.toLowerCase()) || accountAddressStreet.includes('created'.toLowerCase()) || account.address.zip.includes('created') || account.phone.includes('created') });
    expect(accountsSearched.join() == filteredAccounts.join()).toBeTruthy();
  });
  //Testing find all accounts that match keyword and after start date
  it('should find all accounts that match keyword and after start date', () => {
    let startDate = new Date('01-Mar-2000');
    let accountsSearched = accountsService.findAll('created', startDate);
    let filteredAccounts = accountsService.accounts.filter(account => { 
      let accountName = account.name.toLowerCase();
      let accountAddressStreet = account.address.street.toLowerCase();
      return (accountName.includes('created'.toLowerCase()) || accountAddressStreet.includes('created'.toLowerCase()) || account.address.zip.includes('created') || account.phone.includes('created')) && ((account.date_created > startDate))});
    expect(accountsSearched.join() == filteredAccounts.join()).toBeTruthy();
  });
  //Testing find all accounts match keyword and before end date
  it('should find all accounts that match keyword and before end date', () => {
    let endDate = new Date('01-Mar-2022')
    let accountsSearched = accountsService.findAll('created', null, endDate);
    let filteredAccounts = accountsService.accounts.filter(account => { 
      let accountName = account.name.toLowerCase();
      let accountAddressStreet = account.address.street.toLowerCase();
      return (accountName.includes('created'.toLowerCase()) || accountAddressStreet.includes('created'.toLowerCase()) || account.address.zip.includes('created') || account.phone.includes('created')) && (account.date_created < endDate)});
    expect(accountsSearched.join() == filteredAccounts.join()).toBeFalsy();
  });
  //Testing find all accounts inside date range
  it('should find all accounts that match keyword and between date range', () => {
    let start = new Date('01-Mar-2000');
    let end = new Date('01-Mar-2022')
    let accountsSearched = accountsService.findAll("created", start, null);
    let filteredAccounts = accountsService.accounts.filter(account => { 
      return ((account.date_created > start ) || (account.date_created < end))
    });
    expect(accountsSearched == filteredAccounts).toBeFalsy
  });
    //Testing find all accounts before start date
    it('should find all accounts created before start date', () => {
      let start = new Date('01-Mar-2000');
      let end = new Date('01-Mar-2022')
      let accountsSearched = accountsService.findAll(null, start, end);
      let filteredAccounts = accountsService.accounts.filter(account => { 
        let accountName = account.name.toLowerCase();
        let accountAddressStreet = account.address.street.toLowerCase();    
        return (accountName.includes(accountName.toLowerCase()) || accountAddressStreet.includes(accountAddressStreet.toLowerCase()) && ((account.date_created > start) && (account.date_created < end))
    )});  
      expect(filteredAccounts).toEqual(accountsSearched)
    });
})
