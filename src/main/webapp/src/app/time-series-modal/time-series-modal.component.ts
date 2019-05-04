import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-series-modal',
  templateUrl: './time-series-modal.component.html',
  styleUrls: ['./time-series-modal.component.css']
})
export class TimeSeriesModalComponent {

timeSeries = [{Flux: '12.3', JulianDate: '124123.24', Error: '0.2'},
              {Flux: '12.5', JulianDate: '124124.24', Error: '0.1'},
              {Flux: '11.5', JulianDate: '124125.24', Error: '0.1'},
              {Flux: '12.1', JulianDate: '124126.24', Error: '0.25'},
              {Flux: '12.6', JulianDate: '124127.24', Error: '0.11'},
              {Flux: '12.7', JulianDate: '124128.24', Error: '0.15'},
              {Flux: '12.9', JulianDate: '124129.24', Error: '0.1'},
              {Flux: '12.8', JulianDate: '124130.24', Error: '0.2'},
              {Flux: '12.5', JulianDate: '124131.24', Error: '0.3'},
              {Flux: '12.4', JulianDate: '124132.24', Error: '0.13'},
              {Flux: '12.5', JulianDate: '124133.24', Error: '0.21'}
            ];
headTimeSeries = ['Flux', 'Julian Date', 'Error'];
}
