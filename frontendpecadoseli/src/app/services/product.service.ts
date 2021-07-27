import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Observable} from 'rxjs';
import { AuthService } from './auth.service';
import { Product } from 'src/structures/product.structure';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public products$ : Observable<any>;
  public current_category$ : Observable<any>;

  constructor(
    private http : HttpClient
    ) {}

  getProducts(filter: string){
    if(filter)
      this.products$ = this.http.get(`${environment.endpointExpress}product/filter/${filter}`);
    else 
      this.products$ = this.http.get(environment.endpointExpress + 'product/');
  }

  async getCurrent_product(current_id : string){
    return await this.http.get<Product>(`${environment.endpointExpress}product/${current_id}/`).toPromise();
  }

  get_product(currentId : string) {
    return this.http.get<Product>(`${environment.endpointExpress}product/${currentId}/`).pipe(first()).toPromise();
  }
}
