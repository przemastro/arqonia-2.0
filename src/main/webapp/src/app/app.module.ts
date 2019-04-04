import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { DiagramsComponent } from './diagrams/diagrams.component';
import { TelescopesComponent } from './telescopes/telescopes.component';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { ObservationModalComponent } from './observation-modal/observation-modal.component';
import { NewObservationModalComponent } from './new-observation-modal/new-observation-modal.component';
import { EditObservationModalComponent } from './edit-observation-modal/edit-observation-modal.component';
import { RemoveObservationModalComponent } from './remove-observation-modal/remove-observation-modal.component';
import { TimeSeriesModalComponent } from './time-series-modal/time-series-modal.component';
import { OAuthModule } from "angular-oauth2-oidc";

import { HttpClientModule } from '@angular/common/http';

import { NvD3Module } from 'ng2-nvd3';
import { NgxWidgetGridModule } from 'ngx-widget-grid';
import 'd3';
import 'nvd3';


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
    DiagramsComponent,
    TelescopesComponent,
    GenericModalComponent,
    LoginModalComponent,
    SignupModalComponent,
    ObservationModalComponent,
    NewObservationModalComponent,
    EditObservationModalComponent,
    RemoveObservationModalComponent,
    TimeSeriesModalComponent,
  ],
  imports: [
    NvD3Module,
    NgxWidgetGridModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    OAuthModule.forRoot()
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
