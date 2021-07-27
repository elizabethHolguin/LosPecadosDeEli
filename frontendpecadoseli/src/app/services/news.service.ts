import { Injectable, NgZone } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Subject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { News } from 'src/structures/news.structure';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  //public newsSubject: Subject<any> = new Subject<any>();
  public news$ : Observable<any>;
  public current_news$ : Observable<any>;

  endpoint: string = '../assets/news.json';

  constructor(private zone : NgZone, private http : HttpClient) {
    //this.news$ = this.newsSubject.asObservable().pipe(map(this.structureData));
    this.news$ = this.http.get(this.endpoint);
  }

  /*
  structureData(data : any){
    let news_data = Array<News>();

    //data.list.forEach(newsObject => {
    data["news"].forEach(newsObject => {
      let current_news : News = {
        ...newsObject
      };
      news_data.push(current_news);
    });
    
    return Object.values(news_data);
  }
  */

  getNews(filter: string){
    this.news$ = this.http.get(filter);
  }

  getCurrent_news(currentId : string){
    this.current_news$ = this.http.get(`../assets/${currentId}.json`);
  }
}
