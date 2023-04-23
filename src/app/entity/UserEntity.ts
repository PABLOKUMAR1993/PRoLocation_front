export class UserEntity {


  // Constructor

  constructor( private _email: string, private _password: string ) {
    this._email = _email;
    this._password = _password;
  }


  // Getters y Setters

  getEmail() {
    return this._email;
  }

  setEmail(email: string) {
    this._email = email;
  }

  getPassword() {
    return this._password;
  }

  setPassword(password: string) {
    this._password = password;
  }


  // toString

  toString() {
    return (
      "Email: " + this._email +
      " Password: " + this._password
    );
  }

}
