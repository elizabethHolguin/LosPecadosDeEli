import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Title } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Product } from 'src/structures/product.structure';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'confirmation_letter',
  template: `
    <div class="direction-colunm">
      <h4>¿Confirmar compra? Una vez hecho usted no puede volver a ordenar hasta recibir su pedido.</h4>
      <button type="button" class="btn btn-warning" (click)="register_order()">Ordenar</button>
      <div class="btn-close" (click)="activeModal.close('Close click')"><i class="far fa-times-circle"></i></div>
    </div>
  `,
  styleUrls: ['./card.component.scss']
})
export class ConfirmationLetter {
  constructor(
    public activeModal: NgbActiveModal,
    public cartService: CartService,
    ) {}

    register_order(){
      this.cartService.register_order().then(() => {
        this.activeModal.close('Close click');
      })
    }
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  public last_product: Product;
  public last_quantity: number;

  active : boolean = false;

  constructor(
    private titleService: Title,
    public cartService: CartService,
    public geolocation_service: GeolocationService,
    public sanitization: DomSanitizer,
    private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle( "Pecadoseli | Carrito" );

    this.geolocation_service.permission$.then((status) => {  
      this.active = (status == 'granted')
      if(this.active)
        this.geolocation_service.requestGeolocation();
    });
  }

  delete_product(key: Product, quantity: number){
    this.last_product = key;
    this.last_quantity = quantity;
    this.cartService.delete_product(key);
    this.cartService.saveCartLocalStorage();
  }

  restablecer(){
    this.cartService.addProduct(this.last_product, this.last_quantity);
    this.last_product = undefined;
    this.last_quantity = undefined;
    this.cartService.saveCartLocalStorage();
  }

  total(): number{
    let total: number = 0;
    for(var key of this.cartService.products.keys()){
      total += key.unitPrice * this.cartService.products.get(key);
    };
    return total;
  }

  open() {
    if(this.cartService.products.size)
      this.modalService.open(ConfirmationLetter);
  }
}
