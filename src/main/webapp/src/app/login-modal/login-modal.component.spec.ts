import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { LoginModalComponent } from './login-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SecurityService } from "../_services/security.service";
import { OAuthService, UrlHelperService, OAuthLogger } from 'angular-oauth2-oidc';
import { DebugElement } from '@angular/core'

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginModalComponent,
        GenericModalComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        NgbActiveModal,
        SecurityService,
        OAuthService,
        UrlHelperService,
        OAuthLogger
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    /**de = fixture.debugElement.query(By.css('app-generic-modal'));*/
    el = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create the login-modal', () => {
    expect(component).toBeTruthy();
  });

  it('should render modal title Login', () => {
    console.log(el);
    console.log(el.querySelector('app-generic-modal').textContent);
    expect(el.querySelector('app-generic-modal').textContent).toContain('LogIn');
  });

  it('should render login input', () => {
    expect(el.querySelector("input[id='login']"));
  });

});
