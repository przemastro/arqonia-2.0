import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User, NewUser } from './user';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable(({providedIn:'root'}) as any)
export class UserService {


  private apiUrl = 'https://localhost:8443';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Is used by loginModalComponent */
  loginUser (user: User): Observable<User> {
    console.log('Login User');

    let formData = [user].map(user => "username=" + user.username + "&password=" + user.password).pop();

    return this.http.post<User>(`${this.apiUrl}/login`, formData,
      { responseType: 'json', headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}},
      );
  }

  addUser (newUser: NewUser): Observable<NewUser> {
     console.log('SignUp User');
    return this.http.post<NewUser>(`${this.apiUrl}/signup`, newUser, httpOptions).pipe(
      catchError(this.handleError<NewUser>('SignUpUser'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}
