import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-historigram',
  templateUrl: './historigram.component.html',
  styleUrls: ['./historigram.component.css']
})
export class HistorigramComponent implements OnInit {
  @Input() private data: Array<any>;
  
  private max: number = 0;
  private keys: Array<string>;
  private values: Array<number>;
  private keys2: Array<string>;
  private values2: Array<number>;
  private data2: Array<any>;
  private dataux: string;

  ngOnInit() { }
  
  ngOnChanges(){
    if(this.data)
      this.parse_data();
  }

  parse_data(){
    d3.select("#svg").selectAll("*").remove();

      //instanciar variables
      this.keys = [];
      this.values = [];
      this.keys2 = [];
      this.values2 = [];
      this.data2 = [];
      this.dataux ="[";
      
      let nd = new Date();
      let fd = "";
      //crear primera fecha del chart
      if(nd.getDate()>=30){
	      if(nd.getMonth()>=9){
  		    fd = nd.getFullYear() + "-" + (nd.getMonth() + 1) + "-" + (nd.getDate()-29);
        }else{
          fd = nd.getFullYear() + "-0" + (nd.getMonth() + 1) + "-" + (nd.getDate()-29);
        }
      }else{
        	let d = new Date(nd.getFullYear(), nd.getMonth(), 0);        	
      	  let day = nd.getDate()-29 + d.getDate();		
        if(nd.getMonth()>=9){
  		    fd = nd.getFullYear() + "-" + (nd.getMonth()) + "-" + day;
        }else{
    	    fd = nd.getFullYear() + "-0" + (nd.getMonth()) + "-" + day;
        }    
      }
      //completar un array de fechas hasta el dia actual
      for(var i = 0; i < 30; i++){
        this.keys.push(fd);
        let dd = new Date(nd.getFullYear(), nd.getMonth(), 0); 
        let nday = parseInt(fd.split("-")[2])+1;
        let newday = ""+nday;
        if(nday<10){newday = "0"+newday;}
        if(fd.split("-")[2]!=dd.getDate()+""){
    	  	fd = fd.split("-")[0] + "-" + fd.split("-")[1] + "-" + newday;	
        }else{
    	  if(nd.getMonth()>=9){
  		    fd = nd.getFullYear() + "-" + (nd.getMonth()+1) + "-0" + 1;
          }else{
    	    fd = nd.getFullYear() + "-0" + (nd.getMonth()+1) + "-0" + 1;
        }
        }
      }
      //comparar y crear un array de ventas de cada dia, si no hubieron ventas 0 por defecto
      var count=0;
      const num=0;
      for(let val of this.data){         
        var flag=true;       
        while(flag){
            if(this.keys[count++]==val.date){ 
              this.values.push(val.quantity);
              flag=false;
            }else{
              this.values.push(num);
            }            
        }
      }
	  let faltante = 30 - count;
	  for(let i =0; i<faltante; i++){
      	this.values.push(num);
      }
      this.max = Math.max.apply(null,this.values);
      
      for(let i = 0; i<30;i++){        
        var k = this.keys[i];
        var kd = k.split("-")[2];
        var v = this.values[i];        
        var dato = '{"date":"'+kd+'","quantity":'+v+'}';        
        var m = "";
        var aux="";                 
          if(i<29){            
            m=dato;
            this.dataux= this.dataux+m+",";
          }if(i==29){
            this.dataux= this.dataux+dato+"]";
            m = JSON.parse(this.dataux);
            this.data2.push(m); 
            this.dataux = "["
          }this.keys2.push(kd);
          this.values2.push(v);  
      }
      this.createChart("#svg",this.data2);
  }
  createChart(valor:string, dt:Array<any>){      
    var svg = d3.select(valor);
    var padding = {top:20,right:30,bottom:30,left:50};

    var charArea = {
      "width": parseInt(svg.style("width"))-padding.left-padding.right,
      "height" : parseInt(svg.style("height")) -padding.top-padding.bottom
    };

    var yscale = d3.scaleLinear().domain([0,this.max])
    .range([charArea.height,0]).nice(); 

    var xscale = d3.scaleBand().domain(this.keys2).range([0,charArea.width]).padding(.2);

    var xAxis = svg.append("g").
    classed("xAxis",true).
    attr(
      'transform', 'translate('+padding.left+','+(charArea.height + padding.top)+')'
    )
    .call(d3.axisBottom(xscale));
    
    var yAxisEn = d3.axisLeft(yscale);
    
    var yAxis = svg.append("g").
    classed("yAxis",true).
    attr(
      'transform', 'translate('+padding.left+","+padding.top+')'
    );
    yAxisEn(yAxis);
    
    var llave = this.keys2;
    var valores = this.values2;

    var rectGrp = svg.append("g").
    attr('transform', 'translate('+padding.left+","+padding.top+')'
    );

    rectGrp.selectAll("rect").data(dt[0]).enter()
      .append("rect")
      .attr("width",xscale.bandwidth())
      .attr("height",function(d,i){return charArea.height - yscale(valores[i]);
      })
      .attr("x",function(d,i){
        return xscale(llave[i]);
      })
      .attr("y",function(d,i){
        return yscale(valores[i]);
      })
      .attr("fill","#ab0a0d")    
      .attr("stroke","#5e0607")
  }
}
