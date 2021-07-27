import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormLoginComponent } from './form-login/form-login.component';
import { LeftBannerComponent } from './left-banner/left-banner.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    FormLoginComponent,
    LeftBannerComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    FormLoginComponent,
    LeftBannerComponent,
    NavbarComponent,
    FooterComponent,
  ]
})
export class PrincipalModule { }
