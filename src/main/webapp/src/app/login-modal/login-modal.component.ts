import { Component, OnInit  } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { User } from '../user';
import { UserService } from '../user.service';
import {OauthService} from "../oauth.service";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
  providers: [OauthService]
})
export class LoginModalComponent implements OnInit {
/** the array users needs to be initialized firstly [], It will contain values username and password */
/** Array type User is defined in user.ts as a User class */
users: User[] = [];

constructor(private userService: UserService,
            private activeModal: NgbActiveModal,
            private oauthService: OauthService) { }

  ngOnInit() {
  }

  login(username: string, password: string): void {
    username = username.trim();
    password = password.trim();
    console.log(username);
    console.log(password);
    /** call Service loginUser and use values of username and password as array User. loginUser is of type User*/
    this.userService.loginUser({ username, password} as User)
      .subscribe(user => {
        this.users.push(user);
      });
    // TODO Neede workaorund, becase it will open Spring Login Page (and doesn't matter if user was logged or not with out login modal)
    // this.oauthService.obtainAccessToken();
    /**close all active modals after click Login*/
    this.activeModal.close();
  }
}
