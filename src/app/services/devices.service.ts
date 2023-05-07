import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DevicesService {


  // Atributos

  private readonly endpoint: string = "http://localhost:3000/api/devices/lastPositionOfAllDevices";

  // Constructor

  constructor( private httpClient: HttpClient ) {}

  // Métodos

  public allDevices(): Observable<any> {
    return this.httpClient.get( this.endpoint ).pipe( catchError( this.error ) );
  }

  private error(error: any): Observable<any> {
    console.error( "error en recuperar ubicaciones: " + error);
    return throwError(error);
  }

}
