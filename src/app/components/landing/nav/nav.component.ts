import {Component, Renderer2} from '@angular/core';
import {ContactService} from "../../../services/contact.service";
import {ContactEntity} from "../../../entity/ContactEntity";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {


  // Atributos

  email: string = "";
  password: string = "";
  alert: boolean = false;
  readonly loginError: string = "Email o contraseña incorrectos.";


  // Constructor

  /**
   * Inyecta el servicio de render para poder modificar el DOM.
   */
  constructor( private render: Renderer2 ) { }


  // Métodos

  /**
   * Método que comprueba si todos los inputs están rellenos correctamente.
   */
  validateForm(): void {

    // Si todos los campos están rellenos, enviará los datos al back.
    if (this.email.trim().length > 0 &&
      this.password.trim().length > 0) {
      //this.sendForm();
    }

    // Si algún campo o varios no están rellenos, mostraré mensaje de error.
    if (this.email.trim().length == 0) this.emailInvalid();
    else this.emailValid();
    if (this.password.trim().length == 0) this.passwordInvalid();
    else this.passwordValid();

  }

  /**
   * Si el email no está relleno, este método será llamada y mostrará un error.
   */
  emailInvalid(): void {
    this.cleanMessage("emailValid");
    const email: any = document.querySelector("#email");
    this.render.addClass(email, "is-invalid");
  }

  /**
   * Si el email está relleno, este método será llamada y mostrará un mensaje.
   */
  emailValid(): void {
    this.cleanMessage("emailInvalid");
    const email: any = document.querySelector("#email");
    this.render.addClass(email, "is-valid");
  }

  /**
   * Si la contraseña no está relleno, este método será llamada y mostrará un error.
   */
  passwordInvalid(): void {
    this.cleanMessage("passwordValid");
    const password: any = document.querySelector("#passwordInput");
    this.render.addClass(password, "is-invalid");
  }

  /**
   * Si la contraseña está relleno, este método será llamada y mostrará un mensaje.
   */
  passwordValid(): void {
    this.cleanMessage("passwordInvalid");
    const password: any = document.querySelector("#passwordInput");
    this.render.addClass(password, "is-valid");
  }


  /**
   * Esté método será llamado cada vez que se pulse el botón de enviar, sirve para resetear los mensajes de validación
   * de los inputs, para evitar su acumulación.
   * @param input identifica que input será reseteado y que estado tiene que resetear.
   */
  cleanMessage(input: string): void {

    const email: any = document.querySelector("#email");
    const password: any = document.querySelector("#passwordInput");

    switch (input) {
      case "emailInvalid":
        this.render.removeClass(email, "is-invalid");
        break;
      case "emailValid":
        this.render.removeClass(email, "is-valid");
        break;
      case "passwordInvalid":
        this.render.removeClass(password, "is-invalid");
        break;
      case "passwordValid":
        this.render.removeClass(password, "is-valid");
        break;
      default:
        console.log("Elección no valida para vaciar los mensajes de los inputs.");
    }

  }

  /**
   * Establece la variable a true para mostrar una alerta que de que el mensaje ha sido enviado.
   */
  showAlert(): void {
    this.alert = true;
  }

}
