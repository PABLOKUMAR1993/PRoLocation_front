import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectVehicleService {

  // Atributos.

  checkedVehicle = new Subject<number>();

  // Constructor.

  constructor() { }

}
