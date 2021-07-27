import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dowedo-page',
  templateUrl: './dowedo-page.component.html',
  styleUrls: ['./dowedo-page.component.scss']
})
export class DowedoPageComponent implements OnInit {

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle( "Pecadoseli | Nosotros" );
  }

}
