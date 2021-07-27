import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrincipalPageComponent } from './principal-page/principal-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { DowedoPageComponent } from './dowedo-page/dowedo-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { NewComponent } from './new/new.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { CardComponent } from './card/card.component';
import { ProfileComponent } from './profile/profile.component';
import { WaitPageComponent } from './wait-page/wait-page.component';
import { ProductComponent } from './product/product.component';

import { ClientRoutingModule } from './client-routing.module';

@NgModule({
  declarations: [
    PrincipalPageComponent,
    ContactPageComponent,
    DowedoPageComponent,
    NewsPageComponent,
    WaitPageComponent,
    NewComponent,
    ProductSearchComponent,
    ProductComponent,
    CardComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    WaitPageComponent
  ]
})
export class ClientModule { }
