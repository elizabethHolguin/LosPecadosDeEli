import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import * as introJs from 'intro.js/intro.js';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.component.html',
  styleUrls: ['./principal-page.component.scss']
})
export class PrincipalPageComponent implements OnInit {

  private introJS = introJs();

  constructor(
     public newsService: NewsService,
     private titleService: Title,
     ) {
      this.introJS.setOptions({
         showProgress: true,
         nextLabel: " Siguiente ",
         prevLabel: " Anterior ",
         skipLabel: " Saltar ",
         doneLabel: "Terminar"
      });
  }

   ngOnInit(): void {
      this.titleService.setTitle( "Pecadoseli" );
   }

  showVisitMobile(){
      this.introJS.setOptions({
      steps: [
      {
         element: '#nav',
         intro: '¡Puedes acceder a toda nuestra aplicación recorriendo el siguiente menú!',
         position: 'bottom'
      },
      {
         element: '#search-product',
         intro: "Busca todos los productos(pecados) que deseas comprar.",
         position: 'bottom'
      },
      {
         element: '#dowedo',
         intro: "Conoce más de cerca a nuestra empresa.",
         position: 'bottom'
      },
      {
        element: '#team',
        intro: "Te presentamos nuestro equipo de trabajo.",
        position: 'bottom'
     },
     {
      element: '#news',
      intro: "Entérate de las últimas noticias.",
      position: 'bottom'
      },
      {
        element: '#contact',
        intro: "Contáctanos, ayúdanos a mejorar, tu opinión es importante.",
        position: 'bottom'
      },
      {
         element: '#login-mobile',
         intro: 'Ingresa a tu cuenta y sé parte de nuestra familia "Los Pecados de Eli".',
         position: 'bottom'
      },
      {
         element: '#card-mobile',
         intro: 'Revisa tu carrito de compras.',
         position: 'bottom'
      },
      {
         element: '#current-news',
         intro: 'Mira las noticias más recientes, entérate de nuestras promociones, descuentos y mucho más.',
         position: 'bottom'
      }
    ]
    });

    this.introJS.start();
  }

  showVisit(){
    this.introJS.setOptions({
      steps: [
      {
         element: '#nav',
         intro: '¡Puedes acceder a toda nuestra aplicación recorriendo el siguiente menú!',
         position: 'bottom'
      },
      {
         element: '#search-product',
         intro: "Busca todos los productos(pecados) que deseas comprar.",
         position: 'bottom'
      },
      {
         element: '#dowedo',
         intro: "Conoce más de cerca a nuestra empresa.",
         position: 'bottom'
      },
      {
        element: '#team',
        intro: "Te presentamos nuestro equipo de trabajo.",
        position: 'bottom'
     },
     {
      element: '#news',
      intro: "Entérate de las últimas noticias.",
      position: 'bottom'
      },
      {
        element: '#contact',
        intro: "Contáctanos, ayúdanos a mejorar, tu opinión es importante.",
        position: 'bottom'
      },
      {
         element: '#login-desktop',
         intro: 'Ingresa a tu cuenta y sé parte de nuestra familia "Los Pecados de Eli".',
         position: 'bottom'
      },
      {
         element: '#card-desktop',
         intro: 'Revisa tu carrito de compras.',
         position: 'bottom'
      },
      {
         element: '#current-news',
         intro: 'Mira las noticias más recientes, entérate de nuestras promociones, descuentos y mucho más.',
         position: 'bottom'
      }
    ]
    });

    this.introJS.start();
  }

}
