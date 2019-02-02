import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { NewUser } from '../User';
import { UserService } from '../user.service';
@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {
newUsers: NewUser[];

constructor(private userService: UserService,
            private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  add(username: string, email: string, password: string, confirmPassword: string): void {
    username = username.trim();
    email = email.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);
    this.userService.addUser({ username, email, password, confirmPassword} as NewUser)
      .subscribe(newUser => {
        this.newUsers.push(newUser);
      });
    this.activeModal.close();
  }
}
