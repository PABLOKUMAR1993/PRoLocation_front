import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DevicesService {


  // Atributos


  private readonly url: string = "http://localhost:3000";


  // Constructor


  constructor( private httpClient: HttpClient ) {}


  // Metodos


  // public all(): Observable<any> {
  //   return this.httpClient.get(`${this.url}/api/devices/all`).pipe(catchError(this.error));
  // }
  //
  // private error(error: any): Observable<any> {
  //   console.error(error);
  //   return throwError(error);
  // }

}
