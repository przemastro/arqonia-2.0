import { Component, OnInit  } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { User } from '../user';
import { UserService } from '../user.service';
import {OauthService} from "../oauth.service";
import {Observable} from "rxjs";
import {flatMap, map} from "rxjs/internal/operators";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
  providers: [OauthService]
})
export class LoginModalComponent implements OnInit {
/** the array users needs to be initialized firstly [], It will contain values username and password */
/** Array type User is defined in user.ts as a User class */
users: User[] = []; // TODO -> Only username should be stored imho...
isLoggedIn: boolean = false;


constructor(private userService: UserService,
            private activeModal: NgbActiveModal,
            private oauthService: OauthService) { }

  ngOnInit() {
  }

  // TODO Reaction on errors (bad pass etc), because now it is ignored and only displayed in web browser network...
  login(username: string, password: string): void {
    username = username.trim();
    password = password.trim();

    /** call Service loginUser and use values of username and password as array User. loginUser is of type User*/
    this.userService.loginUser({ username, password} as User)
      .subscribe(user => {
        // this.users.push(user);
        this.isLoggedIn = true;
        console.log("Logged user " + "'" + username + "'");
        console.log('is logged in ? ' + this.isLoggedIn);
      },
        () => {},
        () => {
          if (this.isLoggedIn) {
            this.oauthService.obtainAccessTokenV2();
          }
        });

    /**close all active modals after click Login*/
    this.activeModal.close();
  }
}
