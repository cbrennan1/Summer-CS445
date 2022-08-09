import { Injectable, NotFoundException } from '@nestjs/common';
import { GivesModel } from './gives.interface';

@Injectable()
export class GivesService {
    private readonly gives: GivesModel[] = [];

    create(give: GivesModel) {
        this.gives.push(give);
    }
    deactivate() {

    }
    update() {

    }
    delete() {

    }
    viewMyGives() {

    }
    findAll(): GivesModel[] {
        return this.gives
    }
    findOne(gid: number): GivesModel {
        const give: GivesModel = this.gives.find(give => give.gid === gid);
        if (!give) {
            throw new NotFoundException('Give Not Found');
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
