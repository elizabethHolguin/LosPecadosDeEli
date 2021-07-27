import { Injectable } from '@angular/core';
import { Product } from 'src/structures/product.structure';
import { ProductService } from './product.service';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Order } from 'src/structures/order.structure';
import { ApplicationStateService } from './application-state.service';
import { GeolocationService } from './geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public products : Map<Product, number> = new Map();

  constructor(
    private http : HttpClient,
    private authService : AuthService,
    private productService: ProductService,
    private application_service: ApplicationStateService,
    private geolocation_service: GeolocationService,
  ) {
    let list_products = localStorage.getItem('cartproductsprocadoseli');
    if(list_products)
      this.get_current_cart(list_products);
  }

  async get_current_cart(list_products: string){
    for(let current_product of list_products.split(',')){
      let data_current_product = current_product.split('/');
      let temp_product = await this.productService.getCurrent_product(data_current_product[0]);
      this.addProduct(temp_product, Number.parseInt(data_current_product[1]));
    }
  }

  addProduct(product: Product, quantity: number){
    for(var key of this.products.keys()){
      if(key.productID == product.productID)
        return this.products.set(key, quantity + this.products.get(key));
    }
    return this.products.set(product, quantity);
  }

  saveCartLocalStorage(){
    let listCart: string[] = [];
    
    for(var key of this.products.keys())
      listCart.push(key.productID + '/' + this.products.get(key));
    
    localStorage.setItem('cartproductsprocadoseli', JSON.parse(JSON.stringify(listCart)));
  }

  moreQuantity(key: Product){
    this.products.set(key, this.products.get(key) + 1)
    this.saveCartLocalStorage();
  }

  minusQuantity(key: Product){
    if(this.products.get(key) - 1){
      this.products.set(key, this.products.get(key) - 1)
      this.saveCartLocalStorage();
    }
  }

  delete_product(key: Product){
    this.products.delete(key);
  }

  async register_order(){
    let coord = await this.geolocation_service.getGeolocation();
    this.application_service.showLoadingScreen();
    await this.http.post<Order>(environment.endpointDjango+'order/create/', coord, {headers: this.authService.headers}).toPromise()
    .then(async order => await this.post_products(order.orderID))
    .catch((error) => {
      if(error.status == 502)
        this.application_service.changeMessage("Tiene una orden pendiente.");
      else
        this.application_service.changeMessage("Ocurrio un error intente mas tarde.");
    });
  }

  async post_products(orderID: string){
    await this.http.post(environment.endpointDjango+'order/details/create/', this.createlistProducts(orderID), {headers: this.authService.headers}).toPromise();
    localStorage.removeItem('cartproductsprocadoseli');
    this.products.clear();
    this.application_service.changeMessage("Orden realizada")
  }

  private createlistProducts(orderID: string){
    let list = [];

    for(var key of this.products.keys()){
      list.push({
          'orderID': orderID,
          'productID': key.productID,
          'unitPrice': key.unitPrice,
          'quantity': this.products.get(key),
          'discount': 0
        });
    }

    return list;
  }
}
