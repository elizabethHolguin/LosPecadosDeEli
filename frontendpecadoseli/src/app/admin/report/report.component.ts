import { Component, OnInit, NgModule, PipeTransform} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl, FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ApplicationStateService } from '../../services/application-state.service';
import { DataService } from '../data.service';
import { Product_sales } from 'src/structures/product.structure';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [DecimalPipe]
})

export class ReportComponent implements OnInit{
  countries$: Observable<Product_sales[]>;
  filter = new FormControl('');
  public form_date;

  public upward: boolean;
  public case_type: string;

  public PRODUCTS: Product_sales[];

  public page : number = 1;
  public pageSize : number = 4;
  public collectionSize : number;
  public products: Product_sales[];

  constructor(
    public applicationService: ApplicationStateService,
    public categoryService: CategoryService,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    private pipe: DecimalPipe
    ) {    	
    this.categoryService.getcategories();

    this.create_table({'startdate': '2010-01-01', 'enddate': `${(new Date().getFullYear())}-${(new Date().getMonth() + 1)}-${(new Date().getDate())}`})
    .then(() => this.createform());
  }

  search(text: string, pipe: PipeTransform): Product_sales[] {
    return this.PRODUCTS.filter(product => {
      const term = text.toLowerCase();
      return product.name.toLowerCase().includes(term)
          || pipe.transform(product.unitPrice).includes(term)
          || product.categoryname.toLowerCase().includes(term)
          || pipe.transform(product.sales).includes(term)
          || pipe.transform(product.sales * product.unitPrice).includes(term);
    });
  }

  ngOnInit() {
    this.form_date = this.formBuilder.group({
      startdate: null,
      enddate: null,
    });
  }

  async create_table(dates){
    this.applicationService.showLoadingScreen();

    this.PRODUCTS = await this.dataService.getData(dates);
    this.collectionSize = this.PRODUCTS.length;
    this.refreshCountries();
  }

  createform(){
    this.countries$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, this.pipe))
    );
    this.applicationService.noShowLoadingScreen();
  }

  sort(type_case: string){
    this.upward = (this.case_type == type_case)? !this.upward: true;
    this.case_type = type_case;
    
    this.PRODUCTS = this.PRODUCTS.sort((a, b) => {
      if(type_case == "neto") {
        if (a['sales']*a['unitPrice'] > b['sales']*b['unitPrice'])
          return this.upward? 1 : -1;
        if (a['sales']*a['unitPrice'] < b['sales']*b['unitPrice'])
          return this.upward? -1 : 1;
      } else {
        if (a[type_case] > b[type_case])
          return this.upward? 1 : -1;
        if (a[type_case] < b[type_case])
          return this.upward? -1 : 1;
      }
      return 0;   
    })

    this.createform();
  }

  refreshCountries() {
    this.products = this.PRODUCTS
      .map((product, i) => ({id: i + 1, ...product}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  
  onSubmit(form){
    if(form.startdate && form.enddate && form.startdate < form.enddate){
      this.create_table({'startdate': form.startdate, 'enddate': form.enddate})
      .then(() => this.createform());
    }
  }
}