import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public newsService: NewsService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    let idArti = this.route.snapshot.paramMap.get('idnew');
    this.newsService.getCurrent_news(idArti);
    this.newsService.current_news$.subscribe( data => this.titleService.setTitle( data.title ));
  }

}
