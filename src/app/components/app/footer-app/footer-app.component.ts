import { Component } from '@angular/core';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-footer-app',
  templateUrl: './footer-app.component.html',
  styleUrls: ['./footer-app.component.css']
})
export class FooterAppComponent {


  // Atributos

  ////// iconos

  aside: string = "../../../../../assets/icons/aside.svg";
  userAdmin: string = "../../../../../assets/icons/user-admin.svg";
  logOut: string = "../../../../../assets/icons/logout.svg";


  // Constructor

  constructor( private authService: AuthService ) {}


  // Métodos

  logOutSession(): void {
    this.authService.logOut();
  }


}
