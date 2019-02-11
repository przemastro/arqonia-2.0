import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { LoginModalComponent } from './login-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {OauthService} from "../oauth.service";

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginModalComponent,
        GenericModalComponent
        ],
      imports: [
        HttpClientModule,
      ],
      providers: [
        NgbActiveModal,
        OauthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create the login-modal', () => {
    expect(component).toBeTruthy();
  });

});
