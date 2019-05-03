import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxWidgetGridComponent, Rectangle, WidgetPositionChange} from 'ngx-widget-grid';
import {DataService} from "../_services/data.service";
import {AppComponent} from "../app.component";
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
// @ts-ignore
import {WidgetsSetup} from "./config/widgets.setup";
import {DataSetup} from "./config/data.setup";
import {Series} from "./config/series";

declare let d3: any;

@Component({
  selector: 'app-diagrams',
  templateUrl: './diagrams.component.html',
  styleUrls: ['./diagrams.component.css'],
  providers: [WidgetsSetup, DataSetup, Series]
})
export class DiagramsComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  /** Some initial data and frame for Search table */
  message: string;
  objectType: string;

  constructor(private dataService: DataService,
              private appComponent: AppComponent,
              private widgetsSetup: WidgetsSetup,
              private dataSetup: DataSetup) {
  }

  public initSetup = this.widgetsSetup;

  headStarElements: any = [];
  headCometElements: any = [];
  headPlanetoidElements: any = [];
  public dataSet: string = '';
  public data: any = [];


  /** Firstly call and define grid 6x6 */
  @ViewChild('grid') grid: NgxWidgetGridComponent;
  public rows = 28;
  public cols = 28;

  /** We need some basic information what to display */
  public showGrid = false;
  public highlightNextPosition = false;
  private _editable = false;

  public set editable(editable: boolean) {
    this._editable = editable;
    this.showGrid = editable;
  }

  public get editable() {
    return this._editable;
  }

  ngOnInit() {
    this.data = this.dataSetup.timeSeries1;
    this.scatterChartData = [
     {
       data: this.data,
       pointRadius: 2,
       pointBackgroundColor: 'Orange',
       pointBorderColor: 'Orange',
     }
   ];
  }

  toggleHighlight(doHighlight: boolean) {
    this.highlightNextPosition = !!doHighlight;
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

  public series: Series[] = [
    { "id": 1, "name": "Time Series 1" },
    { "id": 2, "name": "Time Series 2" }
  ];

  selectDataSet(ev: any) {
    console.log(ev.target.value);
    this.dataSet = ev.target.value;
    switch(this.dataSet) { 
      case "1": { 
         this.data = this.dataSetup.timeSeries1;
         this.scatterChartData = [
          {
            data: this.data,
            pointRadius: 2,
            pointBackgroundColor: 'Orange',
            pointBorderColor: 'Orange'
          }
        ];
         break; 
      } 
      case "2": { 
        this.data = this.dataSetup.timeSeries2;
        this.scatterChartData = [
          {
            data: this.data,
            pointRadius: 2,
            pointBackgroundColor: 'Orange',
            pointBorderColor: 'Orange'
          }
        ];
         break; 
      } 
    }   
  }


  public scatterChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      displayColors: false
    },
    legend: {
      display: false,
      position: 'right',
      labels: {
        usePointStyle: true,
        fontColor: 'rgb(255, 99, 132)'
      }
    },
    scales:     {
      xAxes: [{
          type:       "time",
          time:       {
              tooltipFormat: 'll'
          },
          scaleLabel: {
              display:     true,
              labelString: 'Date'
          }
      }],
      yAxes: [{
          scaleLabel: {
              display:     true,
              labelString: 'value'
          }
      }]
  }
  };

  public scatterChartData: ChartDataSets[];

  public scatterChartType: ChartType = 'scatter';

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public updateChart() {
    this.chart.chart.update(); // This re-renders the canvas element.
  }
}
