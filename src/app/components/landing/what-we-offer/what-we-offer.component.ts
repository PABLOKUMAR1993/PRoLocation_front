import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-what-we-offer',
  templateUrl: './what-we-offer.component.html',
  styleUrls: ['./what-we-offer.component.css']
})
export class WhatWeOfferComponent {


  // Atributos

  image1: string = "../../../../../assets/img/simbolo-ubicacion-fondo-paisaje.jpg";
  image2: string = "../../../../../assets/img/vista-lateral-manos-sosteniendo-mapa.jpg";
  image3: string = "../../../../../assets/img/marcin-jozwiak-oh0DITWoHi4-unsplash.jpg";
  image4: string = "../../../../../assets/img/mediados-seccion-femenina-mecanico-que-usa-computadora-portatil.jpg";
  imageActive: string = this.image1;


  // Constructor

  /**
   * Constructor de la clase. Inyecta el servicio Renderer2 para poder manipular el DOM.
   */
  constructor( private render: Renderer2 ) { }


  // Métodos

  /**
   * Método que resetea las clases, para que ningún elemento tenga color de fondo azul "active".
   * Al terminar llama a la función viewImage y le pasa el número recibido.
   * @param number Numero que identifica que elemento es el clicado y es el que va a conservar el color azul.
   */
  deleteClassActive( number: number ) :void {

    let buttons: HTMLElement[] = Array.from(document.querySelectorAll("button"));
    for ( let i = 0; i < buttons.length; i++ ) {
      this.render.removeClass(buttons[i], "active");
    }
    this.viewImage( number );

  }

  /**
   * Método que recibe un número y mediante ese número, identifica que elemento es el que tiene que tener
   * un fondo azul, para que visualmente se vea que está seleccionado.
   * @param number Numero que identifica que elemento es el clicado y es el que va a conservar el color azul.
   */
  viewImage( number: number ): void {

    let button;
    switch (number) {
      case 1:
        this.imageActive = this.image1;
        button = document.querySelector("#button1");
        this.render.addClass( button, "active" );
        break;
      case 2:
        this.imageActive = this.image2;
        button = document.querySelector("#button2");
        this.render.addClass( button, "active" );
        break;
      case 3:
        this.imageActive = this.image3;
        button = document.querySelector("#button3");
        this.render.addClass( button, "active" );
        break;
      case 4:
        this.imageActive = this.image4;
        button = document.querySelector("#button4");
        this.render.addClass( button, "active" );
        break;
      default:
        this.imageActive = this.image1;
    }

  }


}
