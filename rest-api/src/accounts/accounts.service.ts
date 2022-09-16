//Imports
import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException, Param, ParseIntPipe, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { CreateAccountDto } from '../dto/dto.accounts';
import { AccountModel } from './accounts.interface';

@Injectable()
export class AccountsService {
    //Counter and Actor Declerations
    public counter = 0;
    private Actors = {
        0: "RU",
        1: "RU",
        2: "CSR"
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
        if (createAccountDto.name == null){
            throw new BadRequestException('Error: A valid name is required to create an account.')
        }
        if (createAccountDto.address.zip == null){
            throw new BadRequestException('Error: A valid zip code is required to create an account.')
        }
        if (createAccountDto.address.street == null){
            throw new BadRequestException('Error: A valid street is required to create an account.')
        }
        if (createAccountDto.phone == null){
            throw new BadRequestException('Error: A valid phone number is required to create an account.')
        }
        if (createAccountDto.picture == null){
            throw new BadRequestException('Error: A valid picture link is required to create an account.')
        }
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
        //Error Handling
        if (uid == null || typeof uid != 'number') {
            throw new BadRequestException('Error: UID: ' +uid+ '  is not allowed to be null and must be of type: "Number".')
        }
        if (!this.accounts[uid]) {
            throw new NotFoundException('Error: Account UID ' +uid+ '  was not found, unable to activate.');
        }
        //Activate Account
        this.accounts[uid].is_active = true;
        return this.accounts[uid];
    } 
    //Update Account Service
    update(uid: number, account: AccountModel): void {
        //Error Handling
        if (!this.accounts[uid]) {
            throw new NotFoundException('Error: Account UID ' +uid+ '  not found, unable to update.');
        }
        if (account.is_active != this.accounts[uid].is_active && account.is_active == true) {
            throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            type: 'http://cs.iit.edu/~virgil/cs445/mail.spring2022/project/api/problems/data-validation',
            detail: 'You may not use PUT to activate an account, use GET /accounts/'+uid+'/activate instead',
            instance: '/accounts/'+uid,
            title: 'Your request data didn\'t pass validation',
          }, HttpStatus.BAD_REQUEST);
        }
        //Update Account
        let updatedAccount: AccountModel = {
            ...account
        };
        updatedAccount.date_created = this.accounts[uid].date_created;
        this.accounts[uid] = updatedAccount;
        this.accounts[uid].uid = +this.accounts[uid].uid;
    }
    //Delete Account Service
    delete(uid: number): void {
        //Error Handling
        if (!this.accounts[uid]) {
            throw new NotFoundException('Error: Account UID ' +uid+ ' was not found, unable to delete.');
        }
        //Delete Account
        this.accounts.splice(uid, 1);
    }
    //Find Account by UID
    findOne(uid: number): AccountModel {
        const account: AccountModel = this.accounts.find(account => account.uid === uid);
        //Error Handling
        if (!account) {
            throw new NotFoundException('Error: Account UID: ' +uid+ '  was not found.');
        }
        //Return Singular Account
        return account;
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
}
