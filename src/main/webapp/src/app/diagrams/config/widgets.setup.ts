import {Injectable} from '@angular/core';
import {NgClass} from "@angular/common";

@Injectable()
export class WidgetsSetup {

  /** Now define all initial widgets. Initial position and size*/
  public widgets: any[] = [{top: 1, left: 1, height: 3, width: 3}];
  public widgets2: any[] = [{top: 4, left: 1, height: 3, width: 2}];
  public widgets3: any[] = [{top: 4, left: 3, height: 3, width: 2}];
  public widgets4: any[] = [{top: 1, left: 4, height: 3, width: 3}];
  public widgets5: any[] = [{top: 4, left: 6, height: 3, width: 2}];


}
