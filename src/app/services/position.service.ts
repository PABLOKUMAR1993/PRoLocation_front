import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  // Atributos

  private readonly endpoint: string = "http://localhost:3000/api/lastPositionOfAllDevices";

  // Constructor

  constructor( private http: HttpClient ) {}

  // Métodos

  public allPositions(): Observable<any> {
    return this.http.get( this.endpoint ).pipe( catchError( this.error ) );
  }

  private error(error: any): Observable<any> {
    console.error( "error en servicio position: " + error);
    return throwError(error);
  }
}
