import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserEntity} from "../entity/UserEntity";
import {BehaviorSubject, Observable, tap, throwError} from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // Atributos

  private readonly endpoint = 'http://localhost:3000/api/auth/signin'; // TODO cambiar por variable de entorno.


  // Constructor

  /**
   * Inyecto el servicio de http y el router.
   */
  constructor( private http: HttpClient, private router: Router ) {}


  // Métodos

  /**
   * Método que envía los datos del usuario al back para iniciar sesión.
   */
  singIn( user: UserEntity ): Observable<any> {

    // Creo las cabeceras para enviar el contenido en formato json.
    const headers = new HttpHeaders();
    headers.set( "Content-Type", "application/json" );

    // Envío la petición al servidor y devuelvo la respuesta.
    return this.http.post( this.endpoint, user, { headers: headers } );

  }

  /**
   * Método que comprueba si el token existe en el localStorage.
   */
  isLogged(): boolean {
    // Si existe el token, devolverá true.
    return !!localStorage.getItem("token");
  }

  /**
   * Método que devuelve el token del localStorage.
   */
  getToken(): string | null {
    console.log( "getToken: " + localStorage.getItem("token") );
    // Si existe el token, devolverá el token.
    return localStorage.getItem("token");
  }


  /**
   * Método que cierra la sesión del usuario.
   */
  logOut(): void {
    localStorage.removeItem("token");
    this.router.navigate(["/auth"]).then(r => console.log("Sesión cerrada."));
  }


  /**
   * Método que controla las posibles excepciones de los métodos.
   * @param error Error generado durante la comunicación.
   */
  private error(error: any): Observable<any> {
    console.error( "error en comunicación: " + error );
    return throwError(error);
  }

}
