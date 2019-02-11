import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { SignupModalComponent } from './signup-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('SignupModalComponent', () => {
  let component: SignupModalComponent;
  let fixture: ComponentFixture<SignupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
         SignupModalComponent,
         GenericModalComponent
         ],
      imports: [
         HttpClientModule
         ],
      providers: [
         NgbActiveModal
         ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
