export interface UserI {

  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  fechaAlta: Date;
  estado: boolean;
  vehiculos: string[];

}
