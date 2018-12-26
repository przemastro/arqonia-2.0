import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditObservationModalComponent } from './edit-observation-modal.component';

describe('EditObservationModalComponent', () => {
  let component: EditObservationModalComponent;
  let fixture: ComponentFixture<EditObservationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditObservationModalComponent ]
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
