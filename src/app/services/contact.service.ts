import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { ContactEntity } from "../entity/ContactEntity";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {


  // Atributos

  private readonly endPoint: string = "http://localhost:3000/api/contact"; // TODO cambiar por variable de entorno.


  // Constructor

  /**
   * Constructor de la clase. Se inyecta el servicio HttpClient para poder hacer peticiones http.
   */
  constructor( private http: HttpClient ) { }


  // Métodos

  /**
   * Cuándo este método es llamado, es que el cliente ha pulsado en enviar formulario de contacto.
   * Aquí se recibe y se le pasa al servidor todos los datos que ha rellenado.
   * @param contact Objeto contacto con todos los datos de los inputs.
   */
  public sendForm( contact: ContactEntity ): Observable<any> {

    const headers = new HttpHeaders();
    headers.set( "Content-Type", "application/json" );

    // Creo un objeto FormData para poder enviar binarios al back.
    // Lo creo con los datos rellenos del formulario de contacto.
    const formData = new FormData();
    formData.append( "email", contact.getEmail() );
    formData.append( "subject", contact.getSubject() );
    formData.append( "message", contact.getMessage() );
    // Si hay un archivo, lo añado al formulario.
    if ( contact.getFileInput() ) formData.append( "file", contact.getFileInput() );

    // Envío el formulario.
    return this.http.post( this.endPoint, formData, { headers: headers } )

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
