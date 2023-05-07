import { Component } from '@angular/core';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-footer-app',
  templateUrl: './footer-app.component.html',
  styleUrls: ['./footer-app.component.css']
})
export class FooterAppComponent {


  // Atributos

  user: any;

  ////// iconos

  aside: string = "../../../../../assets/icons/aside.svg";
  userAdmin: string = "../../../../../assets/icons/user-admin.svg";
  logOut: string = "../../../../../assets/icons/logout.svg";


  // Constructor

  constructor( private authService: AuthService ) {
    this.getUserName()
  }


  // Métodos

  getUserName(): void {

    // Obtengo el usuario del método getUser() del servicio authService.
    const user = this.authService.getUser();

    // Lo guardo en el atributo user.
    this.user = user;

  }

  logOutSession(): void {
    this.authService.logOut();
  }


}
