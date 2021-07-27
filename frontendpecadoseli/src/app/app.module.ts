import { BrowserModule, Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormLoginComponent } from './form-login/form-login.component';

import { LeftBannerComponent } from './left-banner/left-banner.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CardCommentComponent } from './card-comment/card-comment.component';
import { ClientModule } from './client/client.module';

@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    LeftBannerComponent,
    NavbarComponent,
    FooterComponent,
    CardCommentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ClientModule
  ],
  providers: [
    Title,
    CookieService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
