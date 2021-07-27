import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { ApplicationStateService } from './application-state.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  public commentaries$: Observable<any>;

  constructor(
    private http : HttpClient,
    private authService: AuthService,
    private appService: ApplicationStateService
  ) { }

  sendemail(email: string, city: string, date_birth: string, content: string) : void {
    let message = {
      email: email,
      ciudad: city,
      fecha: date_birth,
      content: content
    }

    this.appService.showLoadingScreen();
    this.http.post(environment.endpointDjango+'sendinfo/', message).subscribe(data => {
      if(data)
        this.appService.changeMessage('Se envio su mensaje correctamente');
      else {
        this.appService.changeMessage('Hubo un error');
        this.appService.catchError(400);  
      }
        
    });
  }

  sendcomment(email: string, city: string, date_birth: string, content: string) : void {
    let comment = {
      userID: (this.authService.client$)? this.authService.client$.userID : 17,
      creation_date: `${(new Date().getFullYear())}-${(new Date().getMonth() + 1)}-${(new Date().getDate())}`,
      email: email,
      city: city,
      date_birth: date_birth,
      content: content
    }

    this.appService.showLoadingScreen();
    this.http.post(environment.endpointExpress+'commentary/create/', comment).subscribe(data => {
      if(data)
        this.appService.changeMessage('Se envio su mensaje correctamente');
      else {
        this.appService.changeMessage('Hubo un error');
        this.appService.catchError(400);  
      }
        
    });
  }

  getComments(){
    this.commentaries$ = this.http.get(environment.endpointDjango+'commentary/', {headers: this.authService.headers});
  }

  get_currentComment(commentaryID: string){
    return this.http.get(`${environment.endpointExpress}commentary/${commentaryID}/`);
  }
}
