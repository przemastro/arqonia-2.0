import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {User} from './user';
import {MessageService} from './message.service';
import {Environment} from './environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable(({providedIn: 'root'}) as any)
export class UserService {

  private apiUrl = Environment.baseUrl;  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  addUser(user: User): Observable<User> {
    console.log('SignUp User');
    return this.http.post<User>(`${this.apiUrl}/signup`, user, httpOptions).pipe(
      catchError(this.handleError<User>('SignUpUser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
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
