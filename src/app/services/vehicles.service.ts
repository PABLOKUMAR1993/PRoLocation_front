import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from "../../environment/environment";
import { VehicleI } from "../interface/VehicleI";

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  // Atributos

  private readonly allVehicles = environment.apiUrl + environment.apiViewAllVehicles;
  private readonly allUserVehicles = environment.apiUrl + environment.apiViewUserVehicles;


  // Constructor

  constructor( private http: HttpClient ) {}


  // Métodos


  getAllVehicles(): Observable<VehicleI[]> { // Método que obtiene todos los vehículos de la base de datos.
    return this.http.get<VehicleI[]>(this.allVehicles).pipe( catchError( this.handleError ) );
  }

  getVehiclesByEmail( email: string ): Observable<VehicleI[]> { // Obtengo todos los vehículos de un usuario.
    return this.http.get<VehicleI[]>( this.allUserVehicles + "/" + email )
                    .pipe( catchError( this.handleError ) );
  }

  private handleError( error: any ): Observable<any> { // Método que gestiona los errores si suceden durante la comunicación con el servidor.
    console.log("VehicleService: Error en la comunicación con el servidor");
    console.log(error);
    return throwError(error.error || "Server error");
  }

}
