import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute } from '@angular/router';

import {Location} from '@angular/common';

import { Title } from '@angular/platform-browser';
import { Product } from 'src/structures/product.structure';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  public current_product: Product;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    public products_service : ProductService,
    private applicationService : ApplicationStateService,
    private titleService: Title,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let search = params['search'];
      
      if(search){
        this.titleService.setTitle( "Pecadoseli | " + search );
        this.products_service.getProducts(search);
      } else {
        this.titleService.setTitle( "Pecadoseli | Productos" );
        this.products_service.getProducts(undefined); 
      }
    });

    let idproduct = this.activatedRoute.snapshot.paramMap.get('idproduct');
    if(idproduct)
      this.search_product(idproduct);
  }

  async search_product(idproduct: string) {
    this.applicationService.showLoadingScreen();
    this.current_product = await this.products_service.getCurrent_product(idproduct);

    if(this.current_product){
      this.location.replaceState(`/product/${idproduct}`);
      this.titleService.setTitle( "Pecadoseli | " + this.current_product.name );
      this.open();
    }

    this.applicationService.noShowLoadingScreen();
  }

  open() {
    const modalRef = this.modalService.open(ProductComponent);
    modalRef.componentInstance.current_product = this.current_product;
  }
}
