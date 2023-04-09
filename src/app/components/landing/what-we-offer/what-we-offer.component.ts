import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-what-we-offer',
  templateUrl: './what-we-offer.component.html',
  styleUrls: ['./what-we-offer.component.css']
})
export class WhatWeOfferComponent {


  // Attributes

  imageBlack: string = "../../../../../assets/img/black.jpg";
  imageBlue: string = "../../../../../assets/img/blue.jpg";
  imageActive: string = "../../../../../assets/img/black.jpg";


  // Constructor

  constructor( private render: Renderer2 ) { }


  // Methods


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
        this.imageActive = this.imageBlack;
        button = document.querySelector("#button1");
        this.render.addClass( button, "active" );
        break;
      case 2:
        this.imageActive = this.imageBlue;
        button = document.querySelector("#button2");
        this.render.addClass( button, "active" );
        break;
      case 3:
        this.imageActive = this.imageBlack;
        button = document.querySelector("#button3");
        this.render.addClass( button, "active" );
        break;
      case 4:
        this.imageActive = this.imageBlue;
        button = document.querySelector("#button4");
        this.render.addClass( button, "active" );
        break;
      default:
        this.imageActive = this.imageBlack;
    }

  }


}
