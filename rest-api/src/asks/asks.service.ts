//Imports
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AsksModel } from './asks.interface';
import { CreateAskDto } from '../dto/dto.asks';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class AsksService {
    //Counter and Asks Decleration
    public readonly asks: AsksModel[] = [];
    public counter = 0;

    //Create Asks Service
    create(createAskDto: CreateAskDto): AsksModel {
        let aid = this.counter;
        const newAsk: AsksModel = {
            ...createAskDto,
            aid
        };
        newAsk.uid = +newAsk.uid;
        newAsk.aid = +newAsk.aid;
        this.asks.push(newAsk);
        this.counter ++;
        return newAsk;
    }

    //Deactivate Asks Service
    deactivate(uid: number, aid: number): AsksModel {
        if (!this.asks[aid]) {
            throw new NotFoundException('Ask AID was not found, unable to deactivate.');
        } else if (uid != this.asks[aid].uid) {
            throw new NotFoundException('Account UID is not valid, unable to deactivate.');
        }
        this.asks[aid].is_active = false;
        return this.asks[aid];
    } 
    //Update Asks Service
    update(uid: number, aid: number, ask: AsksModel): void {
        if (!this.asks[aid]) {
            throw new NotFoundException('Ask AID was not found, unable to update.');
        }else if (uid != this.asks[aid].uid) {
            throw new NotFoundException('Account UID is not valid, unable to update.');
        }else if (!this.asks[aid].is_active) {
            throw new BadRequestException('Ask is not active, unable to update.')
        }
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
        if (!this.asks[aid]) {
            throw new NotFoundException('Ask AID was not found, unable to delete.');
        }else if (uid != this.asks[aid].uid) {
            throw new NotFoundException('Account UID is not valid, unable to delete.');
        }
        this.asks.splice(aid, 1);
    }
    //Get Users Asks
    getMyAsks(uid: number, is_active?: string): AsksModel[] {
        // TO-DO: Process is_active
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
            throw new NotFoundException('Valid UID is required to find specified account Asks');
        }
    }
    //Find All Asks (CSR can see all Asks RU can see their asks)
    findAll(v_by: number, is_active?): AsksModel[] {
        if (v_by) {
            //CSR accounts are able to view all Asks in the system.
            const Actor = AccountsService.Actors[v_by];
            if (Actor === "CSR"){
                return this.asks;
            }
            //RU accounts are able to return the asks specified to their account.
            return this.asks.filter(ask => {
                if (is_active != null) {
                    return this.asks.filter(ask => { 
                        return (ask.uid == v_by) && ask.is_active;
                    });
                } 
            });
        } 
    }
    //Find Ask by AID
    findOne(aid: number): AsksModel {
        const ask: AsksModel = this.asks.find(ask => ask.aid === aid);

        if (!ask) {
            throw new NotFoundException('Ask ' +aid+ ' was not found.');
        }
        return ask;
    }
    //Search Asks
    searchAsks(key?: string, start_date?: Date, end_date?: Date): AsksModel[] {
        if (!key || key === null) {
            return this.asks;
            // throw new BadRequestException('User must be identified before requesting to view asks')
        }
        return this.asks.filter(ask => { 
            // TO-DO: Process s_date & e_date 
            let askDescription = ask.description.toLowerCase();
            return askDescription.includes(key.toLowerCase()) });    }
}