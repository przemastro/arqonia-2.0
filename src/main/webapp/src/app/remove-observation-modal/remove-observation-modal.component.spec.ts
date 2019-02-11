import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservationModalComponent } from '../observation-modal/observation-modal.component';
import { RemoveObservationModalComponent } from './remove-observation-modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('RemoveObservationModalComponent', () => {
  let component: RemoveObservationModalComponent;
  let fixture: ComponentFixture<RemoveObservationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
         RemoveObservationModalComponent,
         ObservationModalComponent ],
      providers: [
         NgbActiveModal
         ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveObservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
