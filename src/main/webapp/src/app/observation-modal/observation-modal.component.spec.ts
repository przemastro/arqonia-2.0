import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservationModalComponent } from './observation-modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ObservationModalComponent', () => {
  let component: ObservationModalComponent;
  let fixture: ComponentFixture<ObservationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
         ObservationModalComponent
         ],
      providers: [
         NgbActiveModal
         ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
