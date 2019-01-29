import { Component } from '@angular/core';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  title = 'app';

  constructor(
    private modalService: NgbModal,
    private appService: AppService) {}

  openLogin() {
    const modalRef = this.modalService.open(LoginModalComponent);
    modalRef.componentInstance.title = 'Login';
  }

  login() {
    console.log("OAuth login status...");
    console.log(this.appService.obtainAccessToken());
  }

  logout() {
    console.log("OAuth log out status...");
    console.log(this.appService.logout());
  }

  checkIfIsLoggedIn() {
    return this.appService.isLoggedIn();
  }

  checkTokenStatus() {
    console.log("OAuth token value...");

    if (this.checkIfIsLoggedIn()) {
      console.log(this.appService.logAccessToken());
    } else {
      console.log("Token was not obtained!");
    }
  }

  openSignup() {
    const modalRef = this.modalService.open(SignupModalComponent);
    modalRef.componentInstance.title = 'SignUp';
  }
}
