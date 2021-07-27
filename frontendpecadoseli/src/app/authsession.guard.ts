import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardSession implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  
  async canActivate() {
    if(this.auth.user$ && !(await this.auth.getUser()).is_superuser)
      return true;
    this.router.navigate(['/']);
    return false;
  }
}
