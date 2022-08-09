import { Injectable, NotFoundException } from '@nestjs/common';
import { ThanksModel } from './thanks.interface';


@Injectable()
export class ThanksService {
    private readonly thanks: ThanksModel[] = [];
    createThank(thank: ThanksModel) {
        this.thanks.push(thank);
    }
    update() {

    }
    getMyThanks() {

    }
    findAll(): ThanksModel[] {
        return this.thanks
    }
    findOne(tid: number): ThanksModel {
        const thank: ThanksModel = this.thanks.find(thank => thank.tid === tid);
        if (!thank) {
            throw new NotFoundException('Thank Not Found');
        }

        return thank;
    }
    // INCOMPLETE TEMPLATE - MUST FIX
    findAllForUser(id: number): ThanksModel {
        const thank: ThanksModel = this.thanks.find(thank => thank.tid === id);
        if (!thank) {
            throw new NotFoundException('Thanks Not Found');
        }

        return thank;
    }
    searchThanks(key?: string, start_date?: Date, end_date?: Date): ThanksModel[] {
        if (key) {
            return this.thanks.filter(thank => { 
                let thankDescription = thank.description.toLowerCase();
                return thankDescription.includes(key.toLowerCase()) });
        }
        return this.thanks;
    }
}
