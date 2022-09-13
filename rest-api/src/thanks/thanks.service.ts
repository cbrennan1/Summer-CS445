import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateThanksDto } from '../dto/dto.thanks';
import { ThanksModel } from './thanks.interface';


@Injectable()
export class ThanksService {
    //Counter and Thanks Decleration
    public readonly thanks: ThanksModel[] = [];
    public counter = 0;
    
    //Create Thanks Service
    createThanks(createThankDto: CreateThanksDto): ThanksModel {
        //Error Handling
        if ((createThankDto.uid == null || "") || (createThankDto.description == null || "") || (createThankDto.thank_to == null || "")) {
            throw new BadRequestException("Error: All required fields must be entered.");
        }; 
        if (createThankDto.date_created) {
            throw new BadRequestException("Unable to predetermine thanks 'date_created'.");
        };
        if (createThankDto.tid) {
            throw new BadRequestException("Unable to predetermine thanks 'tid'.");
        };
        //Thanks Creation
        let tid = this.counter;
        let date = new Date();
        const newThanks: ThanksModel = {
            ...createThankDto,
            tid
        };
        newThanks.uid = +newThanks.uid;
        newThanks.tid = + newThanks.tid;
        newThanks.thank_to = +newThanks.thank_to;
        newThanks.date_created = date;
        this.thanks.push(newThanks);
        this.counter ++;
        return newThanks;
    }
    //Update Thanks Service
    update(uid: number, tid: number, thank: ThanksModel): ThanksModel {
        //Error Handling
        if (!this.thanks[tid]) {
            throw new NotFoundException("Error: Provided Thanks TID: " +tid+  " was not found; unable to update.");
        }
        else if (uid != this.thanks[tid].uid) {
            throw new NotFoundException("Error: Provided Account UID: " +uid+  " was not valid; unable to update.");
        }
        //Updating Thanks
        const updatedThanks: ThanksModel = {
            ...thank
        };
        this.thanks[tid] = updatedThanks;
        return updatedThanks;
    }
    //Get Users Thanks Service
    getAccountThanks(uid: number, is_active?: boolean): ThanksModel[] {
        //Error Handling
        if (!uid){
            throw new NotFoundException("Error: A valid 'UID' is required to obtain specified user's Thanks.");
        } 
        //Obtaining Users Thanks
        else {
            return this.thanks.filter(thank => { 
                return thank.uid == uid;
            });
        }
    }
    //Find All Thanks Service
    findAll(): ThanksModel[] {
        return this.thanks
    }
    //Find Specific Thanks Service
    findOne(tid: number): ThanksModel {
        const thank: ThanksModel = this.thanks.find(thank => thank.tid === tid);
        //Error Handling
        if (!thank) {
            throw new NotFoundException('Provided Thanks TID: ' +tid+ 'was not found.');
        }
        //Return Singular Thanks
        return thank;
    }
    //Find All Thanks For Specified User Service
    findAllForUser(uid?: number): ThanksModel[] {
        if (uid) {
            return this.thanks.filter(thank => { 
                return (thank.thank_to == uid);
            });
        } else {
            throw new BadRequestException('Error: Unable to find any thanks for the specified UID: ' +uid+ '.');
        };
    }
    //Search Thanks Service
    searchThanks(key?: string, start_date?: Date, end_date?: Date): ThanksModel[] {
        //With Keys Specified
        if (key) {
            return this.thanks.filter(thank => { 
                let thankDescription = thank.description.toLowerCase();
                return thankDescription.includes(key.toLowerCase()) });
        }
        //All Thanks
        return this.thanks;
    }
}
