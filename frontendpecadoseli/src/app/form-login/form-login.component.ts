import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ApplicationStateService } from '../services/application-state.service';
import { AuthService } from '../services/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {
  public loginForm;
  public registerForm;
  
  public blockButton: boolean;
  public seen_register: boolean;

  constructor(
    public appService: ApplicationStateService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public auth_service: AuthService,
    ) {
    this.registerForm = this.formBuilder.group({
      email: '',
      username: '',
      password: '',
      repeatpassword: ''
    });

    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {}

  onSubmitLogin(creadentials_login) {
    this.blockButton = true;

    if(!creadentials_login.email || !creadentials_login.password)
      this.appService.catchError(400);
    else
    this.auth_service.signIn({'username': creadentials_login.email, 'password': creadentials_login.password});
  }

  onSubmitRegister(creadentials_register) {
    this.blockButton = true;
    
    if(!creadentials_register.email || !creadentials_register.username || !creadentials_register.password || !creadentials_register.repeatpassword)
      this.appService.catchError(4);
    else if (!creadentials_register.email.includes('@'))
      this.appService.catchError(3);
    else if(creadentials_register.password.length < 8)
      this.appService.catchError(1);
    else if(creadentials_register.password!=creadentials_register.repeatpassword)
      this.appService.catchError(2);
    else {
      this.appService.clearError();
      this.auth_service.createUser({
        'email': creadentials_register.email,
        'username': creadentials_register.username,
        'password': creadentials_register.password
      });
    }
  }

  noSeenMessage(){
    if(this.appService.error$)
      this.blockButton = false;
  }

  toggle(){
    this.seen_register = !this.seen_register
  }
}
