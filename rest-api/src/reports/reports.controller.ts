import { Controller, Get, Param, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('bn/api/')
export class ReportsController {
    constructor(private reportsService: ReportsService){}

    @Get('reports')
    viewBasicReports() {
        return this.reportsService.findAll();
    }

    @Get('reports/:rid')
    viewSingleReport( @Param() param: {rid: string}, @Query() query?: { c_by?: string, v_by?: string, start_date?: Date, end_date?: Date}) {
        return this.reportsService.findSingleReport(parseInt(param.rid), query.c_by, parseInt(query.v_by), query.start_date, query.end_date);
    }
}
