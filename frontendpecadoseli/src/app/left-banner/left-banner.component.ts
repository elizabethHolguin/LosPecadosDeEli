import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-banner',
  templateUrl: './left-banner.component.html',
  styleUrls: ['./left-banner.component.scss']
})
export class LeftBannerComponent implements OnInit {

  public seen: boolean;

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.seen = true;
  }

  toggleSeen(){
    this.seen = false;
  }

  toggleNoSeen(){
    this.seen = true;
  }

}
