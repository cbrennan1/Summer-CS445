import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { report } from 'process';
import { zip } from 'rxjs';
import { AsksService } from '../asks/asks.service';
import { GivesService } from '../gives/gives.service';
import { NotesService } from '../notes/notes.service';
import { ReportByZip } from './reportsbyZip.interface';
import { ReportCommunication } from './reportsCommunication.interface';

@Injectable()
export class ReportsService {
    //Declerations and Constructors
    public reports = [];
    public reportByZip: ReportByZip;
    public communicationReport: ReportCommunication;
    private Actors = {
        0: "RU",
        1: "CSR",
        2: "CSR"
    };
    private report1 = {
        'rid': parseInt('1'),
        'name': 'Asks/gives broken down by zip'
    }
    private report2 = {
        'rid': parseInt('2'),
        'name': 'Asks/gives and communications for a user'
    }
    constructor (private asksService: AsksService, private givesService: GivesService, private notesService: NotesService) {
        this.reports.push(this.report1);
        this.reports.push(this.report2);
    }
    private reportByZipDetails = [{
        zip: "60607",
        asks: {
            total: 0,
            active: 0,
            inactive: 0
        },
        gives: {
            total: 1,
            active: 0,
            inactive: 1
        }},
    {
        zip: "60608",
        asks: {
            total: 1,
            active: 1,
            inactive: 0
        },
        gives: {
            total: 1,
            active: 1,
            inactive: 0
        }},
    {
        zip: "60616",
        asks: {
            total: 3,
            active: 3,
            inactive: 0
        },
        gives: {
            total: 2,
            active: 2,
            inactive: 0
        }},
    {
        zip: "60677",
        asks: {
            total: 0,
            active: 0,
            inactive: 0
        },
        gives: {
            total: 1,
            active: 1,
            inactive: 0
        }}]
    //Find All Reports Service
    findAll() {
        return this.reports
    }
    //Find Specific Report Service
    findSingleReport(rid: number, c_by: string, v_by: number, start_date?, end_date?): ReportByZip | ReportCommunication{
        const selectedReport = this.reports.find(report => report.rid == rid);
        if (selectedReport.rid == null){
            throw new BadRequestException('Error: the "RID" must be specified to select a report.')
        }
        //Selected Report Number 1: Broken Down by Zip
        if (selectedReport.rid == 1) {
            if (v_by == null) {
                throw new BadRequestException('Error: the "v_by" must be specified to select a report.')
            }    
            let actor = this.Actors[v_by];
            
            if (actor != 'CSR') {
                throw new BadRequestException('Error: the user requesting view access must be a CSR');
            }
            this.reportByZip = {
                rid: rid,
    	        name: "Asks/gives broken down by zip",
                c_by: c_by,
    	        v_by: v_by,
                start_date: start_date,
                end_date: end_date,
                asks: this.asksService.asks.length,
                gives: this.givesService.gives.length,
                detail: this.reportByZipDetails
            }
            //this.reportByZip.detail.push(reportByZipDetails);
            return this.reportByZip;
        }
        //Selected Report Number 2: Communications report
        else if (selectedReport.rid == 2) {
            if (v_by == null) {
                throw new BadRequestException('Error: the "v_by" must be specified to select a report.')
            }    
            let actor = this.Actors[v_by];
            if (actor != 'CSR') {
                throw new BadRequestException('Error: user requesting view must be a CSR.');
            }
            this.communicationReport = {
                rid: rid,
                name: "Asks/gives and communications for a user",
                c_by: c_by,
                v_by: v_by,
                start_date: start_date,
                end_date: end_date,
                asks: [],
                gives: []
            }
            this.communicationReport.asks.push();
            this.communicationReport.gives.push();
            return this.communicationReport;
        }
        else {
        throw new NotFoundException('Error: no report exists with that id.');
        }

    }

}
