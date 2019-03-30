import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {User} from '../_domain-objects/user';
import {SecurityService} from "../_services/security.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
  providers: [SecurityService]
})
export class LoginModalComponent implements OnInit {
  constructor(private activeModal: NgbActiveModal,
              private securityService: SecurityService) {
  }

  isLoggedIn: boolean = false;
  errorMessage: string = '';

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'login': new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      'passwd': new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ])
    })
  }

  get login() {
    return this.loginForm.get('login');
  }
  get passwd() {
    return this.loginForm.get('passwd');
  }

  startProcessLogin(username: string, password: string): void {
    username = username.trim();
    password = password.trim();
    this.errorMessage = '';
    this.showErrorMessage();

    this.securityService.loginUser({username, password} as User)
      .subscribe(() => {
          this.isLoggedIn = true;

          console.log("Logged user " + "'" + username + "'");
        },
        (error) => {
          this.errorMessage = error.status === 401 ? 'Wrong username or password. Pleas try again.' : error.message;
          this.hideErrorMessage();

          console.warn('Error occurred: ' + error.message + ', with status code: ' + error.status);
        },
        () => {
          if (this.isLoggedIn) {
            this.securityService.obtainAccessToken();

            console.log('OAuth access token obtained successfully!');
          }

          this.activeModal.close();
        });
  }

  protected hideErrorMessage() {
    setTimeout(function () {
      document.getElementById('errorDiv').style.opacity = '0'
    }, 3000);
  }

  protected showErrorMessage() {
    document.getElementById('errorDiv').style.opacity = '1';
  }

}
