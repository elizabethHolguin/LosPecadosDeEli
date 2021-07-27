import { Component, OnInit, Input } from '@angular/core';

import {Location} from '@angular/common';
import { Title } from '@angular/platform-browser';

import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/structures/product.structure';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() current_product: Product;

  public buyForm: FormGroup;
  public url_image: string;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    public activeModal: NgbActiveModal,
    private titleService: Title,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.buyForm = this.formBuilder.group({
      quantity: undefined,
    });
  }

  changeImage(new_urlImage: string){
    this.url_image = new_urlImage;
  }

  onSubmit(customerData) {
    if(customerData.quantity > 0){
      this.cartService.addProduct(this.current_product, customerData.quantity);
      this.cartService.saveCartLocalStorage();
      this.current_product.is_ordenate = true;
      this.activeModal.close();
      this.location.replaceState('/product');
      this.titleService.setTitle( "Pecadoseli | Productos");
    }
  }
}
