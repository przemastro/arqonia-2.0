import { Component, OnInit } from '@angular/core';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {SecurityService} from "./security.service";
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SecurityService]
})
export class AppComponent implements OnInit{
title = 'app';

constructor(
    private modalService: NgbModal,
    private securityService: SecurityService) {}

  login() {
    console.log("OAuth login status...");
    console.log(this.securityService.obtainAccessToken());
  }

  logout() {
    console.log("OAuth log out status...");
    console.log(this.securityService.logout());
  }

  checkIfIsLoggedIn() {
    return this.securityService.isLoggedIn();
  }

  checkTokenStatus() {
    console.log("OAuth token value...");

    if (this.checkIfIsLoggedIn()) {
      console.log(this.securityService.logAccessToken());
    } else {
      console.log("Token was not obtained!");
    }
  }

  getForEntity(resourceUrl) {
    this.securityService.getResource(resourceUrl)
      .subscribe((response) => {
        console.log(response.body)
      });
  }

  /** open Modals by calling modalService */
  openLogin() {
    const modalRef = this.modalService.open(LoginModalComponent);
    modalRef.componentInstance.title = 'Login';
  }

  openSignup() {
    const modalRef = this.modalService.open(SignupModalComponent);
    modalRef.componentInstance.title = 'SignUp';
  }

  ngOnInit(){
}
}
