import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NavComponent } from './components/landing/nav/nav.component';
import { HeroComponent } from './components/landing/hero/hero.component';
import { AppComponent } from './app.component';
import { WhatWeDoComponent } from './components/landing/what-we-do/what-we-do.component';
import { SloganWithIllustrationComponent } from './components/landing/slogan-with-illustration/slogan-with-illustration.component';
import { WhatWeOfferComponent } from './components/landing/what-we-offer/what-we-offer.component';
import { SloganWithIllustration2Component } from './components/landing/slogan-with-illustration2/slogan-with-illustration2.component';
import { WhereUseComponent } from './components/landing/where-use/where-use.component';
import { SloganWithIllustration3Component } from './components/landing/slogan-with-illustration3/slogan-with-illustration3.component';
import { ContactFormComponent } from './components/landing/contact-form/contact-form.component';
import { FooterComponent } from './components/landing/footer/footer.component';
import { AsideAppComponent } from './components/app/aside-app/aside-app.component';
import { NavAppComponent } from './components/app/nav-app/nav-app.component';
import { FooterAppComponent } from './components/app/footer-app/footer-app.component';
import { SigningComponent } from './components/auth/signing/signing.component';
import { AuthGuard } from "./guard/auth.guard";
import { TokenInterceptorService } from "./services/token-interceptor.service";

@NgModule({
  declarations: [
    NavComponent,
    HeroComponent,
    AppComponent,
    WhatWeDoComponent,
    SloganWithIllustrationComponent,
    WhatWeOfferComponent,
    SloganWithIllustration2Component,
    WhereUseComponent,
    ContactFormComponent,
    FooterComponent,
    SloganWithIllustration3Component,
    AsideAppComponent,
    NavAppComponent,
    FooterAppComponent,
    SigningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
