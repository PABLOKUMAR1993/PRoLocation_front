import { DriverI } from "../interface/DriverI";

export class DriverEntity implements DriverI {

  // Atributos

  _id: string;
  dni: string;
  estado: boolean;
  fechaAlta: Date;
  fechaPermisoCirculacion: Date;
  nombre: string;
  driver: any;

  // Constructor

  constructor( _id?: string,
               dni?: string,
               estado?: boolean,
               fechaAlta?: Date,
               fechaPermisoCirculacion?: Date,
               nombre?: string, ) {
    this._id = _id ? _id : "";
    this.dni = dni ? dni : "";
    this.estado = estado ? estado : false;
    this.fechaAlta = fechaAlta ? fechaAlta : new Date();
    this.fechaPermisoCirculacion = fechaPermisoCirculacion ? fechaPermisoCirculacion : new Date();
    this.nombre = nombre ? nombre : "";
  }

}
