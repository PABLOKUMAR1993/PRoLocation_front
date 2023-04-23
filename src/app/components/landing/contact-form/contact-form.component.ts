import {Component, Renderer2} from '@angular/core';
import { ContactEntity } from '../../../entity/ContactEntity';
import {ContactService} from "../../../services/contact.service";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {


  // Atributos

  email: string = "";
  subject: string = "";
  message: string = "";
  fileInput: any;
  readonly textInvalidEmail: string = "Necesitamos tu email para poder comunicarnos contigo.";
  readonly textInvalidSubject: string = "Necesitamos saber de que se trata.";
  readonly textInvalidMessage: string = "Te dejas vacío lo más importante!.";
  readonly textValid: string = "Correcto. Gracias!";
  readonly messageSubmited: string = "Gracias! Hemos recibido tu mensaje.";
  alert: boolean = false;


  // Constructor

  /**
   * Inyecta el servicio de contacto y el render para poder modificar el DOM.
   */
  constructor( private render: Renderer2, private contactService: ContactService ) { }


  // Métodos

  /**
   * Método que comprueba si todos los inputs están rellenos correctamente.
   */
  validateForm(): void {

    // Si todos los campos están rellenos, enviará el mensaje.
    if (this.email.trim().length > 0 &&
      this.subject.trim().length > 0 &&
      this.message.trim().length > 0) {
      this.sendForm();
    }

    // Si algún campo o varios no están rellenos, mostraré mensaje de error.
    if (this.email.trim().length == 0) this.emailInvalid();
    else this.emailValid();
    if (this.subject.trim().length == 0) this.subjectInvalid();
    else this.subjectValid();
    if (this.message.trim().length == 0) this.messageInvalid();
    else this.messageValid();

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
   * Si el asunto no está relleno, este método será llamada y mostrará un error.
   */
  subjectInvalid(): void {
    this.cleanMessage("subjectValid");
    const subject: any = document.querySelector("#subject");
    this.render.addClass(subject, "is-invalid");
  }

  /**
   * Si el asunto está relleno, este método será llamada y mostrará un mensaje.
   */
  subjectValid(): void {
    this.cleanMessage("subjectInvalid");
    const subject: any = document.querySelector("#subject");
    this.render.addClass(subject, "is-valid");
  }

  /**
   * Si el mensaje no está relleno, este método será llamada y mostrará un error.
   */
  messageInvalid(): void {
    this.cleanMessage("messageValid");
    const message: any = document.querySelector("#message");
    this.render.addClass(message, "is-invalid");
  }

  /**
   * Si el mensaje está relleno, este método será llamada y mostrará un mensaje.
   */
  messageValid(): void {
    this.cleanMessage("messageInvalid");
    const message: any = document.querySelector("#message");
    this.render.addClass(message, "is-valid");
  }

  /**
   * Esté método será llamado cada vez que se pulse el botón de enviar, sirve para resetear los mensajes de validación
   * de los inputs, para evitar su acumulación.
   * @param input identifica que input será reseteado y que estado tiene que resetear.
   */
  cleanMessage(input: string): void {

    const email: any = document.querySelector("#email");
    const subject: any = document.querySelector("#subject");
    const message: any = document.querySelector("#message");

    switch (input) {
      case "emailInvalid":
        this.render.removeClass(email, "is-invalid");
        break;
      case "emailValid":
        this.render.removeClass(email, "is-valid");
        break;
      case "subjectInvalid":
        this.render.removeClass(subject, "is-invalid");
        break;
      case "subjectValid":
        this.render.removeClass(subject, "is-valid");
        break;
      case "messageInvalid":
        this.render.removeClass(message, "is-invalid");
        break;
      case "messageValid":
        this.render.removeClass(message, "is-valid");
        break;
      default:
        console.log("Elección no valida para vaciar los mensajes de los inputs.");
    }

  }

  /**
   * Almacena el fichero seleccionado en el input file.
   * @param event evento que se produce al seleccionar un fichero.
   */
  onFileSelected( event: any ) {
    this.fileInput = event.target.files[0];
  }

  /**
   * Método que envía el formulario.
   */
  sendForm() {

    // construyo un objeto de tipo ContactEntity
    const contact: ContactEntity = new ContactEntity( this.email, this.subject, this.message, this.fileInput );

    // llamo al servicio para enviar el formulario
    this.contactService.sendForm( contact ).subscribe( response => {
      this.showAlert();
      console.log( "Respuesta Envío Formulario: " + response.mensaje );
    });

  }

  /**
   * Establece la variable a true para mostrar una alerta que de que el mensaje ha sido enviado.
   */
  showAlert(): void {
    this.alert = true;
  }

}
