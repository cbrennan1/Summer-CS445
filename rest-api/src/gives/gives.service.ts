import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { CreateGiveDto } from '../dto/dto.gives';
import { GivesModel } from './gives.interface';

@Injectable()
export class GivesService {
    private readonly gives: GivesModel[] = [];
    public counter = 0;
    static Actors = {
        0: "RU",
        1: "RU",
        2: "RU",
        3: "RU",
        4: "CSR"
    };
    //Create Give Service
    create(createGiveDto: CreateGiveDto): GivesModel {
        let gid = this.counter;
        const newGive: GivesModel = {
            ...createGiveDto,
            gid
        };
        newGive.uid = +newGive.uid;
        newGive.gid = + newGive.gid;
        this.gives.push(newGive);
        this.counter ++;
        return newGive;
    }
    //Deactivate Give Service
    deactivateGive(uid: number, gid: number): GivesModel {
        //Error Handling
        if (!this.gives[gid]) {
            throw new NotFoundException('Give GID: ' +gid+ ' was not found, unable to deactivate.');
        } else if (uid != this.gives[gid].uid) {
            throw new NotFoundException('Account UID: ' +uid+ ' was not valid, unable to deactivate.');
        }
        //Deactivate Give
        this.gives[gid].is_active = false;
        return this.gives[gid];
    }
    //Update Give Service
    update(uid: number, gid: number, give: GivesModel): void {
        if (!this.gives[gid]) {
            throw new NotFoundException('Error: Give GID: ' +gid+ ' was not found, unable to update.');
        }else if (uid != this.gives[gid].uid) {
            throw new NotFoundException('Error: Account UID: ' +uid+ ' is not valid, unable to update.');
        }else if (!this.gives[gid].is_active) {
            throw new BadRequestException('Error: Give: ' +gid+ ' is labeled as not active, unable to update.')
        }
        const updatedGive: GivesModel = {
            ...give
        };
        this.gives[gid] = updatedGive;
        this.gives[gid].uid = +this.gives[gid].uid;
        this.gives[gid].gid = +this.gives[gid].gid;
    }
    //Delete Give Service
    delete(uid: number, gid: number): void {
        if (!this.gives[gid]) {
            throw new NotFoundException('Error: Give GID: ' +gid+ ' was not found, unable to delete.');
        }else if (uid != this.gives[gid].uid) {
            throw new NotFoundException('Error: Account UID: ' +uid+ ' invalid, unable to delete.');
        }
        this.gives.splice(gid, 1);
    }
    //Obtain User's Gives Service
    getMyGives(uid: number, is_active?: string): GivesModel[] {
        //Error Handling
        if (!uid){
            throw new NotFoundException('Error: Valid UID is required to find specified account Gives. Provided UID: ' +uid+ ' is not valid.');
        }
        //Return User's Gives
        else {
            if (is_active != null) {
                let activeBoolean = is_active == 'true' ? true : false
                if (!activeBoolean) {
                    return this.gives.filter(give => {
                        return (give.uid == uid) && !give.is_active;
                    });
                }else if (activeBoolean) {
                    return this.gives.filter(give => { 
                        return (give.uid == uid) && !give.is_active;
                    });
                }
            }
            return this.gives.filter(give => { 
                return give.uid == uid;
            });
        }
    }
    //Find All Gives Service
    findAll(v_by: number, is_active?: string): GivesModel[] {
        //Error Handling
        if (!v_by) {
            throw new BadRequestException('Error: UID must be identified before requesting viewing access.')
        }

        //Return Gives Service
        //Regular User can see their Gives
        else if (v_by || is_active){
            const Actor = AccountsService.Actors[v_by];
            if (Actor === "RU"){
                return this.gives.filter(give => {
                    if (is_active != null) {
                        let isTrue = (is_active == 'true');
                        let isFalse = (is_active == 'false');
                        if (!isTrue || !isFalse) {
                            return this.gives.filter(give => { 
                                return (give.uid == v_by && give.is_active == true);
                            });
                        }
                        let activeBoolean = is_active == 'true' ? true : false
                        if (activeBoolean) {
                            return this.gives.filter(give => { 
                                return (give.uid == v_by && give.is_active == activeBoolean);
                            });
                        }else if (!activeBoolean) {
                            return this.gives.filter(give => { 
                                return (give.uid == v_by && give.is_active);
                            });
                        }                
                    }    
                });
        }
        //CSR can see all Gives
        else if (Actor === "CSR"){
            if (is_active != null) {
                let isTrue = (is_active == 'true');
                let isFalse = (is_active == 'false');
                if (!isTrue || !isFalse) {
                    return this.gives;
                }

                let activeBoolean = is_active == 'true' ? true : false
                if (activeBoolean) {
                    return this.gives.filter(give => { 
                        return (give.uid == v_by) && give.is_active;
                    });
                }else if (!activeBoolean) {
                    return this.gives.filter(give => { 
                        return (give.uid == v_by) && !give.is_active;
                    });
                }                
            }    
            return this.gives;
        }
    }}
    
    findOne(gid: number): GivesModel {
        const give: GivesModel = this.gives.find(give => give.gid === gid);
        //Error Handling
        if (!give) {
            throw new NotFoundException('Error: Give: ' +gid+ ' was not found.');
        }
        //Return Singular Give
        return give;
    }
    searchGives(key?: string, start_date?: Date, end_date?: Date): GivesModel[] {
        //Potential Query Keys
        if (key) {
            return this.gives.filter(give => { 
                let giveDescription = give.description.toLowerCase();
                return giveDescription.includes(key.toLowerCase()) });
        }
        //Return Gives
        return this.gives;
    }

}