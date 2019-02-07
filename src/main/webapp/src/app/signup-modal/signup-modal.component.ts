import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { User } from '../user';
import { UserService } from '../user.service';
@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {
// newUsers: User[];

constructor(private userService: UserService,
            private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  // TODO Add 'roles' parameter (currently if 'roles' is not available, backend will add default value with 'role = USER type'
  add(username: string, email: string, password: string): void {
    username = username.trim();
    email = email.trim();
    password = password.trim();
    // confirmPassword = confirmPassword.trim(); // TODO Should be requested to separate endpoint
    console.log(username);
    console.log(email);
    console.log(password);

    this.userService.addUser({ username, password, email } as User)
      .subscribe(user => {
        console.log('Registering new user: ' + user);
      },
        () => {},
        () => {});
    this.activeModal.close();
  }
}
