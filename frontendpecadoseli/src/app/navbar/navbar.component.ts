import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormLoginComponent } from '../form-login/form-login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() links: [];
  
  public see_menu: boolean;
  public form_search;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public auth_service: AuthService,
    private modalService: NgbModal
  ) {
    this.form_search = this.formBuilder.group({
      product: ''
    });
  }

  ngOnInit(): void { }

  onSubmit(formSearch) {
    this.router.navigate(['product']);
    if(formSearch.product)
      this.router.navigate(['product'], { queryParams: { search: formSearch.product } });
  }

  togleNoMenu(){
    this.see_menu = false;
  }

  togleMenu(){
    this.see_menu = !this.see_menu;
  }

  open() {
    this.modalService.open(FormLoginComponent);
  }
}
