import {Component, Renderer2} from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {


  // Attributes

  email: string = "";
  subject: string = "";
  message: string = "";
  fileInput: any;
  readonly textValid: string = "Correto!";
  readonly textInvalid: string = "Incorrecto.";


  // Constructor

  constructor( private render: Renderer2 ) { }


  // Methods

  validateForm(): void {

    if ( this.email == "" ) {

      const divEmailErr = document.querySelector("#divEmail");
      const emailErr = document.querySelector("#email");
      const containerDivEmailErr = document.querySelector("#containerDivEmail");
      const divInvalidErr = this.render.createElement("div");
      const textInvalidErr = this.render.createText("Necesitamos tu email para poder comunicarnos contigo.");
      this.render.addClass( divEmailErr, "is-invalid" );
      this.render.addClass( emailErr, "is-invalid" );
      this.render.addClass( divInvalidErr, "invalid-feedback" );
      this.render.appendChild( divInvalidErr, textInvalidErr );
      this.render.appendChild( containerDivEmailErr, divInvalidErr );

    } else {

      this.resetInvalids();
      const divEmailOk = document.querySelector("#divEmail");
      const emailOk = document.querySelector("#email");
      const containerDivEmailOk = document.querySelector("#containerDivEmail");
      const divValidOk = this.render.createElement("div");
      const textValidOk = this.render.createText("Correcto. Gracias!");
      this.render.addClass( divEmailOk, "is-valid" );
      this.render.addClass( emailOk, "is-valid" );
      this.render.addClass( divValidOk, "valid-feedback" );
      this.render.appendChild( divValidOk, textValidOk );
      this.render.appendChild( containerDivEmailOk, divValidOk );

    }

  }

  resetInvalids(): void {



  }

}
