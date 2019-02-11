import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservationModalComponent } from '../observation-modal/observation-modal.component';
import { EditObservationModalComponent } from './edit-observation-modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('EditObservationModalComponent', () => {
  let component: EditObservationModalComponent;
  let fixture: ComponentFixture<EditObservationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          EditObservationModalComponent,
          ObservationModalComponent
          ],
      providers: [
         NgbActiveModal
         ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditObservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
