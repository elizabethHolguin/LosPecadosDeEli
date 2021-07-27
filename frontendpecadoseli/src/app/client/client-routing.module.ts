import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalPageComponent } from './principal-page/principal-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { DowedoPageComponent } from './dowedo-page/dowedo-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { NewComponent } from './new/new.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { CardComponent } from './card/card.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuardSession } from '../authsession.guard';

const routes: Routes = [
  {path: '', component:  PrincipalPageComponent},
  {path: 'dowedo', component:  DowedoPageComponent},
  {path: 'news', component:  NewsPageComponent},
  {path: 'news/:idnew', component: NewComponent},
  {path: 'contact', component:  ContactPageComponent},
  {path: 'product', component:  ProductSearchComponent},
  {path: 'product/:idproduct', component: ProductSearchComponent},
  {path: 'cart', component: CardComponent, canActivate: [AuthGuardSession]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardSession]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
