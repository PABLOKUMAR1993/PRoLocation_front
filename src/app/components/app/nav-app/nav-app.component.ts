import {Component, Renderer2} from '@angular/core';

@Component({
  selector: 'app-nav-app',
  templateUrl: './nav-app.component.html',
  styleUrls: ['./nav-app.component.css']
})
export class NavAppComponent {


  // Atributos

  ////// images
  imageLogo: string = "../../../../../assets/logo/logo.svg";

  ////// icons

  location: string = "../../../../../assets/icons/light/map_marker_light.svg";
  flag: string = "../../../../../assets/icons/light/flag_light.svg";
  listCheck: string = "../../../../../assets/icons/light/list_check_light.svg";
  person: string = "../../../../../assets/icons/light/person_light.svg";
  truck: string = "../../../../../assets/icons/light/truck_light.svg";


  // Constructor

  /**
   * Inyectamos mediante el constructor la clase Renderer2 para poder manipular el DOM.
   */
  constructor( private render: Renderer2 ) { }


  // Métodos

  /**
   * Método que recibe un número, el cual indica que enlace del menú ha sido pinchado,
   * para cambiarle los estilos y que se vea cómo clicado.
   * @param num Número que indica que menú ha sido clicado.
   */
  clickMenu( num: number ) {

    // Borro los estilos de todos los menudos de navegación.
    this.deleteStyle( num );

    //almaceno el id "clickMenu#" según el número que me llega
    const li = document.querySelector( `#clickMenu${num}` );

    // le añado una clase llamada "active" para cambiar los estilos.
    this.render.addClass( li, 'active' );

  }

  /**
   * Método que recibe un número, el cual indica que enlace del menú ha sido pinchado.
   * Este método elimina los estilos "active" de todos los "li" del menú, menos el clicado.
   * @param num Número que indica que menú ha sido clicado.
   */
  deleteStyle( num: number ) {

    for (let i = 1; i <= 5; i++) {
      if ( i !== num ) {

        //almaceno el id "clickMenu#" según el número que me llega
        const li = document.querySelector( `#clickMenu${i}` );

        // le añado una clase llamada "active" para cambiar los estilos.
        this.render.removeClass( li, 'active' );

      }
    }

  }

}
