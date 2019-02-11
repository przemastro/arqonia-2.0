import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservationModalComponent } from '../observation-modal/observation-modal.component';
import { TimeSeriesModalComponent } from './time-series-modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('TimeSeriesModalComponent', () => {
  let component: TimeSeriesModalComponent;
  let fixture: ComponentFixture<TimeSeriesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
         TimeSeriesModalComponent,
         ObservationModalComponent
         ],
      providers: [
         NgbActiveModal
         ]
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
