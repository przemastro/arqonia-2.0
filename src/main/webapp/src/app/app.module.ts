import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }   from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ObservationModalComponent } from './observation-modal/observation-modal.component';
import { NewObservationModalComponent } from './new-observation-modal/new-observation-modal.component';
import { EditObservationModalComponent } from './edit-observation-modal/edit-observation-modal.component';
import { RemoveObservationModalComponent } from './remove-observation-modal/remove-observation-modal.component';
import { TimeSeriesModalComponent } from './time-series-modal/time-series-modal.component';

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
    TelescopesComponent,
    GenericModalComponent,
    LoginModalComponent,
    SignupModalComponent,
    SearchFormComponent,
    ObservationModalComponent,
    NewObservationModalComponent,
    EditObservationModalComponent,
    RemoveObservationModalComponent,
    TimeSeriesModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginModalComponent,
    SignupModalComponent,
    NewObservationModalComponent,
    EditObservationModalComponent,
    RemoveObservationModalComponent,
    TimeSeriesModalComponent
  ]
})
export class AppModule { }
