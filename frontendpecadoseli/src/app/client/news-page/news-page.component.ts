import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {
  public searchForm;

  constructor(
    public newsService: NewsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private titleService: Title,
    ) {
      
    }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      text: null
    });

    this.titleService.setTitle( "Pecadoseli | Noticias" );

    this.activatedRoute.queryParams.subscribe(params => {
      let search = params['search'];
      if(search){
        this.titleService.setTitle( "Pecadoseli | " + search );
        this.newsService.getNews("../assets/newsfilter.json");
      }
    });
  }

  ngOnDestroy(): void {
    this.newsService.getNews('../assets/news.json');
  }

  onSubmit(form){
    if(form.text && form.text != ''){
      this.router.navigate(['news'], { queryParams: { search: form.text } });
      this.newsService.getNews("../assets/newsfilter.json");
    } else {
      this.router.navigate(['news']);
      this.newsService.getNews("../assets/news.json");
    }
  }
}
