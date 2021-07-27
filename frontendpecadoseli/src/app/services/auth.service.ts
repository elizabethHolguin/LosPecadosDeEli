import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable} from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from 'src/structures/user.structure';
import { UserClient } from 'src/structures/user.structure'
import { ApplicationStateService } from './application-state.service';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User>;
  public client$: UserClient

  public headers: HttpHeaders;

  constructor(private http : HttpClient, private appService: ApplicationStateService, private cookieService: CookieService) {  
    let token = this.cookieService.get('LOGIN_INFO');

    if(token) {
      this.headers = new HttpHeaders({'Authorization': `Token ${token}`});
      this.user$ = this.http.get<User>(`${environment.endpointDjango}user/`, {headers: this.headers});

      this.user$.toPromise().then(data => {
        if(!data.is_superuser){
          this.http.get<UserClient>(`${environment.endpointDjango}client/`, {headers: this.headers})
          .toPromise().then(client => this.client$ = client)
          .catch(err => this.createClient(data.id, 'Sin especificar', 'Sin especificar'));
        }
      }).catch(() => this.signOut());
    }
  }

  getUser() {
    return this.user$.pipe(first()).toPromise();
  }

  async signIn(creadentials_login) {
    this.appService.clearError();
      
    await this.http.post(environment.endpointDjango+'api_generate_token/', creadentials_login).toPromise()
    .then(token => {
      const dateNow = new Date();
      dateNow.setHours(dateNow.getHours() + 12);
      this.cookieService.set('LOGIN_INFO', JSON.parse(JSON.stringify(token)).token, dateNow);
      window.location.reload();
    }).catch((error) => this.appService.catchError(error.status));
  }

  async signOut() {
    this.cookieService.delete('LOGIN_INFO');
    window.location.reload();
  }

  async createUser(creadentials_register) {
    await this.http.post(environment.endpointDjango+'user_create/', creadentials_register).toPromise()
      .then(data => {
        this.signIn({'username': creadentials_register.username, 'password': creadentials_register.password});
      })
      .catch(error => this.appService.catchError(error.status));      
  }

  async createClient(userID : string, direction : string, city: string) {
    this.http.post<UserClient>(environment.endpointDjango+'client_create/',
      {'userID': userID, 'direction': direction, 'city': city},
      { headers: this.headers }).subscribe(data => this.client$ = data);
  }

  async updateaccount(credentials_user, creadentials_client){
    this.http.put(
      environment.endpointDjango + 'user/',
      credentials_user,
      { headers: this.headers }      
    ).toPromise().then(data => {
        this.http.put(
          environment.endpointDjango + 'client/',
          creadentials_client,
          { headers: this.headers }      
        ).toPromise().then(() => window.location.reload())
        .catch(() => this.appService.catchError(400));
    });
  }

  async delete_account(){
    this.http.delete(environment.endpointDjango + 'user/', { headers: this.headers }   
    ).subscribe(() => this.signOut())
  }
}
