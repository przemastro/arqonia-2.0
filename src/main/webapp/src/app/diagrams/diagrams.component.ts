import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxWidgetGridComponent, WidgetPositionChange} from 'ngx-widget-grid';
import {DataService} from "../data.service";
import {AppComponent} from "../app.component";
declare let d3: any;

@Component({
selector: 'app-diagrams',
templateUrl: './diagrams.component.html',
styleUrls: ['./diagrams.component.css']
})
export class DiagramsComponent implements OnInit {

/** Some initial data and frame for Search table */
message:string;
objectType:string;

constructor(private dataService: DataService,
            private appComponent: AppComponent) { }

headStarElements:any = [];
headCometElements:any = [];
headPlanetoidElements:any = [];


/** Firstly call and define grid 6x6 */
@ViewChild('grid') grid: NgxWidgetGridComponent;
public rows = 6;
public cols = 6;

/** Now define all initial widgets. Initial position and size*/
public widgets: any[] = [{top: 1, left: 1, height: 3, width: 3}];
public widgets2: any[] = [{top: 4, left: 1, height: 3, width: 2}];
public widgets3: any[] = [{top: 4, left: 3, height: 3, width: 2}];
public widgets4: any[] = [{top: 1, left: 4, height: 3, width: 3}];
public widgets5: any[] = [{top: 4, left: 6, height: 3, width: 2}];

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

/** Let's define diagrams by definings options and data */
options5;
data5;

options2;
data2;

options3;
data3;

options4;
data4;


ngOnInit() {

var myColors = ["#337ab7"];

this.options4 = {
  "chart": {"type": "candlestickBarChart", "height": 200, "width": 200,
    "margin": { "top": 20, "right": 20, "bottom": 40, "left": 60}, "duration": 100,
      "xAxis": {"axisLabel": "Dates", "showMaxMin": false}, "yAxis": {"axisLabel": "Stock Price", "showMaxMin": false},
      "zoom": {"enabled": true, "scaleExtent": [1, 10], "useFixedDomain": false, "useNiceScale": false, "horizontalOff": false,
               "verticalOff": true, "unzoomEventType": "dblclick.zoom"}
  }
}
this.data4 = [{values: [
  {"date": 15854, "open": 165.42, "high": 165.8, "low": 164.34, "close": 165.22, "volume": 160363400, "adjusted": 164.35},
  {"date": 15953, "open": 165.85, "high": 166.4, "low": 165.73, "close": 165.96, "volume": 62930500, "adjusted": 165.96}
]}];


this.options3 = {
  "chart": {"type": "historicalBarChart", "height": 200, "width": 200,
    "margin": {"top": 20, "right": 20, "bottom": 65, "left": 50}, "showValues": true, "duration": 100,
      "xAxis": {"axisLabel": "X Axis", "rotateLabels": 30, "showMaxMin": false},
      "yAxis": {"axisLabel": "Y Axis", "axisLabelDistance": 10}, "tooltip": {},
      "zoom": {"enabled": true, "scaleExtent": [1, 10], "useFixedDomain": false, "useNiceScale": false, "horizontalOff": false, "verticalOff": true,
               "unzoomEventType": "dblclick.zoom"}
  }
}
this.data3 = [
  {"key" : "Quantity", "bar": true, "values" : [ [ 1136 , 1271.0] , [ 11380 , 1271.0] , [ 1293 , 1331.0] , [ 1296 , 1154.0]]}
];


this.options2 = {
   "chart": {"type": "boxPlotChart", "height": 200, "width": 200,
      "margin": {"top": 20, "right": 20, "bottom": 30, "left": 50},
      "title": {"enable": true, "text": "Write Your Title", "className": "h4", "css": {"width": "nullpx", "textAlign": "center"}},
      "color": ["darkblue", "darkorange", "green", "darkred", "darkviolet"], "maxBoxWidth": 15, "yDomain": [0, 500]
   }
}
this.data2 = [
  {label: "Sample A", values: {Q1: 180, Q2: 200, Q3: 250, whisker_low: 115, whisker_high: 400}},
  {label: "Sample B", values: {Q1: 300, Q2: 350, Q3: 400, whisker_low: 225, whisker_high: 425}}
];

this.options5 = {
    chart: {type: 'discreteBarChart', height: 200, width: 300,
      margin : {top: 20, right: 20, bottom: 50, left: 55},
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        color: d3.scale.category10().range(myColors), showValues: true,
        valueFormat: function(d){return d3.format(',.0f')(d);}, duration: 500,
        xAxis: {axisLabel: 'Filter'},
        yAxis: {axisLabel: 'Y Axis', axisLabelDistance: 50}}
    }
this.data5 = [
  {key: "Cumulative Return",
   values: [{"label" : "U" ,"value" : 125}, {"label" : "V", "value" : 45}, {"label" : "B", "value" : 28},
            {"label" : "R", "value" : 1}, {"label" : "I", "value" : 3}]
  }];
}

toggleHighlight(doHighlight: boolean) {
    this.highlightNextPosition = !!doHighlight;
  }

/** Add new widget */
  addWidget() {
    const nextPosition = this.grid.getNextPosition();
    if (nextPosition) {
      this.widgets.push({ ...nextPosition});
    } else {
      console.warn('No Space Available!! ');
    }
  }

/** Remove widget */
  askDeleteWidget(index) {
    console.log('deleting', index);
    this.widgets.splice(index, 1);
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
