import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/structures/order.structure';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-card-orders',
  templateUrl: './card-orders.component.html',
  styleUrls: ['./card-orders.component.sass']
})
export class CardOrdersComponent implements OnInit {
  @Input() order: Order;

  constructor(
    public activeModal: NgbActiveModal,
    public sanitization: DomSanitizer,
    private order_service: OrderService,
    ) { }

  ngOnInit(): void {
  }

  async entregar(){
    this.order.status = true;
    this.order_service.changeState(this.order).then(() => {
      this.activeModal.close();
      window.location.reload();
    });
  }

}
