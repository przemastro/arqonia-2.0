import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagrams',
  templateUrl: './diagrams.component.html',
  styleUrls: ['./diagrams.component.css']
})
export class DiagramsComponent implements OnInit {
  comet: boolean = false;
  planetoid: boolean = false;
  star: boolean = true;
  starElements: any;
  cometElements: any;
  planetoidElements: any;

  starElements = [
  {Catalog: 'SAO', ObjectName: 'Aldebaran', RA: '23h 0m 0', DE: '+34 4 4', Umag: '3', Vmag: '4.5', Bmag: '3.3', BV: 'BV', UB: 'UB', RI: 'RI',
   VI: 'VI', SpectralType: 'A0'},
   {Catalog: 'HIP', ObjectName: '12323', RA: '23h 0m 0', DE: '+35 5 4', Umag: '3.1', Vmag: '4.1', Bmag: '3.34', BV: 'BV', UB: 'UB', RI: 'RI',
   VI: 'VI', SpectralType: 'A1'}];
  headStarElements = ['Catalog', 'ObjectName', 'RA', 'DE', 'Umag', 'Vmag', 'Bmag', 'BV', 'UB', 'RI', 'VI', 'SpectralType'];

}
