import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';

import {User} from '../_domain-objects/user';
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable(({providedIn: 'root'}) as any)
export class UserService {

  private apiUrl = environment.baseUrl;  // URL to web api

  constructor(
    private http: HttpClient) {
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, user, httpOptions);
  }
}
