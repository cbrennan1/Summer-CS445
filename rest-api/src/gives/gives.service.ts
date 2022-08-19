import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGiveDto } from '../dto/dto.gives';
import { GivesModel } from './gives.interface';

@Injectable()
export class GivesService {
    private readonly gives: GivesModel[] = [];
    public counter = 0;

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
    deactivateGive(uid: number, gid: number): GivesModel {
        if (!this.gives[gid]) {
            throw new NotFoundException('Give GID was not found, unable to deactivate.');
        } else if (uid != this.gives[gid].uid) {
            throw new NotFoundException('Account UID not found, unable to deactivate.');
        }
        this.gives[gid].is_active = false;
        return this.gives[gid];
    }
    update(uid: number, gid: number, give: GivesModel): void {
        if (!this.gives[gid]) {
            throw new NotFoundException('Give GID was not found, unable to update.');
        }else if (uid != this.gives[gid].uid) {
            throw new NotFoundException('Account UID is not valid, unable to update.');
        }else if (!this.gives[gid].is_active) {
            throw new BadRequestException('Give is labeled as not active, unable to update.')
        }
        const updatedGive: GivesModel = {
            ...give
        };
        this.gives[gid] = updatedGive;
        this.gives[gid].uid = +this.gives[gid].uid;
        this.gives[gid].gid = +this.gives[gid].gid;

    }
    delete(uid: number, gid: number): void {
        if (!this.gives[gid]) {
            throw new NotFoundException('Give GID was not found, unable to delete.');
        }else if (uid != this.gives[gid].uid) {
            throw new NotFoundException('Account UID invalid, unable to delete.');
        }
        this.gives.splice(gid, 1);
    }
    getMyGives(uid: number, is_active?: string): GivesModel[] {
        // TO-DO: Process is_active
        if (uid) {
            if (is_active != null) {
                let activeBoolean = is_active == 'true' ? true : false
                if (activeBoolean) {
                    return this.gives.filter(give => { 
                        return (give.uid == uid) && give.is_active;
                    });
                }else if (!activeBoolean) {
                    return this.gives.filter(give => { 
                        return (give.uid == uid) && !give.is_active;
                    });
                }
            }
            return this.gives.filter(give => { 
                return give.uid == uid;
            });
        }else {
            throw new NotFoundException('Valid UID is required to find specified account Gives.');
        }
    }
    findAll(v_by: number, is_active?): GivesModel[] {
        // TO-DO: Process is_active
        if (v_by) {
            return this.gives.filter(give => { 
                return give.uid == v_by;
            });
        } else {
            throw new BadRequestException('UID must be identified before requesting viewing access.')
        };
    }
    findOne(gid: number): GivesModel {
        const give: GivesModel = this.gives.find(give => give.gid === gid);
        if (!give) {
            throw new NotFoundException('Give was not found.');
        }

        return give;
    }
    searchGives(key?: string, start_date?: Date, end_date?: Date): GivesModel[] {
        if (key) {
            return this.gives.filter(give => { 
                let giveDescription = give.description.toLowerCase();
                return giveDescription.includes(key.toLowerCase()) });
        }
        return this.gives;
    }

}