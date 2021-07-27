import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Product_sales } from 'src/structures/product.structure';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http : HttpClient,
    private authService: AuthService
  ) { }

  async getData(dates){
    return await this.http.post<Product_sales[]>(
      `${environment.endpointExpress}product/sales/`,
      dates,
      {headers: this.authService.headers})
    .toPromise();
  }
}
