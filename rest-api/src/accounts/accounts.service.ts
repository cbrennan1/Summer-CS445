//Imports
import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException, Param, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateAccountDto } from '../dto/dto.accounts';
import { AccountModel } from './accounts.interface';

@Injectable()
export class AccountsService {
    //Counter and Actor Declerations
    public counter = 0;
    static Actors = {
        0: "RU",
        1: "CSR"
    };

    //Three Initial Provided Accounts
    private account1 = {
		"uid": null,
		"name": "Virgil Bistriceanu",
		"address": {
			"street": "10 West 31st ST",
			"zip": "60616"
		},
		"phone": "312-567-5146",
		"picture": "http://cs.iit.edu/~virgil/pictures/virgil-head-small-200811.jpg",
		"is_active": true,
		"date_created": ""
	};
    private account2 = {
		"uid": null,
		"name": "Jane Smith",
		"address": {
			"street": "123 2nd ST",
			"zip": "60607"
		},
		"phone": "217-456-7890",
		"picture": "http://example.com/images/jane-smith.jpeg",
		"is_active": false,
		"date_created": ""
	};
    private account3 = {
		"uid": null,
		"name": "CSR #1",
		"address": {
			"street": "101 W Main St.",
			"zip": "60010"
		},
		"phone": "(847) 842-8048",
		"picture": "http://example.com/images/jane-smith.jpeg",
		"is_active": true,
		"date_created": ""
	};

    //Construction of Three Initial Accounts
    public readonly accounts: AccountModel[] = [];
    constructor () {
        this.create(this.account1);
        this.create(this.account2);
        this.create(this.account3);
    }

    //Create Account Service
    create(createAccountDto: CreateAccountDto): AccountModel {
        // find the next id for a new account
        let uid = this.counter;
        const newAccount: AccountModel = {
            ...createAccountDto,
            uid
        };
        this.accounts.push(newAccount);
        this.counter ++;
        return newAccount;
    }

    //Activate Account Service
    activate(uid: number): AccountModel {
        if (uid == null || typeof uid != 'number') {
            throw new BadRequestException('UID is not allowed to be null and must be of type: "Number".')
        }
        if (!this.accounts[uid]) {
            throw new NotFoundException('Account UID was not found, unable to ACTIVATE.');
        }
        this.accounts[uid].is_active = true;
        return this.accounts[uid];
    } 

    //Update Account Service
    update(uid: number, account: AccountModel): void {
        if (!this.accounts[uid]) {
            throw new NotFoundException('Account UID not found, unable to UPDATE');
        }
        if (account.is_active != this.accounts[uid].is_active && account.is_active == true) {
            throw new BadRequestException('Can not activate account by UPDATING');
        }
        let updatedAccount: AccountModel = {
            ...account
        };
        updatedAccount.date_created = this.accounts[uid].date_created;
        this.accounts[uid] = updatedAccount;
        this.accounts[uid].uid = +this.accounts[uid].uid;
    }

    //Delete Account Service
    delete(uid: number): void {
        if (!this.accounts[uid]) {
            throw new NotFoundException('Account UID was not found, unable to DELETE.');
        }
        this.accounts.splice(uid, 1);
    }

    // Search ALL accounts or add optional queries
    findAll(key?: string, start_date?: Date, end_date?: Date): AccountModel[] {
        if (key) {
            if (start_date || end_date) {
                return this.accounts.filter(account => { 
                    let accountName = account.name.toLowerCase();
                    let accountAddressStreet = account.address.street.toLowerCase();    
                    return (accountName.includes(key.toLowerCase()) || accountAddressStreet.includes(key.toLowerCase()) || account.address.zip.includes(key) || account.phone.includes(key)) && ((account.date_created > start_date) && (account.date_created < end_date))});
            }
            return this.accounts.filter(account => { 
                let accountName = account.name.toLowerCase();
                let accountAddressStreet = account.address.street.toLowerCase();
                return accountName.includes(key.toLowerCase()) || accountAddressStreet.includes(key.toLowerCase()) || account.address.zip.includes(key) || account.phone.includes(key) });
        }
        return this.accounts;
    }

    //Find Account by UID
    findOne(uid: number): AccountModel {
        const account: AccountModel = this.accounts.find(account => account.uid === uid);

        if (!account) {
            throw new NotFoundException('Account was not found.');
        }
        return account;
    }
}