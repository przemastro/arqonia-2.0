import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSeriesModalComponent } from './time-series.component';

describe('TimeSeriesModalComponent', () => {
  let component: TimeSeriesModalComponent;
  let fixture: ComponentFixture<TimeSeriesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSeriesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSeriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
