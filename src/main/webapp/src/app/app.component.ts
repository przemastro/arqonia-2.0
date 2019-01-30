import { Component, OnInit } from '@angular/core';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {AppService} from "./app.service";
declare var $:any;

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit{
title = 'app';

constructor(
    private modalService: NgbModal,
    private appService: AppService) {}

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

  getForEntity(resourceUrl) {
    this.appService.getResource(resourceUrl)
      .subscribe((response) => {
        console.log(response.body)
      });
  }

  openSignup() {
    const modalRef = this.modalService.open(SignupModalComponent);
    modalRef.componentInstance.title = 'SignUp';
  }

  ngOnInit(){
  var $polystar = $('.polystar');

  $polystar.on('mouseenter focus', function() {
    $polystar.get(0).currentTime = 0;
    $polystar.get(0).play();
    $polystar.prop('muted', true);
  });

  $polystar.on('mouseout blur', function() {
    $polystar.get(0).currentTime = 0;
    $polystar.get(0).pause();
    $polystar.prop('muted', true);
  });
}
}
