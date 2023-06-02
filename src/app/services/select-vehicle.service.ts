import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectVehicleService {

  // Este observable se utiliza para comunicar el componente de mapa con el componente de lista de vehículos.
  // Concretamente aside con section.
  checkedVehicle: Subject<any> = new Subject<any>();
  unCheckedVehicle: Subject<any> = new Subject<any>();

}
