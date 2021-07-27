import { Component, OnInit, ViewEncapsulation, Input, OnChanges} from "@angular/core"
import * as d3 from "d3";

@Component({
  selector: 'app-pastel',
  templateUrl: './pastel.component.html',
  styleUrls: ['./pastel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PastelComponent implements OnInit {
  @Input() private data: Array<any>;
  private max: number = 0;
  private keys: Array<string>;
  private values: Array<number>;
  private keys2: Array<string>;
  private values2: Array<number>;
  private data2: Array<any>;
  private dataux: string;
  
  ngOnInit() {
    if(this.data)
      this.parse_data();    
  }

  ngOnChanges(){
    if(this.data)
      this.parse_data();
  }
  
  parse_data(){  
    d3.select("#pastel").selectAll("*").remove();

      //instanciar variables
      this.values = [];
      this.values2 = [];
      this.keys=[];
      this.keys2 = [];
      this.data2 = [];
      this.dataux ="[";
   
      //Sacar los días de la semana, independientemente de si hubo venta o no
      for(let i of this.data){
        let fecha = new Date("'"+i.date+"'");
        if(fecha.getDay()==1){
          this.keys2.push("Lunes");
        }if(fecha.getDay()==2){
          this.keys2.push("Martes");
        }if(fecha.getDay()==3){
          this.keys2.push("Miercoles");
        }if(fecha.getDay()==4){
          this.keys2.push("Jueves");
        }if(fecha.getDay()==5){
          this.keys2.push("Viernes");
        }if(fecha.getDay()==6){
          this.keys2.push("Sabado");
        }if(fecha.getDay()==0){
          this.keys2.push("Domingo");
        }        
      }

      for(let val of this.data){ 
        this.values.push(val.num_orders);        
      }
     
      for(let i = 0; i<this.data.length;i++){        
        var k = this.keys2[i];
        var v = this.values[i];        
        var dato = '{"'+k+'":'+v+'}';        
        var m = "";
        var aux="";                 
          if(i<this.data.length-1){            
            m=dato;            
            this.dataux= this.dataux+m+",";
          }if(i==this.data.length-1){
            this.dataux= this.dataux+dato+"]";
            m = JSON.parse(this.dataux);
            this.data2.push(m); 
          }  
      }

      var total = 0;
      for(let i of this.values){
        total = total + i;
      }
      
      for(let i of this.values){
        var fl = Math.round(i*100/total);
        this.values2.push(fl);
      }
      this.createChart("#pastel",this.data2[0]);
  }

  createChart(valor:string, dt:Array<any>){  
    //Setear dimensiones y margenes del gráfico
    var width = 400, height = 400, margin = 1;
   
    //Radio
    var radius = Math.min(width, height) / 2 - margin;
    var svg = d3.select(valor).
    append("svg").attr("width",width).
    attr("height", height).append("g").
    attr("transform","translate(" +width / 2 + "," + height / 2 + ")");

    var datofinal=this.data2[0];
   
    var llave = this.keys2;
    var valores = this.values2;
    
    //Setear colores
    var color = d3.scaleOrdinal().domain(datofinal).range(d3.schemeSet3);

    //Calcular la posición en cada grupo del pastel
    var pie = d3.pie().
    value(function(d, i){return valores[i];});
    var data_r =  d3.pie()(valores);
    

    //Construcción de arcos
    var arcGenerator = d3.arc().innerRadius(0).
    outerRadius(radius);

    //Constrcción del gráfico circular, cada parte del pastel es una ruta que se crea con la función arc
    svg.selectAll('mySlices').data(data_r).enter().
    append('path').attr('d',<any>arcGenerator).
    attr('fill',<any>function(d,i){ return (color(llave[i]))}).
    attr("stroke", "black").
    style("stroke-width", "2px").style("opacity", 0.7);

    //Emplear método centroide para obtener coordenadas, agregar anotaciones
    svg.selectAll('mySlices').data(data_r).enter().
    append('text').
    text(function(d,i){ return llave[i]+" : "+valores[i]+"%"}).
    attr("transform", function(d) { return "translate(" + arcGenerator.centroid(<any>d) + ")";}).
    style("font-family","Roboto").
    style("text-anchor", "middle" ).
    style("font-size", '1em');
  }
  
}

