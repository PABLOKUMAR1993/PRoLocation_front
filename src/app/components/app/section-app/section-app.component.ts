import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {PositionService} from "../../../services/position.service";
import {Subscription} from "rxjs";
import {SelectVehicleService} from "../../../services/select-vehicle.service";
import {VehicleI} from "../../../interface/VehicleI";
import {PositionI} from "../../../interface/PositionI";
import {UserI} from "../../../interface/UserI";

@Component({
  selector: 'app-section-app',
  templateUrl: './section-app.component.html',
  styleUrls: ['./section-app.component.css']
})
export class SectionAppComponent implements AfterViewInit {


  ////// Atributos.

  // Posiciones & Vehículos.

  private subscription: Subscription = new Subscription();
  private positions: PositionI[] = [];
  private positionsDefault: PositionI[] = [];

  // Google Maps.

  @ViewChild('map') mapElement: any;
  private map: google.maps.Map | any;
  private markers: google.maps.Marker[] | any = [];
  private centers: google.maps.LatLng[] | any = [];


  ////// Constructor.

  constructor(private positionService: PositionService, private selectVehicle: SelectVehicleService) {
  }


  ////// Métodos.

  ngAfterViewInit() { // Método que se ejecuta después de que se haya cargado la vista.

    // Si no se marca ningún vehículo, se muestran las últimas posiciones de todos los vehículos.
    this.addFirstPositions();

    // Cada vez que un vehículo es marcado.
    this.subscription = this.selectVehicle.checkedVehicle.subscribe((vehicle: VehicleI) => {
      this.addSelectedPosition(vehicle);
    }, (error) => {
      console.log("Error al recibir el vehículo en el checkBox: " + error);
    });

    // Cada vez que un vehículo es desmarcado.
    this.subscription = this.selectVehicle.unCheckedVehicle.subscribe((vehicle: VehicleI) => {
      this.deletePosition(vehicle);
    }, (error) => {
      console.log("Error al recibir el vehículo en el checkBox: " + error);
    });

  }

  addFirstPositions(): void { // Método que obtiene la última posición del primer vehículo de la lista.

    // Obtengo el usuario del localStorage.
    let user: UserI;
    let userString: string | null = localStorage.getItem('user');
    if (userString !== null) {
      user = JSON.parse(userString);
      // Obtengo la posición de todos los vehiculos.
      for (let i = 0; i < 2; i++){
        const id = user.vehiculos[i];
        this.positionService.lastPositionVehicle( id ).subscribe({
          next: (position: PositionI) => {
            // Mediante el ID de la posición compruebo si ya está en el array de posiciones. Si no está, lo añado.
            this.positionsDefault.push(position);
            console.log( "pedido" );
            // if (!this.positionsDefault.some((positionOfArray: PositionI) => positionOfArray._id === position._id)) {
            //
            // }
          }, error: (error) => {
            console.log("Error al obtener la última posición del vehículo: " + error);
          }, complete: () => {
            // Cuando se han obtenido todas las posiciones, se muestran en el mapa.
            if (this.positionsDefault.length === user.vehiculos.length) {
              console.log( "doble" )
              this.addCoords();
            }
          }
        });
      }
    }

  }

  addSelectedPosition(vehicle: VehicleI): void { // Método que obtiene la última posición de un vehículo.

    this.positionService.lastPositionVehicle(vehicle._id).subscribe({
      next: (position: PositionI) => {
        this.positions.push(position);
        console.log("Añado posición");
      }, error: (error) => {
        console.log("Error al obtener la última posición del vehículo: " + error);
      }, complete: () => {
        // Cuando se ha obtenido la posición, vacío el array por defecto y actualizo el mapa.
        this.positionsDefault = [];
        this.addCoords();
      }
    });

  }

  deletePosition(vehicle: VehicleI): void { // Método que elimina una posición del array de posiciones.

    this.positionService.lastPositionVehicle(vehicle._id).subscribe({
      next: (position: PositionI) => {
        // Mediante el ID de la posición compruebo si ya está en el array de posiciones. Si está, lo elimino.
        if (this.positions.some((positionOfArray: PositionI) => positionOfArray._id === position._id)) {
          this.positions = this.positions.filter((positionOfArray: PositionI) => positionOfArray._id !== position._id);
          console.log("Elimino posición");
        } else {
          console.log("El vehículo no está en el array");
        }
      }, error: (error) => {
        console.log("Error al obtener la última posición del vehículo en deletePosition(): " + error)
      }, complete: () => {
        // Cuando se ha eliminado la posición, vacío el array por defecto y actualizo el mapa.
        this.positionsDefault = [];
        this.addCoords();
      }
    });

  }

  addCoords(): void { // Método que muestra las posiciones en el mapa.

    // Relleno el array de ubicaciones.
    if ( this.positionsDefault.length === 0 ) {
      this.centers = [];
      for (let i: number = 0; i < this.positions.length; i++) {
        this.centers[i] = new google.maps.LatLng(Number(this.positions[i].latitud), Number(this.positions[i].longitud));
      }
    } else {
      this.centers = [];
      for (let i: number = 0; i < this.positionsDefault.length; i++) {
        this.centers[i] = new google.maps.LatLng(Number(this.positionsDefault[i].latitud), Number(this.positionsDefault[i].longitud));
      }
    }

    // Llamo a la siguiente función para pintar el mapa.
    this.mapInit();

  }

  mapInit(): void { // Método que pinta el mapa.

    // Creo el mapa.
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: this.centers[0],
      zoom: 10
    });

    // Creo los marcadores.
    for (let i = 0; i < this.centers.length; i++) {
      this.markers[i] = new google.maps.Marker({
        position: this.centers[i],
        map: this.map
      });
    }

    // Calcular los límites que contienen ambos marcadores
    const bounds = new google.maps.LatLngBounds();
    for (const marker of this.markers) {
      bounds.extend(marker.getPosition() as google.maps.LatLng);
    }

    // Ajustar el zoom y el centro del mapa para mostrar ambos marcadores
    this.map.fitBounds(bounds);

  }

}
