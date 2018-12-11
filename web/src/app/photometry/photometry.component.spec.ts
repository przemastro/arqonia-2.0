import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotometryComponent } from './photometry.component';

describe('PhotometryComponent', () => {
  let component: PhotometryComponent;
  let fixture: ComponentFixture<PhotometryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotometryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the photometry', () => {
    expect(component).toBeTruthy();
  });
});
