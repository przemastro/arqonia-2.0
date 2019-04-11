import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {User} from '../_domain-objects/user';
import {UserService} from '../_services/user.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {
  constructor(private userService: UserService,
              private activeModal: NgbActiveModal) {
  }

  errorMessage: string = '';

  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      'emailInput': new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      'passwd': new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      'confirmPasswordInput': new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ])
    })
  }

  get name() {
    return this.signupForm.get('name');
  }
  get emailInput() {
    return this.signupForm.get('emailInput');
  }
  get passwd() {
    return this.signupForm.get('passwd');
  }
  get confirmPasswordInput() {
    return this.signupForm.get('confirmPasswordInput');
  }

  // TODO Add 'roles' parameter (currently if 'roles' is not available, backend will add default value with 'role = USER type'
  startRegisteringNewUser(username: string, email: string, password: string, confirmPassword: string): void {
    username = username.trim();
    email = email.trim();
    password = password.trim();

    this.errorMessage = '';
    this.showErrorMessage();

    // TODO Below (at least) several errors to implement:
    // - reaction, when some empty fields was send to backend (appropriate message for Bad Request 400 or mapping)

    // TODO Reaction of 'login' / 'signup' / 'search' button on enter key ??

    if (password === confirmPassword) {
      this.userService.addUser({username, password, email} as User)
        .subscribe((user) => {
            console.log('Registering new user: ' + user);
          },
          (error) => {
            switch (error.status) {
              case 409 : {
                this.errorMessage = "User with name: '" + username + "' already exists.";
                break;
              }
              default : {
                this.errorMessage = 'Registering process failed. Pleas try again.';
                break;
              }
            }
            this.hideErrorMessage();
          },
          () => {
            this.activeModal.close();

            console.log('New user registered correctly!');
          });
    } else {
      this.errorMessage = "Passwords didn't match. Please try again.";
      this.hideErrorMessage();
    }
  }

  protected hideErrorMessage() {
    setTimeout(function () {
      document.getElementById('errorDiv').style.opacity = '0'
    }, 3000);
  }

  protected showErrorMessage() {
    document.getElementById('errorDiv').style.opacity = '1'
  };
}
