export interface ReportCommunication {
    rid: number;
    name: string;
    c_by: string;
    v_by: number; 
    start_date: string;
    end_date: string;
    asks: [] | [{}];
    gives: [] | [{}];
}