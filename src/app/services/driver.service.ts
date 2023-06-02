import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { DriverEntity } from "../entity/DriverEntity";
import { environment } from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  // Atributos

  private readonly driverVehicle: string = environment.apiUrl + environment.apiDriverVehicle;

  // Constructor

  constructor( private http: HttpClient ) {}

  // Métodos

  public getDriver( vehicleId: string ): Observable<DriverEntity> { // Método que recupera el conductor del vehículo pasado por argumentos.
    return this.http.get<DriverEntity>( `${this.driverVehicle}/${vehicleId}` ).pipe( catchError( this.handleError ) );
  }

  private handleError( error: any ): Observable<any> { // Método que gestiona los errores si suceden durante la comunicación con el servidor.
    console.error("DriverService: " + error.error);
    return throwError(error.error || "Server error");
  }

}
