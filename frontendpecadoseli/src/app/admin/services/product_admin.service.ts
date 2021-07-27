import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { HttpClient } from '@angular/common/http';

import { Product } from 'src/structures/product.structure';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceAdmin {

  constructor(
    private http : HttpClient,
    private authservice: AuthService,
    private storageService: StorageService,
    ) {}

  async create_product(product: Product, image: File){
    if(image) {
      product.url_image = await (await this.storageService.uploadCloudStorage(product.name + 'image_products', image)).ref.getDownloadURL();
      return this.http.post(environment.endpointExpress + 'product/create/', product, {headers : this.authservice.headers}).toPromise();
    }
  }
}
