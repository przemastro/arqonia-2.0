import {Injectable} from '@angular/core';
import {NgClass} from "@angular/common";

@Injectable()
export class WidgetsSetup {

  /** Now define all initial widgets. Initial position and size*/
  public widgets: any[] = [{top: 1, left: 1, height: 13, width: 28}];
  public widgets5: any[] = [{top: 4, left: 1, height: 10, width: 28}];

  /** Let's define diagrams by definings options and data */
  myColors = ["#337ab7"];
}
