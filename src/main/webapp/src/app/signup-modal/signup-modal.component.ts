import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {
  errorMessage: string = '';

  hideErrorMessage = () => {
    document.getElementById('errorDiv').style.opacity = '0'
  };
  showErrorMessage = () => {
    document.getElementById('errorDiv').style.opacity = '1'
  };

  constructor(private userService: UserService,
              private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  // TODO Add 'roles' parameter (currently if 'roles' is not available, backend will add default value with 'role = USER type'
  startRegisteringNewUser(username: string, email: string, password: string, confirmPassword: string): void {
    username = username.trim();
    email = email.trim();
    password = password.trim();
    console.log(username);
    console.log(email);
    console.log(password);

    this.errorMessage = '';
    this.showErrorMessage();

    // TODO Below (at least) several errors to implement:
    // - reaction, when user try to register existing 'username'
    // - reaction, when user didn't provide username / password (confirmed pass) / email

    if (password === confirmPassword) {
      this.userService.addUser({username, password, email} as User)
        .subscribe((user) => {
            console.log('Registering new user: ' + user);
          },
          (error) => {
            this.errorMessage = error.status !== 201 ? 'Registering process failed. Pleas try again.' : '';
            this.disappearingErrorMessageById('errorDiv');

            console.warn('Error occurred: ' + error.message + ', with status code: ' + error.status);
          },
          () => {
            this.activeModal.close();

            console.log('New user registered correctly!');
          });
    } else {
      this.errorMessage = "Passwords didn't match. Please try again.";
    }
  }

  protected disappearingErrorMessageById(id: string) {
    setTimeout(this.hideErrorMessage, 3000);
  }
}
