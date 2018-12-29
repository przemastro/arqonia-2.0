import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-series-modal',
  templateUrl: './time-series-modal.component.html',
  styleUrls: ['./time-series-modal.component.css']
})
export class TimeSeriesModalComponent {

timeSeries = [{Flux: '12.3', JulianDate: '124123.24'}];
headTimeSeries = ['Flux', 'JulianDate'];
}
