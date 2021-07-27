import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlComponent } from './control/control.component';
import { OrdersComponent } from './orders/orders.component';
import { ProcessComponent } from './process/process.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path: '',   redirectTo: 'order', pathMatch: 'full'},
  {path: 'order', component: OrdersComponent},
  {path: 'overview', component: ControlComponent},
  {path: 'control', component: ProcessComponent},
  {path: 'report', component: ReportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
