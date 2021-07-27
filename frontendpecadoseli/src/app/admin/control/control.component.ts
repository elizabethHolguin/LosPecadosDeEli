import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  active = 1;
  
  public chartDataDia : Array<any>;
  public data: Array<any>;
  public data_week: Array<any>;

  constructor(private reportService: ReportService){}

  ngOnInit(): void {
    this.getReport_fordate(1);
    this.get_report_month();
    this.get_report_week();
  }

  async getReport_fordate(days: number){
    this.chartDataDia = await this.reportService.getReport(days);
  }

  async get_report_month(){
    this.data = await this.reportService.get_report_month();
  }

  async get_report_week(){
    this.data_week = await this.reportService.get_report_week();
  }
}
