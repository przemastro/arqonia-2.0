import { Component, OnInit  } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
selector: 'app-login-modal',
templateUrl: './login-modal.component.html',
styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
users: User[];

constructor(private userService: UserService,
            private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  login(username: string, password: string): void {
    username = username.trim();
    password = password.trim();
    console.log(username);
    console.log(password);
    this.userService.loginUser({ username, password} as User)
      .subscribe(user => {
        this.users.push(user);
      });
    this.activeModal.close();
  }
}
