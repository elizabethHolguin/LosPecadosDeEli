import { Component, OnInit, PipeTransform } from '@angular/core';
import { OrderService } from '../services/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Order } from 'src/structures/order.structure';
import { CardOrdersComponent } from '../card-orders/card-orders.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass'],
  providers: [DecimalPipe]
})
export class OrdersComponent implements OnInit {
  orders$: Observable<Order[]>;
  filter = new FormControl('');

  constructor(
    private orders_services: OrderService,
    private pipe: DecimalPipe,
    private modalService: NgbModal
  ) {
    this.getOrdes();
  }

  ngOnInit(): void {}

  async getOrdes(){
    await this.orders_services.getOrdes();

    this.orders$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, this.pipe))
    );
  }

  search(text: string, pipe: PipeTransform): Order[] {
    return this.orders_services.list_orders.filter(country => {
      const term = text.toLowerCase();
      return country.orderID.toLowerCase().includes(term)
          || country.username.toLowerCase().includes(term)
          //|| pipe.transform(country.date).includes(term);
    });
  }

  viewOrder(order: Order){
    const modalRef = this.modalService.open(CardOrdersComponent);
    modalRef.componentInstance.order = order;
  }

}
