export class VehicleEntity {

  // Constructor

  constructor( private _id: string,
               private idDispositivo: string,
               private idConductores: string[],
               private idMantenimiento: string,
               private tipoVehiculo: string,
               private marca: string,
               private modelo: string,
               private chasis: number,
               private matricula: string,
               private fechaAlta: Date = new Date(  ),
               private kmIniciales: number,
               private kmActuales: number,
               private estado: boolean ) {

    this._id = _id;
    this.idDispositivo = idDispositivo;
    this.idConductores = idConductores;
  }

}
