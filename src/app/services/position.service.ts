import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../environment/environment";
import { PositionI } from "../interface/PositionI";
import { VehicleI } from "../interface/VehicleI";

@Injectable({
  providedIn: 'root'
})
export class PositionService {


  ////// Atributos

  private readonly getAllPositions: string = environment.apiUrl + environment.apiAllPositions;
  private readonly getActualPosition: string = environment.apiUrl + environment.apiActualPositionVehicle;


  ////// Constructor

  constructor( private http: HttpClient ) {}


  ////// Métodos

  public allPositions(): Observable<PositionI[]> { // Método que obtiene la última posición de todos los dispositivos.

    // TODO si lo necesito usar, el objeto que devuelve está mal.
    return this.http.get<PositionI[]>( this.getAllPositions ).pipe( catchError( this.error ) );

  }

  public lastPositionVehicle( id: string ): Observable<PositionI> { // Método que obtiene la última posición de un vehículo.
    return this.http.get<PositionI>( this.getActualPosition + "/" + id ).pipe( catchError( this.error ) );
  }

  private error(error: any): Observable<any> { // Método que gestiona los errores si suceden durante la comunicación con el servidor.
    console.error( `error en servicio position: ${error['error'].mensaje}` );
    return throwError(error.error || "Server error");
  }

}
