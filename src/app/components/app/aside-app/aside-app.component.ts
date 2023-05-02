import {Component, Renderer2, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-aside-app',
  templateUrl: './aside-app.component.html',
  styleUrls: ['./aside-app.component.css']
})
export class AsideAppComponent implements AfterViewInit {

  // Atributos

  vehicles = [
    {
      id: "123456789",
      nombre: "Vehículo 01",
      datosVehiculo: {
        idLocalizador: "987654321",
        chasis: "45682",
        matricula: "1234ABC",
        marca: "Ford",
        modelo: "Focus",
        tipo: "Turismo",
      },
      estadoVehiculo: {
        kilometrajeIncial: 10000,
        kilometrajeActual: 54000,
        mediaDiaria: 400,
        filtros: {
          aceite: [
            {kilometros: 10000, fecha: "01/01/2019"},
            {kilometros: 20000, fecha: "01/01/2020"},
            {kilometros: 30000, fecha: "01/01/2021"},
            {kilometros: 40000, fecha: "01/01/2022"},
            {kilometros: 50000, fecha: "01/01/2023"},
          ],
          aire: [
            {kilometros: 20000, fecha: "01/01/2020"},
            {kilometros: 40000, fecha: "01/01/2022"}
          ],
          combustible: [
            {kilometros: 20000, fecha: "01/01/2020"},
            {kilometros: 40000, fecha: "01/01/2022"}
          ]
        }
      }
    }, {
      id: "456852159",
      nombre: "Vehículo 02",
      datosVehiculo: {
        idLocalizador: "987654321",
        chasis: "45682",
        matricula: "1234ABC",
        marca: "Ford",
        modelo: "Focus",
        tipo: "Turismo",
      },
      estadoVehiculo: {
        kilometrajeIncial: 10000,
        kilometrajeActual: 54000,
        mediaDiaria: 400,
        filtros: {
          aceite: [
            {kilometros: 10000, fecha: "01/01/2019"},
            {kilometros: 20000, fecha: "01/01/2020"},
            {kilometros: 30000, fecha: "01/01/2021"},
            {kilometros: 40000, fecha: "01/01/2022"},
            {kilometros: 50000, fecha: "01/01/2023"},
          ],
          aire: [
            {kilometros: 20000, fecha: "01/01/2020"},
            {kilometros: 40000, fecha: "01/01/2022"}
          ],
          combustible: [
            {kilometros: 20000, fecha: "01/01/2020"},
            {kilometros: 40000, fecha: "01/01/2022"}
          ]
        }
      }
    }
  ];

  showVehiclesList: boolean = true;

  ////// Iconos

  truck: string = "../../../../../assets/icons/truck_dark.svg";
  edit: string = "../../../../../assets/icons/edit_dark.svg";
  tools: string = "../../../../../assets/icons/tools_dark.svg";

  // Constructor

  constructor(private render: Renderer2) { }


  // Métodos


  ngAfterViewInit() {
    this.showVehicles();
  }

  /**
   * Método que muestra los vehículos en la lista del aside.
   */
  showVehicles() {

    console.log( "Estoy en show vehicules" );
    const ul = this.render.selectRootElement('#vehicleList');

    for (let i = 0; i < this.vehicles.length; i++) {

      const li = this.render.createElement('li');
      const divLeft = this.render.createElement('div');
      const divRight = this.render.createElement('div');
      const input = this.render.createElement('input');
      const imgTruck = this.render.createElement('img');
      const imgEdit = this.render.createElement('img');
      const imgTools = this.render.createElement('img');
      const label = this.render.createElement('label');

      this.render.appendChild(ul, li);
      this.render.appendChild(li, divLeft);
      this.render.appendChild(li, divRight);
      this.render.appendChild(divLeft, input);
      this.render.appendChild(divLeft, imgTruck);
      this.render.appendChild(divLeft, label);
      this.render.appendChild(divRight, imgEdit);
      this.render.appendChild(divRight, imgTools);

      this.render.setAttribute(input, "id", `truck${i}`);
      this.render.setAttribute(input, "type", "checkbox");
      this.render.setAttribute(input, "name", `truck${i}`);
      this.render.setAttribute(imgTruck, "src", this.truck);
      this.render.setAttribute(imgTruck, "alt", "icono de tipo de vehículo");
      this.render.addClass(imgTruck, "icon");
      this.render.setAttribute(label, "for", `truck${i}`);

      this.render.setAttribute(imgEdit, "src", this.edit);
      this.render.setAttribute(imgEdit, "alt", "icono de editar vehículo");
      this.render.addClass(imgEdit, "icon");
      this.render.setAttribute(imgTools, "src", this.tools);
      this.render.setAttribute(imgTools, "alt", "icono de herramientas");
      this.render.addClass(imgTools, "icon");

      const titulo = document.createTextNode( this.vehicles[i].nombre );
      this.render.appendChild( label, titulo );

    }

  }

}
