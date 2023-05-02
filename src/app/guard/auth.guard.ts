import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  // Constructor.

  /**
   * Inyecto el servicio de autenticación y el router.
   */
  constructor( private authService: AuthService, private router: Router ) {}


  // Métodos.

  /**
   * Método que se disparará cuando se intente acceder a una ruta.
   * Añade seguridad a las rutas, comprueba si el usuario está logueado para dejarle acceder o no.
   */
  canActivateChild( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Si el usuario está logueado, devolverá true.
    if ( this.authService.isLogged() ) return true;

    // Si el usuario no está logueado, devolverá false y redirigirá al login.
    this.router.navigate(["/auth"]).then(r => console.log("No estás logueado."));
    return false;

  }

}
