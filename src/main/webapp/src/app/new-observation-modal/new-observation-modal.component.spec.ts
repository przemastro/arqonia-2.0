import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewObservationModalComponent } from './new-observation-modal.component';

describe('NewObservationModalComponent', () => {
  let component: NewObservationModalComponent;
  let fixture: ComponentFixture<NewObservationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewObservationModalComponent ]
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
