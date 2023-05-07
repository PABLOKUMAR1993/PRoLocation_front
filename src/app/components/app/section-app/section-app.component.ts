import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { PositionService } from "../../../services/position.service";
import {Subscription} from "rxjs";
import {SelectVehicleService} from "../../../services/select-vehicle.service";

@Component({
  selector: 'app-section-app',
  templateUrl: './section-app.component.html',
  styleUrls: ['./section-app.component.css']
})
export class SectionAppComponent implements AfterViewInit {

  // Atributos.

  lat1: number = 0;
  lon1: number = 0;
  lat2: number = 0;
  lon2: number = 0;
  @ViewChild('map') mapElement: any;
  map: google.maps.Map | any;
  marker1: google.maps.Marker | any;
  marker2: google.maps.Marker | any;
  private subscription: Subscription = new Subscription();

  // Constructor.

  constructor( private positionService: PositionService, private selectVehicle: SelectVehicleService ) {
    this.subscription = this.selectVehicle.checkedVehicle.subscribe( (id) => {
      console.log("Desde Select, id clicado " + id);
    });
  }

  // Métodos.

  ngAfterViewInit() {
    this.recibeCoordenadas();
  }

  recibeCoordenadas(): void {

    this.positionService.allPositions().subscribe( {
      next: (res) => {
        this.lat1 = Number(res[0].lat);
        this.lon1 = Number(res[0].lon);
        this.lat2 = Number(res[1].lat);
        this.lon2 = Number(res[1].lon);
      }, error: (error) => {
        console.log(error);
      }, complete: () => {
        const center1: google.maps.LatLngLiteral = { lat: this.lat1, lng: this.lon1 };
        const center2: google.maps.LatLngLiteral = { lat: this.lat2, lng: this.lon2 };
        this.mapInit( center1, center2 );
      }
    });

  }

  mapInit( center1: google.maps.LatLngLiteral, center2: google.maps.LatLngLiteral ): void {

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: center1,
      zoom: 10
    });

    // Primer marcador
    this.marker1 = new google.maps.Marker({
      position: center1,
      map: this.map
    });

    // Segundo marcador
    this.marker2 = new google.maps.Marker({
      position: center2,
      map: this.map
    });

    // Calcular los límites que contienen ambos marcadores
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(this.marker1.getPosition() as google.maps.LatLng);
    bounds.extend(this.marker2.getPosition() as google.maps.LatLng);

    // Ajustar el zoom y el centro del mapa para mostrar ambos marcadores
    this.map.fitBounds(bounds);

  }

}
