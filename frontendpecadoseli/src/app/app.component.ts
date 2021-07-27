import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  links = [
    { title: 'CATALOGO', fragment: 'product' },
    //{ title: 'NOTICIAS', fragment: 'news' },
    { title: 'NOSOTROS', fragment: 'dowedo' },
    { title: 'CONTACTANOS', fragment: 'contact' }
  ];

  title = 'pecadoseli';

  constructor(){
  }
}
