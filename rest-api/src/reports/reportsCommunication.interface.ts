import { AsksModel } from "../asks/asks.interface";
import { GivesModel } from "../gives/gives.interface";

export interface ReportCommunication {
    rid: number;
    name: string;
    c_by: string | number;
    v_by: number; 
    start_date: string;
    end_date: string;
    asks: [{
        ask: {
            uid: number;
            aid: number;
            type: string;
            description: string;
            start_date: string;
            end_date: string;
            extra_zip: any[];
            is_active: boolean;
            date_created: string|Date|null;
        },
        conversations: any[];
    }] | []
    gives: [{
        give: {    
            uid: number;
            gid: number;
            type: string;
            description: string;
            start_date: string;
            end_date: string;
            extra_zip: any[];
            is_active: boolean;
            date_created: string|Date|null;
        },
        conversations: any[];
    }] | []

}