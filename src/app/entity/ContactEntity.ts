export class ContactEntity {


  // Constructor

  constructor( private _email: any, private _subject: any, private _message: any, private _fileInput?: any ) {
    this._email = _email;
    this._subject = _subject;
    this._message = _message;
    this._fileInput = _fileInput;
  }


  // Getters y Setters

  getEmail() {
    return this._email;
  }

  setEmail(email: any) {
    this._email = email;
  }

  getSubject() {
    return this._subject;
  }

  setSubject(subject: any) {
    this._subject = subject;
  }

  getMessage() {
    return this._message;
  }

  setMessage(message: any) {
    this._message = message;
  }

  getFileInput() {
    return this._fileInput;
  }

  setFileInput(fileInput: any) {
    this._fileInput = fileInput;
  }


  // toString

  toString() {
    return (
      "Email: " + this._email +
      " Subject: " + this._subject +
      " Message: " + this._message +
      " File: " + this._fileInput
    );
  }

}
