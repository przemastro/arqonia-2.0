import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservationModalComponent } from '../observation-modal/observation-modal.component';
import { NewObservationModalComponent } from './new-observation-modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('NewObservationModalComponent', () => {
  let component: NewObservationModalComponent;
  let fixture: ComponentFixture<NewObservationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
         NewObservationModalComponent,
         ObservationModalComponent
         ],
      providers: [
         NgbActiveModal
         ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewObservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
