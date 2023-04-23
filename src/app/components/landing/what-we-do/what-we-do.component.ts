import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.css']
})
export class WhatWeDoComponent {


  // Atributos

  imageSeguimientoActivo: string = "../../../../../assets/img/_0000_seguimiento_activo.jpg";
  imageGestionVehiculo: string = "../../../../../assets/img/_0001_gestion_vehiculo.jpg";
  imageSelected: boolean = true;


  // Constructor

  /**
   * Constructor de la clase. Inyectamos el servicio Renderer2 para poder manipular el DOM.
   */
  constructor( private render: Renderer2 ) { }


  // Métodos

  /**
   * Método que cambia de color la tarjeta uno y la imagen relacionada.
   */
  viewImageOne(): void {

    // Cambiamos el valor del booleano para cambiar de imagen.
    this.imageSelected = true;

    // Agregamos las clases para cambiar de color.
    const cardOne = document.querySelector("#cardOne");
    const titleOne = document.querySelector("#titleOne");
    this.render.addClass( cardOne, "border-primary" );
    this.render.addClass( titleOne, "text-primary" );

    // Eliminamos las clases de la otra tarjeta, porque podría haber sido clicada con anterioridad.
    const cardTwo = document.querySelector("#cardTwo");
    const titleTwo = document.querySelector("#titleTwo");
    this.render.removeClass( cardTwo, "border-primary" );
    this.render.removeClass( titleTwo, "text-primary" );

  }

  /**
   * Método que cambia de color la tarjeta dos y la imagen relacionada.
   */
  viewImageTwo(): void {

    // Cambiamos el valor del booleano para cambiar de imagen.
    this.imageSelected = false;

    // Agregamos las clases para cambiar de color.
    const cardTwo = document.querySelector("#cardTwo");
    const titleTwo = document.querySelector("#titleTwo");
    this.render.addClass( cardTwo, "border-primary" );
    this.render.addClass( titleTwo, "text-primary" );

    // Eliminamos las clases de la otra tarjeta, porque podría haber sido clicada con anterioridad.
    const cardOne = document.querySelector("#cardOne");
    const titleOne = document.querySelector("#titleOne");
    this.render.removeClass( cardOne, "border-primary" );
    this.render.removeClass( titleOne, "text-primary" );

  }

}
