import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxWidgetGridComponent, Rectangle, WidgetPositionChange} from 'ngx-widget-grid';
import {DataService} from "../_services/data.service";
import {AppComponent} from "../app.component";
// @ts-ignore
import {WidgetsSetup} from "./config/widgets.setup";

declare let d3: any;

@Component({
  selector: 'app-diagrams',
  templateUrl: './diagrams.component.html',
  styleUrls: ['./diagrams.component.css'],
  providers: [WidgetsSetup]
})
export class DiagramsComponent implements OnInit {

  /** Some initial data and frame for Search table */
  message: string;
  objectType: string;

  constructor(private dataService: DataService,
              private appComponent: AppComponent,
              private widgetsSetup: WidgetsSetup) {
  }

  public initSetup = this.widgetsSetup;

  headStarElements: any = [];
  headCometElements: any = [];
  headPlanetoidElements: any = [];


  /** Firstly call and define grid 6x6 */
  @ViewChild('grid') grid: NgxWidgetGridComponent;
  public rows = 6;
  public cols = 6;

  /** We need some basic information what to display */
  public showGrid = false;
  public highlightNextPosition = false;
  private _editable = true;

  public set editable(editable: boolean) {
    this._editable = editable;
    this.showGrid = editable;
  }

  public get editable() {
    return this._editable;
  }

  ngOnInit() { }

  toggleHighlight(doHighlight: boolean) {
    this.highlightNextPosition = !!doHighlight;
  }

  /** Add new widget */
  addWidget() {
    const nextPosition = this.grid.getNextPosition();
    if (nextPosition) {
      this.initSetup.widgets.push({...nextPosition});
    } else {
      console.warn('No Space Available!! ');
    }
  }

  /** Remove widget */
  askDeleteWidget(index) {
    console.log('deleting', index);
    this.initSetup.widgets.splice(index, 1);
  }

  deleteWidget() {
  }

  onWidgetChange(event: WidgetPositionChange) {
  }

  doRows(add: boolean) {
    if (add) {
      this.rows++;
    } else {
      if (this.rows > 1) {
        this.rows--;
      }
    }
  }

  doCols(add: boolean) {
    if (add) {
      this.cols++;
    } else {
      if (this.cols > 1) {
        this.cols--;
      }
    }
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const random = Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
    return random;
  }

  public onGridFull(e) {
    console.log(e);
  }
}
