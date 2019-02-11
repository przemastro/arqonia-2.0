import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxWidgetGridComponent, WidgetPositionChange } from 'ngx-widget-grid';
import { NgxWidgetGridModule } from 'ngx-widget-grid';
import { DiagramsComponent } from './diagrams.component';
import { NvD3Module } from 'ng2-nvd3';
import 'd3';
import 'nvd3';

describe('DiagramsComponent', () => {
  let component: DiagramsComponent;
  let fixture: ComponentFixture<DiagramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          DiagramsComponent
          ],
      imports: [
          NgxWidgetGridModule,
          NvD3Module
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the diagrams', () => {
    expect(component).toBeTruthy();
  });
});
