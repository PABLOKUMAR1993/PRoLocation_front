import {Component, Renderer2, OnInit} from '@angular/core';
import {SelectVehicleService} from "../../../services/select-vehicle.service";
import {VehiclesService} from "../../../services/vehicles.service";
import {VehicleI} from "../../../interface/VehicleI";
import {UserI} from "../../../interface/UserI";
import {DriverService} from "../../../services/driver.service";
import {DriverEntity} from "../../../entity/DriverEntity";
import {PositionI} from "../../../interface/PositionI";

@Component({
  selector: 'app-aside-app',
  templateUrl: './aside-app.component.html',
  styleUrls: ['./aside-app.component.css']
})
export class AsideAppComponent implements OnInit {


  ////// Atributos

  // Vehiculos

  vehicles: VehicleI[] = [];
  vehiclesDetails: VehicleI[] = [];
  showVehiclesList: boolean = false;
  showVehicleDetail: boolean[] = [];

  // Conductores

  driversList: DriverEntity[] = [];
  driversListFiltered: DriverEntity[] = [];
  driverShow: boolean[] = [];

  // Mantenimientos

  showMaintenanceDetail: boolean = false;

  // MapPin

  showMapPin: boolean[] = [];
  isPositionRecieved: boolean = false;
  positionMapPin: PositionI | any;

  // Iconos

  truckDark: string = "../../../../../assets/icons/dark/truck_dark.svg";
  personDark: string = "../../../../../assets/icons/dark/person_dark.svg";
  toolsDark: string = "../../../../../assets/icons/dark/tools_dark.svg";
  mapPinDark: string = "../../../../../assets/icons/dark/map_marker_dark.svg";
  truckBlue: string = "../../../../../assets/icons/blue/truck_blue.svg";
  personBlue: string = "../../../../../assets/icons/blue/person_blue.svg";
  toolsBlue: string = "../../../../../assets/icons/blue/tools_blue.svg";
  mapPinBlue: string = "../../../../../assets/icons/blue/map_marker_blue.svg";
  arrowGray: string = "../../../../../assets/icons/gray/arrow_circle_gray.svg";


  ////// Constructor

  constructor(
    private render: Renderer2,
    private selectVehicle: SelectVehicleService,
    private vehicleService: VehiclesService,
    private driverService: DriverService
  ) {
  }


  ////// Métodos

  ngOnInit() { // Después de que se haya cargado el componente, obtengo los vehículos del usuario.
    this.getOwnerVehicles();

    // Cada vez que se recibe una posición del websocket.
    this.selectVehicle.positionSelected.subscribe({
      next: (position: PositionI) => {
        this.positionMapPin = position;
        this.isPositionRecieved = true;
        console.log("Posición recibida: ");
        console.log(position);
      }, error: (error) => {
        console.error("Error al recibir la posición del vehículo: ");
        console.error(error);
      }
    });
  }

  getOwnerVehicles(): void { // Obtengo los vehículos del usuario a través del servicio.

    // Obtengo el usuario del localStorage.
    let user: UserI;
    let userString: string | null = localStorage.getItem('user');

    // Si hay usuario, lo parseo y obtengo sus vehículos del servicio.
    if (userString) {
      user = JSON.parse(userString);
      this.vehicleService.getVehiclesByEmail(user.email).subscribe({
        next: (vehicles: VehicleI[]) => {

          // Obtengo la lista de vehículos.
          this.vehicles = vehicles;
          this.showVehiclesList = true;
          for (let vehicle of vehicles) this.showVehicleDetail.push(true);

          // Obtengo la lista de conductores.
          this.vehicles.forEach((vehicle: VehicleI) => {
            this.driverService.getDriver(vehicle._id).subscribe({
              next: (driver: DriverEntity) => {
                this.driversList.push(driver);
              }, error: (err) => {
                console.error("Error al obtener el conductor en getOwnerVehicles(): ");
                console.error(err);
              }
            });
            // Establezco el estado de los conductores a true.
            this.driverShow.push(true);
            // Establezco el estado de los mapPin a true.
            this.showMapPin.push(true);
          });

          // Obtengo la lista de mantenimientos.

        }, error: (err) => {
          console.error("Error al obtener vehículos en getOwnerVehicles(): " + err);
          this.showVehiclesList = false;
        }
      });
    }

  }

  public onVehicleClick(index: number, event: Event): void { // Método que se ejecuta cuando se hace clic en un vehículo.

    // Recupero el valor del estado del checkbox.
    const checked: boolean = (event.target as HTMLInputElement).checked;
    // Recupero el icono.
    const icon: HTMLElement | null = document.getElementById(`${index+1}`);

    if (checked) {
      // Cambio el color del icono.
      if (icon) icon.setAttribute("src", this.truckBlue);
      // Añado el vehículo indicado al array de vehículos seleccionados.
      this.vehiclesDetails.push( this.vehicles[index] );
      // Llamo al servicio para indicarle al mapa el vehículo activo.
      this.selectVehicle.checkedVehicle.next(this.vehicles[index]);
    } else {
      // Cambio el color del icono.
      if (icon) icon.setAttribute("src", this.truckDark);
      // Elimino el vehículo indicado del array de vehículos seleccionados.
      this.vehiclesDetails = this.vehiclesDetails.filter((vehicle) => {
        return vehicle._id !== this.vehicles[index]._id
      });
      // Llamo al servicio para indicarle al mapa el vehículo que se acaba de desactivar.
      this.selectVehicle.unCheckedVehicle.next(this.vehicles[index]);
    }

  }

  public onDriverClick(state: boolean, index: number): void { // Método que se ejecuta cuando se hace clic en un conductor.

    // Si el estado es true, cambio el icono a azul.
    if (state) {
      // Cambio el estado del booleano para que cambie el icono que se muestra.
      this.driverShow[index] = false;
      // Añado el conductor indicado al array de conductores seleccionados.
      this.driversListFiltered.push(this.driversList[index]);
    } else {
      // Cambio el estado del booleano para que cambie el icono que se muestra.
      this.driverShow[index] = true;
      // Elimino el conductor indicado del array de conductores seleccionados.
      this.driversListFiltered = this.driversListFiltered.filter((driver) => {
        return driver._id !== this.driversList[index]._id
      });
    }
  }

  public onMapPinClick(state: boolean, index: number): void {

    if (state) {
      // Cambio el estado del booleano para que cambie el icono que se muestra.
      this.showMapPin[index] = false;
      // Llamo al servicio para indicarle al mapa el vehículo activo.
      this.selectVehicle.pinClicked.next(this.vehicles[index]);
    } else {
      // Cambio el estado del booleano para que cambie el icono que se muestra.
      this.showMapPin[index] = true;
      // Llamo al servicio para indicarle al mapa el vehículo que se acaba de desactivar.
      this.selectVehicle.pinUnClicked.next(this.vehicles[index]);
    }

  }

  onMaintenanceClick(): void { // Método que despliega la lista de mantenimientos cuando se hace clic en el icono.

    // TODO

  }

  closeAllTables(origin: string): void {
    // Método que cambia todos los atributos a false para cerrar todas las tablas menos la clicada.
    // TODO
  }

}
