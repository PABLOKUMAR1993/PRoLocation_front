export class DeviceEntity {


  // Attributes


  group: string;
  idExternal: string;
  speed: string;
  lat: string;
  lon: string;
  ibtn: string;
  ibtnName: string;
  TimeStamp: string;
  id: string;


  // Constructor


  constructor(  ) {

    this.group = "";
    this.idExternal = "";
    this.speed = "";
    this.lat = "";
    this.lon = "";
    this.ibtn = "";
    this.ibtnName = "";
    this.TimeStamp = "";
    this.id = "";

  }


  // toString


  public toString(): string { return JSON.stringify( this ); }


}
