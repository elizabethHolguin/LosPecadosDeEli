import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Order } from 'src/structures/order.structure';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public list_orders: Array<Order>;

  constructor(
    private http: HttpClient,
    public auth_service: AuthService,
  ) { }

  async getOrdes(){
    this.list_orders = await this.http.get<Order[]>(environment.endpointDjango + 'order/pending/', {headers : this.auth_service.headers}).toPromise();
  }

  async changeState(order: Order){
    this.http.patch<Order>(environment.endpointDjango + 'order/changepending/' + order.orderID, {status : true}, {headers : this.auth_service.headers}).toPromise();
  }
}
