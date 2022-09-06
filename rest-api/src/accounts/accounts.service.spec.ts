import { BadRequestException, HttpException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
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
  //Test Creation
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
  // Missing Name: Bad Account Creation
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
  // Missing Address Zip Code: Bad Account Creation
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
  // Missing Address Street: Bad Account Creation
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
  // Missing Phone Number: Bad Account Creation
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
  // Missing Picture: Bad Account Creation
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

  //Test Activate
  it('should activate an account', () =>
  expect(accountsService.activate(mockUID)).toEqual({
    uid: expect.any(Number),
    name: expect.any(String),
    address: { street : expect.any(String), zip : expect.any(String) },
    phone: expect.any(String),
    picture: expect.any(String),
    is_active: expect.any(Boolean),
    date_created: expect.any(String)
  }));
  // Non Number UID: Bad Account Activation
  it('should throw a BadRequestException if attempting to activate without a number uid', () => {
    expect(() => {accountsService.activate(null)
    }).toThrow(BadRequestException);
  });
  // Not Found UID: Bad Account Activation
  it('should throw a notfoundexception', () => {
    expect(() => {accountsService.activate(420)}).toThrow(NotFoundException)
  })
  //Test Update
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
  // Not Found UID: Bad Account Updating
  it('should throw a notfoundexception', () => {
    expect(() => {accountsService.update(420, testUpdateAccount)}).toThrow(NotFoundException)
  })
  // Attempting to Activate: Bad Account Updating
  it('should throw a bad Request', () => {
    expect(() => {accountsService.update(1, testUpdateAccount2)}).toThrow(HttpException)
  })
  // Test Delete
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
  // Not Found UID: Bad Account Deletion
  it('should throw a notfoundexception', () => {
    expect(() => {accountsService.delete(420)}).toThrow(NotFoundException)
  });
  //Find One Account
  it('Find One Account', () => {
    expect(() => accountsService.findOne(0)).toBeTruthy
  });
  // Bad UID Find One Account
  it('throw not found exception for finding account', () => {
    expect(() => accountsService.findOne(420)).toThrow(NotFoundException)
  });
  // Find All Accounts no QUery
  it('Find All Accounts no query', () => {
    expect(() =>accountsService.findAll()).toBeTruthy});
  // Find Accounts by Keyword
  it('should find all account that match keyword', () => {
    let accountsSearched = accountsService.findAll('created');
    let filteredAccounts = accountsService.accounts.filter(account => { 
      let accountName = account.name.toLowerCase();
      let accountAddressStreet = account.address.street.toLowerCase();
      return accountName.includes('created'.toLowerCase()) || accountAddressStreet.includes('created'.toLowerCase()) || account.address.zip.includes('created') || account.phone.includes('created') });
    expect(accountsSearched.join() == filteredAccounts.join()).toBeTruthy();
  });

  // Find Accounts by keyword and start_date
  it('should find all accounts that match keyword and after start date', () => {
    let startDate = new Date('01-Mar-2000');
    let accountsSearched = accountsService.findAll('created', startDate);
    let filteredAccounts = accountsService.accounts.filter(account => { 
      let accountName = account.name.toLowerCase();
      let accountAddressStreet = account.address.street.toLowerCase();
      return (accountName.includes('created'.toLowerCase()) || accountAddressStreet.includes('created'.toLowerCase()) || account.address.zip.includes('created') || account.phone.includes('created')) && ((account.date_created > startDate))});
    expect(accountsSearched.join() == filteredAccounts.join()).toBeTruthy();
  });

  // Find Accounts by keyword and end_date
  it('should find all accounts that match keyword and before end date', () => {
    let endDate = new Date('01-Mar-2022')
    let accountsSearched = accountsService.findAll('created', null, endDate);
    let filteredAccounts = accountsService.accounts.filter(account => { 
      let accountName = account.name.toLowerCase();
      let accountAddressStreet = account.address.street.toLowerCase();
      return (accountName.includes('created'.toLowerCase()) || accountAddressStreet.includes('created'.toLowerCase()) || account.address.zip.includes('created') || account.phone.includes('created')) && (account.date_created < endDate)});
    expect(accountsSearched.join() == filteredAccounts.join()).toBeFalsy();
  });

  // Find Accounts by keyword and date range
  it('should find all accounts that match keyword and between date range', () => {
    let start = new Date('01-Mar-2000');
    let end = new Date('01-Mar-2022')
    let accountsSearched = accountsService.findAll('created', start, end);
    let filteredAccounts = accountsService.accounts.filter(account => { 
      let accountName = account.name.toLowerCase();
      let accountAddressStreet = account.address.street.toLowerCase();
      return (accountName.includes('created'.toLowerCase()) || accountAddressStreet.includes('created'.toLowerCase()) || account.address.zip.includes('created') || account.phone.includes('created')) && ((account.date_created > start ) && (account.date_created < end))});
    expect(accountsSearched.join() == filteredAccounts.join()).toBeTruthy();
  });
  
})
