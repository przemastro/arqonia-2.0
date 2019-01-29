import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PhotometryComponent } from './photometry/photometry.component';
import { DiagramsComponent } from './diagrams/diagrams.component';
import { SearchComponent } from './search/search.component';
import { ObservationsComponent } from './observations/observations.component';
import { ReductionComponent } from './reduction/reduction.component';

const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'about', component: AboutComponent },
{ path: 'photometry', component: PhotometryComponent },
{ path: 'reduction', component: ReductionComponent },
{ path: 'observations', component: ObservationsComponent },
{ path: 'diagrams', component: DiagramsComponent },
{ path: 'search', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
