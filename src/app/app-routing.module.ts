import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guard/auth.guard";

// LANDING

import { NavComponent } from './components/landing/nav/nav.component';
import { HeroComponent } from './components/landing/hero/hero.component';
import { WhatWeDoComponent } from './components/landing/what-we-do/what-we-do.component';
import { SloganWithIllustrationComponent }
  from './components/landing/slogan-with-illustration/slogan-with-illustration.component';
import { WhatWeOfferComponent } from './components/landing/what-we-offer/what-we-offer.component';
import { SloganWithIllustration2Component }
  from './components/landing/slogan-with-illustration2/slogan-with-illustration2.component';
import { WhereUseComponent } from './components/landing/where-use/where-use.component';
import { SloganWithIllustration3Component }
  from './components/landing/slogan-with-illustration3/slogan-with-illustration3.component';
import { ContactFormComponent } from './components/landing/contact-form/contact-form.component';
import { FooterComponent } from './components/landing/footer/footer.component';

// SIGNING

import { SigningComponent } from './components/auth/signing/signing.component';

// APP

import { NavAppComponent } from './components/app/nav-app/nav-app.component';
import { MainAppComponent } from './components/app/main-app/main-app.component'
import { FooterAppComponent } from './components/app/footer-app/footer-app.component';
import { SectionAppComponent } from './components/app/section-app/section-app.component';


const routes: Routes = [
  { path: "",
    children: [
      { path: "", component: NavComponent, outlet: "nav" },
      { path: "", component: HeroComponent, outlet: "hero" },
      { path: "", component: WhatWeDoComponent, outlet: "what-we-do" },
      { path: "", component: SloganWithIllustrationComponent, outlet: "slogan-with-illustration" },
      { path: "", component: WhatWeOfferComponent, outlet: "what-we-offer" },
      { path: "", component: SloganWithIllustration2Component, outlet: "slogan-with-illustration2" },
      { path: "", component: WhereUseComponent, outlet: "where-use" },
      { path: "", component: SloganWithIllustration3Component, outlet: "slogan-with-illustration3" },
      { path: "", component: ContactFormComponent, outlet: "contact-form" },
      { path: "", component: FooterComponent, outlet: "footer" },
    ]},
  { path: "auth",
    children: [
      { path:"", component: SigningComponent, outlet: "signing" }
    ]},
  {
    path: "app",
    canActivateChild: [ AuthGuard ],
    children: [
      { path: "", component: NavAppComponent, outlet: "nav-app" },
      { path: "", component: MainAppComponent, outlet: "main-app",  },
      { path: "", component: FooterAppComponent, outlet: "footer-app" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
