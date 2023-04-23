import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import {UserEntity} from "../entity/UserEntity";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  // Atributos

  private readonly endPoint: string = "http://localhost:3000/api/user"; // TODO cambiar por variable de entorno.


  // Constructor

  /**
   * Constructor de la clase. Se inyecta el servicio HttpClient para poder hacer peticiones http.
   */
  constructor( private http: HttpClient ) { }


  // Métodos


  /**
   * Método que se llama cuando el usuario pulsa en el botón de login.
   * @param user Objeto usuario con los datos del formulario de login.
   */
  public login( user: UserEntity ): Observable<any> {

    const headers = new HttpHeaders();
    headers.set( "Content-Type", "application/json" );

    // Envío el usuario y la contraseña al servidor.
    return this.http.post( this.endPoint, user, { headers: headers } );

  }

  /**
   * Método que controla las posibles excepciones de los métodos.
   * @param error Error generado durante la comunicación.
   */
  private error( error: any ): Observable<any> {
    console.error( "error en login: " + error );
    return throwError(error);
  }

}
