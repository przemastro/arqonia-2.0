import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PhotometryComponent } from './photometry/photometry.component';
import { ReductionComponent } from './reduction/reduction.component';
import { AstrometryComponent } from './astrometry/astrometry.component';
import { ObservationsComponent } from './observations/observations.component';
import { SearchComponent } from './search/search.component';
import { DiagramsComponent } from './diagrams/diagrams.component';
import { TelescopesComponent } from './telescopes/telescopes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    HomeComponent,
    PhotometryComponent,
    ReductionComponent,
    AstrometryComponent,
    ObservationsComponent,
    SearchComponent,
    DiagramsComponent,
    TelescopesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
