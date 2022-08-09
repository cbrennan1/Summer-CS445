import { Injectable, NotFoundException } from '@nestjs/common';
import { AsksModel } from './asks.interface';
import { CreateAskDto } from '../dto/dto.asks';

@Injectable()
export class AsksService {
    private readonly asks: AsksModel[] = [];
    private counter = 0;

    create(createAskDto: CreateAskDto): AsksModel {
        let aid = this.counter;
        const newAsk: AsksModel = {
            ...createAskDto,
            aid
        };
        this.asks.push(newAsk);
        this.counter ++;
        return newAsk;
    }
    deactivate(uid: number, aid: number): AsksModel {
        if (uid != this.asks[aid].uid) {
            throw new NotFoundException('Ask AID not found, cannot DEACTIVATE');
        }
        this.asks[aid].is_active = false;
        return this.asks[aid];
    } 
    update() {

    }
    delete() {

    }
    getMyAsks() {

    }
    findAll(): AsksModel[] {
        return this.asks;
    }
    findOne(aid: number): AsksModel {
        const ask: AsksModel = this.asks.find(ask => ask.aid === aid);
        if (!ask) {
            throw new NotFoundException('Ask Not Found');
        }

        return ask;
    }
    searchAsks(key?: string, start_date?: Date, end_date?: Date): AsksModel[] {
        if (key) {
            return this.asks.filter(ask => { 
                let askDescription = ask.description.toLowerCase();
                return askDescription.includes(key.toLowerCase()) });
        }
        return this.asks;
    }
}