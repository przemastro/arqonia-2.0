import {Component, OnInit} from '@angular/core';
import {LoginModalComponent} from './login-modal/login-modal.component';
import {SignupModalComponent} from './signup-modal/signup-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecurityService} from "./_services/security.service";
import {DataService} from "./_services/data.service";
import {ObjectType} from "./_domain-objects/objects";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SecurityService, DataService]
})
export class AppComponent implements OnInit {

  public objectType: string = '';

  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    private securityService: SecurityService
  ) {
  }

  ngOnInit() {
  }

  sendObject(objectName: string) {
    objectName = objectName.trim();
    let objectType: ObjectType = ObjectType.STAR;

    if (this.objectType === ObjectType.STAR) {
      objectType = ObjectType.STAR
    } else if (this.objectType === ObjectType.COMET) {
      objectType = ObjectType.COMET
    } else if (this.objectType === ObjectType.PLANETOID) {
      objectType = ObjectType.PLANETOID
    }

    this.dataService.searchObject({objectName, objectType});
  }

  selectObjectType(event: any) {
    this.objectType = event.target.value;
  }

  logout() {
    console.log("OAuth log out status...");
    console.log(this.securityService.logout());
  }

  checkIfIsLoggedIn() {
    return this.securityService.isLoggedIn();
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
