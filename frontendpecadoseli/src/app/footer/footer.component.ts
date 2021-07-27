import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() links: [];

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  onActivate() {
    window.scroll(0,0);
  }
}
