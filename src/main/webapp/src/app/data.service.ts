import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

private objectFlagSource = new BehaviorSubject(false);
private objectSource = new BehaviorSubject('');
private objectHeaderSource = new BehaviorSubject('');
private objectDataSource = new BehaviorSubject([]);
currentObjectFlag = this.objectFlagSource.asObservable();
currentObjectType = this.objectSource.asObservable();
currentObjectHeader = this.objectHeaderSource.asObservable();
currentObjectData = this.objectDataSource.asObservable();
flag:boolean;

constructor() { }

  starElements = [
          {Catalog: 'SAO', ObjectName: 'Aldebaran', RA: '23h 0m 0', DE: '+34 4 4', Umag: '3', Vmag: '4.5', Bmag: '3.3', BV: 'BV', UB: 'UB', RI: 'RI', VI: 'VI', SpectralType: 'A0'},
          {Catalog: 'HIP', ObjectName: '12323', RA: '23h 0m 0', DE: '+35 5 4', Umag: '3.1', Vmag: '4.1', Bmag: '3.34', BV: 'BV', UB: 'UB', RI: 'RI', VI: 'VI', SpectralType: 'A1'},
          {Catalog: 'TYC2', ObjectName: '345435', RA: '23h 0m 0', DE: '+35 5 4', Umag: '3.6', Vmag: '4.4', Bmag: '3.34', BV: 'BV', UB: 'UB', RI: 'RI', VI: 'VI', SpectralType: 'A1'},
          {Catalog: 'HD', ObjectName: '153453', RA: '23h 0m 0', DE: '+35 5 4', Umag: '3.3', Vmag: '4.3', Bmag: '3.34', BV: 'BV', UB: 'UB', RI: 'RI', VI: 'VI', SpectralType: 'A1'},
          {Catalog: 'HR', ObjectName: '123455', RA: '23h 0m 0', DE: '+35 5 4', Umag: '3.1', Vmag: '4.4', Bmag: '3.4', BV: 'BV', UB: 'UB', RI: 'RI', VI: 'VI', SpectralType: 'A1'},
          ]
  cometElements = [
          {Catalog: 'MPC', ObjectName: 'Halley', Number: 'number', H: 'H absolute magnitude', Epoch: 'JD',
          M: 'Mean anomaly at the epoch, [degrees]', omega: 'Argument of perihelion, J2000.0 [degrees]',
          L: 'Longitude of the ascending node, J2000.0 [degrees]', I: 'Inclination to the ecliptic, J2000.0 [degrees]',
          e: 'Orbital eccentricity', n: 'Mean daily motion, [degrees per day]', a: 'Semimajor axis, [AU]'}];
  planetoidElements = [
          {Catalog: 'MPC', ObjectName: 'Ceres', OrbitType: 'Orbit Type', Date: 'Date of perihelion passage',
          PD: 'Perihelion distance [AU]', e: 'Orbital eccentricity', omega: 'Argument of perihelion, J2000.0 [degrees]',
          L: 'Longitude of the ascending node, J2000.0 [degrees]', I: 'Inclination to the ecliptic, J2000.0 [degrees]',
          EpochDate: 'Date of epoch for perturbed solutions', Mag: 'Absolute magnitude'}];

  headCometElements = ['Catalog', 'ObjectName', 'Number', 'H', 'Epoch', 'M', 'omega', 'L', 'I', 'e', 'n', 'a'];
  headPlanetoidElements = ['Catalog', 'ObjectName', 'OrbitType', 'Date', 'e', 'omega', 'L', 'I', 'EpochDate', 'Mag'];
  headStarElements = ['Catalog', 'ObjectName', 'RA', 'DE', 'Umag', 'Vmag', 'Bmag', 'BV', 'UB', 'RI', 'VI', 'SpectralType'];

  object:any = [];
  objectHeader:any = [];
  objectName:string = '';
  star: boolean = false;
  comet: boolean = false;
  planetoid: boolean = false;

  changeObjectFlag(objectType: string, objectName: string) {
    this.objectFlagSource.next(this.getObjectFlag(objectType))
  }

  changeData(objectType: string, objectName: string) {
    this.objectDataSource.next(this.getObject(objectType));
  }

  changeHeader(objectType: string) {
    /**this.objectHeaderSource.next(this.getHeader(objectType));*/
  }

  getHeader(objectType: string) {
    console.log('objectType', objectType);
    switch(objectType) {
      case "star": {
        console.log(this.headStarElements);
        return this.headStarElements;
      }
      case "comet": {
        console.log(this.headCometElements);
        return this.headCometElements;
      }
      case "planetoid": {
        console.log(this.headPlanetoidElements);
        return this.headPlanetoidElements;
      }
    }
  }

  getObject(objectType: string) {
    switch(objectType) {
      case "star": {
        console.log(this.starElements);
        return this.starElements;
      }
      case "comet": {
        console.log(this.starElements);
        return this.cometElements;
      }
      case "planetoid": {
        console.log(this.starElements);
        return this.planetoidElements;
      }
    }
  }

  getObjectFlag(objectType: string) {
    switch(objectType) {
      case "star": {
        this.star = true;
        return this.star;
        break;
      }
      case "comet": {
        this.comet = true;
        return this.comet;
        break;
      }
      case "planetoid": {
        this.planetoid = true;
        return this.planetoid;
        break;
      }
    }
  }
}
