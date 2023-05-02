export class UserEntity {

  // Constructor

  constructor( private email: string, private password: string ) {
    this.email = email;
    this.password = password;
  }

  // Getters y Setters

  getEmail() {
    return this.email;
  }

  setEmail(email: string) {
    this.email = email;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password: string) {
    this.password = password;
  }

  // toString

  toString() {
    return (
      "Email: " + this.email +
      " Password: " + this.password
    );
  }

}
