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
    this.userService.loginUser({username, password} as User)
      .subscribe(user => {
          this.isLoggedIn = true;
          console.log("Logged user " + "'" + username + "'");
        },
        (error) => {
          console.log(error.message); // TODO This error message should be passed to the login modal frontend in case of wrong logging process !
        },
        () => {
          if (this.isLoggedIn) {
            this.oauthService.obtainAccessTokenV2();
          }
        });

    /**close all active modals after click Login*/
    this.activeModal.close();
  }
}
