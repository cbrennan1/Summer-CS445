//Imports
import { BadRequestException, Injectable, NotFoundException, HttpServer } from '@nestjs/common';
import { AsksModel } from './asks.interface';
import { CreateAskDto } from '../dto/dto.asks';
import { AccountsService } from '../accounts/accounts.service';
import { HttpService } from '@nestjs/axios';
import { config, map } from 'rxjs';


@Injectable()
export class AsksService {
    //Counter and Asks Decleration
    public readonly asks: AsksModel[] = [];

    public counter = 0;
    constructor(private http: HttpService){}
    private Actors = {
        0: "RU",
        1: "RU",
        2: "CSR"
    };

    //Create Asks Service
    createAsk(createAskDto: CreateAskDto): AsksModel {
        let aid = this.counter;
        let dc = new Date();
        const newAsk: AsksModel = {
            ...createAskDto,
            aid
        };
        newAsk.date_created = dc;
        newAsk.uid = +newAsk.uid;
        newAsk.aid = +newAsk.aid;
        this.asks.push(newAsk);
        this.counter ++;
        return newAsk;
    }
    
    //Deactivate Asks Service
    deactivate(uid: number, aid: number): AsksModel {
        //Error Handling
        if (!this.asks[aid]) {
            throw new NotFoundException('Error: Ask AID: ' +aid+ ' was not found, unable to deactivate.');
        } else if (uid != this.asks[aid].uid) {
            throw new NotFoundException('Error: Account UID: ' +uid+ ' is not valid, unable to deactivate.');
        }
        //Deactivation of Ask
        this.asks[aid].is_active = false;
        return this.asks[aid];
    } 
    //Update Asks Service
    update(uid: number, aid: number, ask: AsksModel): void {
        //Error Handling
        if (!this.asks[aid]) {
            throw new NotFoundException('Error: Ask AID: ' +aid+ ' was not found, unable to update.');
        }else if (uid != this.asks[aid].uid) {
            throw new NotFoundException('Error: Account UID: ' +uid+ ' is not valid, unable to update.');
        }else if (!this.asks[aid].is_active) {
            throw new BadRequestException('Error: Ask: ' +aid+ ' is not active, unable to update.')
        }
        //Updating Ask
        const updatedAsk: AsksModel = {
            ...ask
        };
        updatedAsk.date_created = this.asks[aid].date_created;
        this.asks[aid] = updatedAsk;
        this.asks[aid].uid = +this.asks[aid].uid;
        this.asks[aid].aid = +this.asks[aid].aid;
    }
    //Delete Asks Service
    delete(uid: number, aid: number): void {
        //Error Handling
        if (!this.asks[aid]) {
            throw new NotFoundException('Error: Ask AID: ' +aid+ ' is was not found, unable to delete.');
        }else if (uid != this.asks[aid].uid) {
            throw new NotFoundException('Error: Account UID: ' +uid+ ' is is not valid, unable to delete.');
        }
        //Deleting Ask
        this.asks.splice(aid, 1);
    }
    //Get Users Asks
    getMyAsks(uid: number, is_active?: string): AsksModel[] {
        if (uid) {
            if (is_active != null) {
                let activeBoolean = is_active == 'true' ? true : false
                if (activeBoolean) {
                    return this.asks.filter(ask => { 
                        return (ask.uid == uid) && ask.is_active;
                    });
                }else if (!activeBoolean) {
                    return this.asks.filter(ask => { 
                        return (ask.uid == uid) && !ask.is_active;
                    });
                }
            }
            return this.asks.filter(ask => { 
                return (ask.uid == uid);
            });
        }else {
            throw new NotFoundException('Error: The provided UID: ' +uid+ ' is not valid. UID is required to find specified account Asks.');
        }
    }
    //Find Ask by AID
    findOneAsk(aid: number): AsksModel {   
        const ask: AsksModel = this.asks.find(ask => ask.aid === aid);
        //Error Handling
        if (ask == null) {
            throw new NotFoundException('Error: Ask ' +aid+ ' was not found.');
        }
        //Return Singular Ask
        else if (ask) {
            return ask;}
    }
    //Find All Asks (CSR can see all Asks RU can see their asks)
    findAll(v_by: number, is_active: boolean): AsksModel[] {
        if (v_by) {
            //CSR accounts are able to view all Asks in the system.
            const Actor = this.Actors[v_by];
            if (Actor == "CSR"){
                return this.asks;
            }
            //RU accounts are able to return the asks specified to their account.
            else if (Actor == "RU"){
                //Return All Asks for RU
                    return this.asks.filter(ask => { 
                        return (ask.uid == 3 && ask.type == 'gift');
                    });
            }
        } 
        else {
            throw new NotFoundException("Error: VBy must be specified")
        }
    }

}
