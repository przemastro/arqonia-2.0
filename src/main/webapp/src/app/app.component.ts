import { Component, OnInit } from '@angular/core';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare var $:any;

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
title = 'app';

constructor(private modalService: NgbModal) {}

  openLogin() {
    const modalRef = this.modalService.open(LoginModalComponent);
    modalRef.componentInstance.title = 'Login';
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
