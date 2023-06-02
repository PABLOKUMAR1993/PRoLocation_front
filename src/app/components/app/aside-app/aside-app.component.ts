import {Component, Renderer2, OnInit} from '@angular/core';
import {SelectVehicleService} from "../../../services/select-vehicle.service";
import {VehiclesService} from "../../../services/vehicles.service";
import {VehicleI} from "../../../interface/VehicleI";
import {UserI} from "../../../interface/UserI";
import {DriverService} from "../../../services/driver.service";
import {DriverEntity} from "../../../entity/DriverEntity";

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

  // Iconos

  truckDark: string = "../../../../../assets/icons/dark/truck_dark.svg";
  personDark: string = "../../../../../assets/icons/dark/person_dark.svg";
  toolsDark: string = "../../../../../assets/icons/dark/tools_dark.svg";
  truckBlue: string = "../../../../../assets/icons/blue/truck_blue.svg";
  personBlue: string = "../../../../../assets/icons/blue/person_blue.svg";
  toolsBlue: string = "../../../../../assets/icons/blue/tools_blue.svg";
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
          this.vehicles = vehicles;
          this.showVehiclesList = true;
          for ( let vehicle of vehicles ) this.showVehicleDetail.push(false);

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
          });

        }, error: (err) => {
          console.error("Error al obtener vehículos en getOwnerVehicles(): " + err);
          this.showVehiclesList = false;
        }
      });
    }

  }

  onTruckClick(check: Event, id: number): void { // Método que se ejecuta cuando se hace clic en un vehículo

    // Recupero el valor del estado del checkbox.
    const checked: boolean = (check.target as HTMLInputElement).checked;

    // Le pasa el dato al servicio para que procese la posición en el mapa y cambio de color los iconos.
    if (checked) {
      this.selectVehicle.checkedVehicle.next(this.vehicles[id - 1]);
      this.changeTruckIconColor(checked, id);
      this.showVehicleDetail[id-1] = true;
    } else {
      this.selectVehicle.unCheckedVehicle.next(this.vehicles[id - 1]);
      this.changeTruckIconColor(checked, id);
      this.showVehicleDetail[id-1] = false;
    }

  }

  public onDriverClick(state: boolean, index: number): void { // Método que se ejecuta cuando se hace clic en un conductor.

    // Si el estado es true, cambio el icono a azul.
    if (state) {
      // Cambio el estado del booleano para que cambie el icono que se muestra.
      this.driverShow[index] = false;
      // Añado el conductor indicado al array de conductores seleccionados.
      this.driversListFiltered.push(this.driversList[index]);
      console.log(this.driversListFiltered)
    } else {
      // Cambio el estado del booleano para que cambie el icono que se muestra.
      this.driverShow[index] = true;
      // Elimino el conductor indicado del array de conductores seleccionados.
      this.driversListFiltered = this.driversListFiltered.filter((driver) => {
        return driver._id !== this.driversList[index]._id
      });
      console.log(this.driversListFiltered)
    }
  }


  changeTruckIconColor(check: boolean, id: number): void { // Método que cambiará el icono de color cuando es clicado.

    // Recupero el icono.
    const icon: HTMLElement | null = document.getElementById(`${id}`);

    // Modifico la imagen del icono según si está clicado o des clicado
    // y muestro u oculto los datos del vehículo.
    if (icon) {
      if (check) {
        icon.setAttribute("src", this.truckBlue);
        this.showVehicleData(this.vehicles[id - 1]);
      } else {
        icon.setAttribute("src", this.truckDark);
        this.hideVehicleData(this.vehicles[id - 1]);
      }
    }

  }

  showVehicleData(vehicle: VehicleI): void { // Método que muestra en una lista todos los datos del vehículo seleccionado.

    // Obtengo el elemento que contiene los datos del vehículo.
    this.vehiclesDetails.push(vehicle);

  }

  hideVehicleData(vehicle: VehicleI): void { // Método que oculta los datos del vehículo seleccionado.

    // Borro el vehículo de la lista de vehículos mediante el _id.
    this.vehiclesDetails = this.vehiclesDetails.filter((v) => v._id !== vehicle._id);

  }


  onMaintenanceClick(): void { // Método que despliega la lista de mantenimientos cuando se hace clic en el icono.

    // TODO

  }

  closeAllTables(origin: string): void {
    // Método que cambia todos los atributos a false para cerrar todas las tablas menos la clicada.
    // TODO
  }

}
