import {Component, ViewChild, OnInit, Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
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
export class SectionAppComponent implements OnInit {


  ////// Atributos.

  // Posiciones & Vehículos.

  private subscription: Subscription = new Subscription();
  private positions: PositionI[] = [];
  private positionsDefault: PositionI[] = [];
  private actualPositionSelected: PositionI | any;

  // Google Maps.

  @ViewChild('map') mapElement: any;
  private map: google.maps.Map | any;
  private markers: google.maps.Marker[] | any = [];
  private centers: google.maps.LatLng[] | any = [];

  // WebSockets.

  private socket$: WebSocketSubject<PositionI> | any;


  ////// Constructor.

  constructor(private positionService: PositionService, private selectVehicle: SelectVehicleService) { }


  ////// Métodos.

  ngOnInit() { // Método que se ejecuta después de que se haya cargado el componente.

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

    // Cada vez que es clicado el botón de seguimiento en tiempo real.
    this.subscription = this.selectVehicle.pinClicked.subscribe((vehicle: VehicleI) => {
      console.log("Pin clicado");
      this.connectVehicleWS(vehicle);
    });

    // Cada vez que es des clicado el botón de seguimiento en tiempo real.
    this.subscription = this.selectVehicle.pinUnClicked.subscribe((vehicle: VehicleI) => {
      console.log("Pin des clicado");
      this.stopVehicleWS();
    });

  }

  ////// Métodos de posicionamiento estático.

  addFirstPositions(): void { // Método que obtiene la última posición de todos los vehículos.

    // Obtengo el usuario del localStorage.
    let user: UserI;
    let userString: string | null = localStorage.getItem('user');
    if (userString !== null) {
      user = JSON.parse(userString);
      // Obtengo la posición de todos los vehiculos.
      for (let i = 0; i < 2; i++) {
        const id = user.vehiculos[i];
        this.positionService.lastPositionVehicle(id).subscribe({
          next: (position: PositionI) => {
            // Mediante el ID de la posición compruebo si ya está en el array de posiciones. Si no está, lo añado.
            this.positionsDefault.push(position);
            console.log("pedido");
            // if (!this.positionsDefault.some((positionOfArray: PositionI) => positionOfArray._id === position._id)) {
            //
            // }
          }, error: (error) => {
            console.log("Error al obtener la última posición del vehículo: " + error);
          }, complete: () => {
            // Cuando se han obtenido todas las posiciones, se muestran en el mapa.
            if (this.positionsDefault.length === user.vehiculos.length) {
              console.log("doble")
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
        console.log(this.positions)
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
        // Mediante el ID de la posición recibida, busco la posición en el array de posiciones y la elimino.
        for (let i: number = 0; i < this.positions.length; i++) {
          if (this.positions[i]._id === position._id) {
            this.positions.splice(i, 1);
          }
        }
        console.log("Elimino posición");
        console.log(this.positions);
      }, error: (error) => {
        console.log("Error al obtener la última posición del vehículo en deletePosition(): " + error)
      }, complete: () => {
        // Cuándo se ha eliminado la posición, vacío el array por defecto y actualizo el mapa.
        this.positionsDefault = [];
        this.addCoords();
      }
    });

  }

  ////// Métodos de posicionamiento dinámico.

  public connectVehicleWS(vehicle: VehicleI): void { // Método que conecta con el servidor mediante WebSockets.

    if (!this.socket$) {

      // Creo una conexión con el servidor mediante WebSockets.
      this.socket$ = webSocket<PositionI>('ws://localhost:3001');

      // Escucho los mensajes que me envía el servidor y actualizo la posición del vehículo.
      this.socket$.subscribe({
        next: (position: PositionI) => {
          this.actualPositionSelected = position;
          this.sendVehicleWS(vehicle);
          this.addCoords();
          this.selectVehicle.positionSelected.next( position ); // Le paso la posición al componente de información.
        }, error: (error: any) => {
          console.error("Error al recibir el mensaje del servidor: ");
          console.error(error);
        }
      });

      // Le paso el vehículo al iniciar la comunicación.
      this.socket$.next(vehicle);

    }
  }

  public sendVehicleWS(vehicle: VehicleI): void { // Método que envía un vehículo al servidor mediante WebSockets.
    this.socket$.next(vehicle);
  }

  public stopVehicleWS(): void { // Método que desconecta del servidor mediante WebSockets.
    this.socket$.complete();
    this.socket$ = undefined;
  }

  ////// Métodos de pintado de mapa.

  addCoords(): void { // Método que muestra las posiciones en el mapa.

    // Relleno el array de ubicaciones.
    if (this.actualPositionSelected !== undefined) {
      this.centers = [];
      this.centers[0] = new google.maps.LatLng(Number(this.actualPositionSelected.latitud), Number(this.actualPositionSelected.longitud));
    } else {
      if (this.positionsDefault.length === 0) {
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

    this.markers = []; // Limpio el array de marcadores.

    // Creo los marcadores.
    for (let i = 0; i < this.centers.length; i++) {
      const marker = new google.maps.Marker({
        position: this.centers[i],
        map: this.map
      });
      this.markers.push(marker);
    }

    this.adjustZoom(); // Ajustar el zoom después de agregar o quitar marcadores

  }

  adjustZoom(): void {
    const bounds = new google.maps.LatLngBounds();
    for (const marker of this.markers) {
      bounds.extend(marker.getPosition() as google.maps.LatLng);
    }

    this.map.fitBounds(bounds);
  }

}
