export interface ReportByZip {
    rid: number;
    name: string;
    c_by: string;
    v_by: number; 
    start_date: string;
    end_date: string;
    asks: number;
    gives: number;
    detail: {
        zip: string,
        asks: {
            total: number;
            active: number;
            inactive: number;
        },
        gives: {
            total: number;
            active: number;
            inactive: number;
        }
}[]
}
