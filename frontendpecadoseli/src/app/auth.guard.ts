import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.auth.user$){
      const{ is_superuser } = await this.auth.getUser();
      return is_superuser;
    }
    this.router.navigate(['/']);
    return false;
  }
}
