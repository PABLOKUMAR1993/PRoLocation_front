import {Component, Renderer2} from '@angular/core';
import {UserEntity} from "../../../entity/UserEntity";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.css']
})
export class SigningComponent {


  // Atributos

  email: string = "";
  password: string = "";
  alert: boolean = false;
  private user: UserEntity = new UserEntity(this.email, this.password);


  // Constructor

  /**
   * Inyecta el servicio de render para poder modificar el DOM, el servicio de autenticación
   * para poder iniciar sesión y router para redirigir si el login ha sido exitoso.
   */
  constructor(private render: Renderer2, private authService: AuthService, private router: Router) {}


  // Métodos

  /**
   * Método que comprueba si todos los inputs están rellenos correctamente.
   */
  validateForm(): void {

    // Si todos los campos están rellenos, enviará los datos al back.
    if (this.email.trim().length > 0 && this.password.trim().length > 0) {
      this.sendForm();
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
   * Método que envía los datos del formulario al back para iniciar sesión.
   */
  sendForm(): void {

    // Actualizo los datos del usuario.
    this.user.setEmail(this.email);
    this.user.setPassword(this.password);

    // Envío los datos al back.
    this.authService.singIn(this.user).subscribe({
      next: (res) => {
        // Guardo el token en el localStorage.
        localStorage.setItem( "token", res.token );
        // Guardo el usuario en el localStorage.
        localStorage.setItem( "user", JSON.stringify( this.user ) );
        // Redirijo al usuario al panel de control.
        this.router.navigate(["/app"]).then(r => console.log("Redirigiendo..."));
      },
      error: (error) => {
        // Muestro un mensaje de error.
        this.showAlert();
        // Elimino las clases de validación de los inputs.
        this.resetInputs();
        // Imprimo detalles del error.
        console.log("Error login: " + JSON.parse(JSON.stringify(error.mensaje)));
      }
    });

  }

  /**
   * Establece la variable a true para mostrar una alerta que de que el login ha fallado.
   */
  showAlert(): void {
    this.alert = true;
  }

  /**
   * Elimina las clases de validación de los inputs y resetea los valores de los inputs.
   */
  resetInputs() {

    const email: any = document.querySelector("#email");
    const password: any = document.querySelector("#passwordInput");
    this.render.removeClass(email, "is-invalid");
    this.render.removeClass(email, "is-valid");
    this.render.removeClass(password, "is-invalid");
    this.render.removeClass(password, "is-valid");
    this.email = "";
    this.password = "";

  }

}
