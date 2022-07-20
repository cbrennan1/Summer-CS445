import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { AccountModel } from './accounts.interface';

@Injectable()
export class AccountsService {
    //private account0 = new Accounts("<uid1>", "Virgil Bistriceanu", address0, "312-567-5146", "http://cs.iit.edu/~virgil/pictures/virgil-head-small-200811.jpg", true, formatted_date);
	//private account1 = new Accounts("<uid2>", "Jane Smith", address1, "217-456-7890", "http://example.com/images/jane-smith.jpeg", false, formatted_date);
	//private account2 = new Accounts("<uid3>", "CSR #1",  address2, "(847) 842-8048", "http://example.com/images/jane-smith.jpeg", true, formatted_date);
	
    
    private accounts: Array<AccountModel> = [];
    private now = new Date();

    private address0 = ['"street": "10 West 31st ST"', '"zip": "60616"'];
    private arr0 = ["<uid0>", "Virgil Bistriceanu", this.address0, "312-567-5146", "http://cs.iit.edu/~virgil/pictures/virgil-head-small-200811.jpg", true, this.now];

    private address1 = ['"street": "123 2nd ST"', '"zip": "60607"'];
    private arr1 = ["<uid1>", "Jane Smith", this.address1, "217-456-7890", "http://example.com/images/jane-smith.jpeg", false, this.now];

    private address2 = ['"street": "101 W Main St."', '"zip": "60010"'];
    private arr2 = ["<uid2>", "CSR #1",  this.address2, "(847) 842-8048", "http://example.com/images/jane-smith.jpeg", true, this.now];

    private accountsStart = [this.arr0, this.arr1, this.arr2];


    public findAll(): Array<AccountModel> {
        return this.accounts;
      }
    public findOne(id: number): AccountModel {
    const account: AccountModel = this.accounts.find(account => account.uid === id);
    
    if (!account) {
        throw new NotFoundException('Account not found.');
    }
    
    return account;
    }

    
    public create(account: AccountModel): AccountModel {
    // if the uid is already in use by another account
    const titleExists: boolean = this.accounts.some(
      (item) => item.uid === account.uid,
    );
    if (titleExists) {
      throw new UnprocessableEntityException('Account uid already exists.');
    }
  
    // find the next uid for the new account
    const maxId: number = Math.max(...this.accounts.map((account) => account.uid), 0);
    const uid: number = maxId + 1;
  
    const newAccount: AccountModel = {
      ...account,
      uid,
    };
  
    this.accounts.push(newAccount);
  
    return newAccount;
  }
  public delete(uid: number): void {
    const index: number = this.accounts.findIndex(accounts => accounts.uid === uid);
  
    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('Account not found.');      
    }
  
    this.accounts.splice(index, 1);
  }
}

