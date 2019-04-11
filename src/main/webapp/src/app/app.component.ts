import {Component, Input, OnInit} from '@angular/core';
import {LoginModalComponent} from './login-modal/login-modal.component';
import {SignupModalComponent} from './signup-modal/signup-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecurityService} from "./_services/security.service";
import {DataService} from "./_services/data.service";
import {ObjectInfo, ObjectType} from "./_domain-objects/objects";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SecurityService, DataService]
})
export class AppComponent implements OnInit {

  DEFAULT_OBJECT_TYPE: ObjectType = ObjectType.STAR;

  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    private securityService: SecurityService) {
  }

  public objectType: string = this.DEFAULT_OBJECT_TYPE;

  searchForm: FormGroup;
  searchedObject: string;

  ngOnInit() { // selectSearchTop
    this.searchForm = new FormGroup({
      searchTop: new FormControl(null, [
        Validators.required
      ]),
      selectSearchTop: new FormControl()
    });

    this.searchForm.get('selectSearchTop').setValue(this.DEFAULT_OBJECT_TYPE)
  }

  initSearching(objectName: string, innerObjectType: string) {
    objectName = objectName.trim();

    this.searchedObject = objectName;
    this.objectType = innerObjectType;

    this.dataService.searchObject(new ObjectInfo(objectName, innerObjectType as ObjectType));
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
