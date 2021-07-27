import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  async getReport(days: number){
    return await this.http.get<[]>(`${environment.endpointDjango}order/date/${days}`, {headers: this.authService.headers}).toPromise();
  }

  async get_report_month(){
    return await this.http.get<[]>(`${environment.endpointDjango}order/month/`, {headers: this.authService.headers}).toPromise();
  }

  async get_report_week() {
    return await this.http.get<[]>(`${environment.endpointDjango}order/order_week/`, {headers: this.authService.headers}).toPromise();    
  }
}
