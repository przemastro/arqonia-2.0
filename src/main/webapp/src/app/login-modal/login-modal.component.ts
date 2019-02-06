import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {User} from '../user';
import {UserService} from '../user.service';
import {OauthService} from "../oauth.service";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
  providers: [OauthService]
})
export class LoginModalComponent implements OnInit {
  isLoggedIn: boolean = false;
  errorMessage: string = '';

  constructor(private userService: UserService,
              private activeModal: NgbActiveModal,
              private oauthService: OauthService) {
  }

  ngOnInit() {
  }

  login(username: string, password: string): void {
    username = username.trim();
    password = password.trim();

    /** call Service loginUser and use values of username and password as array User. loginUser is of type User*/
    // TODO I think that 'userService.loginUser' should be moved to 'OauthService' (one 'security domain')
    // TODO service name to change: not 'OauthService' but maybe 'SecurityService' ?
    this.userService.loginUser({username, password} as User)
      .subscribe(user => {
          this.isLoggedIn = true;

          console.log("Logged user " + "'" + username + "'");
        },
        (error) => {
         this.errorMessage = error.status === 401 ? 'Wrong username or password. Pleas try again.' : 'error.message';

          console.warn('Error occurred: '+ error.message + ', with status code: ' + error.status);
        },
        () => {
          if (this.isLoggedIn) {
            this.oauthService.obtainAccessToken();

            console.log('OAuth access token obtained successfully!');
          }

          this.activeModal.close();
        });
  }
}
