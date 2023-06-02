export interface DriverI {
  _id: string;
  nombre: string;
  dni: string;
  fechaAlta: Date;
  fechaPermisoCirculacion: Date;
  estado: boolean;
}
