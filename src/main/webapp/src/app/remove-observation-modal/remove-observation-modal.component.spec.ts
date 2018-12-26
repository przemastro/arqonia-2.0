import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveObservationModalComponent } from './remove-observation-modal.component';

describe('RemoveObservationModalComponent', () => {
  let component: RemoveObservationModalComponent;
  let fixture: ComponentFixture<RemoveObservationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveObservationModalComponent ]
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
