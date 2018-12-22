import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  message:string;
  comet: boolean = false;
  planetoid: boolean = false;
  star: boolean = false;
  starElements: any;
  cometElements: any;
  planetoidElements: any;

  receiveMessage($event) {
    this.message = $event
    console.log(this.message);

// -------- To be replaced by json values via service
    switch(this.message) {
       case "star": {
          this.star = true;
          this.planetoid = false;
          this.comet = false;
          this.starElements = [
          {Catalog: 'SAO', ObjectName: 'Aldebaran', RA: 'ra', DE: 'de', Umag: 'Umag', Vmag: 'Vmag', Bmag: 'Bmag', BV: 'BV', UB: 'UB', RI: 'RI',
           VI: 'VI', SpectralType: 'SpectralType'}];
          break;
       }
       case "comet": {
          this.comet = true;
          this.star = false;
          this.planetoid = false;
          this.cometElements = [
          {Catalog: 'MPC', ObjectName: 'Halley', Number: 'number', H: 'H absolute magnitude', Epoch: 'JD',
          M: 'Mean anomaly at the epoch, [degrees]', omega: 'Argument of perihelion, J2000.0 [degrees]',
          L: 'Longitude of the ascending node, J2000.0 [degrees]', I: 'Inclination to the ecliptic, J2000.0 [degrees]',
          e: 'Orbital eccentricity', n: 'Mean daily motion, [degrees per day]', a: 'Semimajor axis, [AU]'}];
          break;
       }
       case "planetoid": {
          this.planetoid = true;
          this.star = false;
          this.comet = false;
          this.planetoidElements = [
          {Catalog: 'MPC', ObjectName: 'Ceres', OrbitType: 'Orbit Type', Date: 'Date of perihelion passage',
          PD: 'Perihelion distance [AU]', e: 'Orbital eccentricity', omega: 'Argument of perihelion, J2000.0 [degrees]',
          L: 'Longitude of the ascending node, J2000.0 [degrees]', I: 'Inclination to the ecliptic, J2000.0 [degrees]',
          EpochDate: 'Date of epoch for perturbed solutions', Mag: 'Absolute magnitude'}];
          break;
       }
       default: {
          this.planetoid = false;
          this.star = false;
          this.comet = false;
          break;
       }
    }
//-----------
  }

  headCometElements = ['Catalog', 'ObjectName', 'Number', 'H', 'Epoch', 'M', 'omega', 'L', 'I', 'e', 'n', 'a'];
  headPlanetoidElements = ['Catalog', 'ObjectName', 'OrbitType', 'Date', 'e', 'omega', 'L', 'I', 'EpochDate', 'Mag'];
  headStarElements = ['Catalog', 'ObjectName', 'RA', 'DE', 'Umag', 'Vmag', 'Bmag', 'BV', 'UB', 'RI', 'VI', 'SpectralType'];

}
