import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { ControlComponent } from './control/control.component';
import { ProcessComponent } from './process/process.component';
import { ReportComponent } from './report/report.component';
import { GraficoComponent } from './grafico/grafico.component';
import { HistorigramComponent } from './historigram/historigram.component';
import { PastelComponent } from './pastel/pastel.component';
import { OrdersComponent } from './orders/orders.component';
import { CardOrdersComponent } from './card-orders/card-orders.component';

@NgModule({
  declarations: [
    ControlComponent,
    ProcessComponent,
    ReportComponent,
    GraficoComponent,
    HistorigramComponent,
    PastelComponent,
    OrdersComponent,
    CardOrdersComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
