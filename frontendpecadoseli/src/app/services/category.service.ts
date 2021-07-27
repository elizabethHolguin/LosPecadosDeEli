import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public categories$: Observable<any>;

  constructor(
    private http : HttpClient,
    private authservice: AuthService
  ) { }

  getcategories(){
    this.categories$ = this.http.get(environment.endpointDjango+'categories/');
  }

  create_category(category){
    return this.http.post(environment.endpointExpress + 'category/create/', category, {headers : this.authservice.headers});
  }
}
