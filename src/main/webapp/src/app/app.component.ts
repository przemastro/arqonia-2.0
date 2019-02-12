import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {SecurityService} from "./security.service";
import { DataService } from "./data.service";
declare var $:any;

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css'],
providers: [SecurityService,DataService]
})
export class AppComponent implements OnInit{

message:string;
flag:boolean;
headStarElements:any = [];
starElements:any = [];
public objectType:string;
public objectName:string;

constructor(
    private modalService: NgbModal,
    private data: DataService,
    private securityService: SecurityService
    ) {}


  /** search */
  ngOnInit() {
    this.data.currentObjectFlag.subscribe(flag => this.flag = flag);
    this.data.currentObjectType.subscribe(headStarElements => this.headStarElements = headStarElements)
    this.data.currentObjectData.subscribe(starElements => this.starElements = starElements)
  }

  sendObject(object: string) {
    this.objectName = object.trim();
    console.log(object, this.objectType);
    this.data.changeHeader(this.objectType);
    this.data.changeObjectFlag(this.objectType, this.objectName);
    this.data.changeData(this.objectType, this.objectName);
  }

  selectObjectType (event: any) {
    this.objectType = event.target.value;
  }

/** */

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

}

export class Search {
  constructor( public name: string) {}
}
