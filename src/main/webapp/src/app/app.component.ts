import {Component, OnInit} from '@angular/core';
import {LoginModalComponent} from './login-modal/login-modal.component';
import {SignupModalComponent} from './signup-modal/signup-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecurityService} from "./security.service";
import {DataService} from "./data.service";
declare var $:any;

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css'],
providers: [SecurityService,DataService]
})
export class AppComponent implements OnInit{

public objectType:string = '';


constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    private securityService: SecurityService
    ) {}

  /** search */
  ngOnInit() {
  }

  sendObject(objectName: string) {
    objectName = objectName.trim();
    let objectType:string = this.objectType
    console.log(objectName, objectType);
    this.dataService.searchObject({objectName, objectType});
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
