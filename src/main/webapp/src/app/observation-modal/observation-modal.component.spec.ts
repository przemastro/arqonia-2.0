import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationModalComponent } from './observation-modal.component';

describe('ObservationModalComponent', () => {
  let component: ObservationModalComponent;
  let fixture: ComponentFixture<ObservationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationModalComponent ]
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
