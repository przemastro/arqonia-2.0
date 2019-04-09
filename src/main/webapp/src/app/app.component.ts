import {Component, OnInit} from '@angular/core';
import {LoginModalComponent} from './login-modal/login-modal.component';
import {SignupModalComponent} from './signup-modal/signup-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecurityService} from "./_services/security.service";
import {DataService} from "./_services/data.service";
import {ObjectType} from "./_domain-objects/objects";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SecurityService, DataService]
})
export class AppComponent implements OnInit {

  static readonly DEFAULT_OBJECT_TYPE = ObjectType.STAR;

  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    private securityService: SecurityService,
    private spinner: NgxSpinnerService
  ) {
  }

  public objectType: string = AppComponent.DEFAULT_OBJECT_TYPE;

  searchForm: FormGroup;
  searchedObject: string;

  ngOnInit() { // selectSearchTop
    this.searchForm = new FormGroup({
      searchTop: new FormControl(null, [
        Validators.required
      ]),
      selectSearchTop: new FormControl()
    });

    this.searchForm.get('selectSearchTop').setValue(AppComponent.DEFAULT_OBJECT_TYPE)
  }

  initSearching(objectName: string) {
    objectName = objectName.trim();
    this.searchedObject = objectName;
    this.spinner.show();

    let objectType: ObjectType = AppComponent.DEFAULT_OBJECT_TYPE;

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
