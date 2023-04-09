import { Component } from '@angular/core';

@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.css']
})
export class WhatWeDoComponent {


  // Attributes


  imageBlack = "../../../../../assets/img/black.jpg";
  imageBlue = "../../../../../assets/img/blue.jpg";
  imageSelected = true;


  // Métodos


  viewImageOne(): void {
    this.imageSelected = true;
  }

  viewImageTwo(): void {
    this.imageSelected = false;
  }


}
