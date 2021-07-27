import { Component, OnInit } from '@angular/core';
import { showUp } from '../../animations/showUp.animation';
import { ApplicationStateService } from 'src/app/services/application-state.service';

@Component({
  selector: 'app-wait-page',
  templateUrl: './wait-page.component.html',
  styleUrls: ['./wait-page.component.css'],
  animations: [
    showUp
  ]
})
export class WaitPageComponent implements OnInit {

  constructor(public application: ApplicationStateService) { }

  ngOnInit(): void {
  }

  close(){
    this.application.noShowLoadingScreen();
  }

}
