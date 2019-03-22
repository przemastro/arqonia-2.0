import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {User} from '../_domain-objects/user';
import {SecurityService} from "../_services/security.service";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
  providers: [SecurityService]
})
export class LoginModalComponent implements OnInit {
  isLoggedIn: boolean = false;
  errorMessage: string = '';

  constructor(private activeModal: NgbActiveModal,
              private securityService: SecurityService) {
  }

  ngOnInit() {
  }

  startProcessLogin(username: string, password: string): void {
    username = username.trim();
    password = password.trim();
    this.errorMessage = '';
    this.showErrorMessage();

    /** call Service loginUser and use values of username and password as array User. loginUser is of type User*/
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
