import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrometryComponent } from './astrometry.component';

describe('AstrometryComponent', () => {
  let component: AstrometryComponent;
  let fixture: ComponentFixture<AstrometryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstrometryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstrometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the astrometry', () => {
    expect(component).toBeTruthy();
  });
});
