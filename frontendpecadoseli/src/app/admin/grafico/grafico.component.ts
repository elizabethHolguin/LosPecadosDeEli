import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import { ProductService } from 'src/app/services/product.service';
import { ApplicationStateService } from 'src/app/services/application-state.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class GraficoComponent implements OnInit {
  @Input() public data: Array<any>;

  private max: number = 0;
  private keys: Array<string>;
  private values: Array<number>;

  constructor(
    private productsService: ProductService,
    private applicationservice: ApplicationStateService
  ){
    this.keys = [];
    this.values = [];
  }

  ngOnInit() {}

  ngOnChanges(){
    if(this.data)
      this.create_data();
  }

  create_data(){
    this.applicationservice.showLoadingScreen();
    this.keys = [];
    this.values = [];

    if(!this.data.length)
      this.createChart();
    else {
      this.data.forEach(async date => {
        let { name } = await this.productsService.get_product(date.product);
        this.keys.push(name);
        
        this.values.push(date.maxquantity);

        if(this.max < date.maxquantity)
          this.max = date.maxquantity;

        if(this.keys.length == this.data.length)
          this.createChart();
      });
    }      
  }

  private createChart(): void{
    let max : number = this.max;
    let keys = this.keys;
       
    d3.select("#grafico").selectAll("*").remove();
    
    d3.select("#grafico").selectAll("div").data(this.values)
	  .enter().append('div')
	  .style("width", function(d){
		  return (d * 97/max)  + "%";
	  })
    	.text(function(a, b){
		  return keys[b] +": "+ a;
    })

    this.applicationservice.noShowLoadingScreen();
  }
}
