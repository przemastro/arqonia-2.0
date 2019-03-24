import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {OAuthService} from 'angular-oauth2-oidc';
import {User} from "./user";
import {Environment} from './environment';

@Injectable()
export class SecurityService {
 
  constructor(
    private http: HttpClient,
    private _router: Router, private _http: HttpClient, private oauthService: OAuthService){
        this.oauthService.configure({
            loginUrl: Environment.baseUrl+'/oauth/authorize',
            redirectUri: Environment.baseUri,
            clientId: 'sampleClientId',
            scope: 'read write foo bar',
            oidc: false
        });
        this.oauthService.setStorage(sessionStorage);
        this.oauthService.tryLogin({});      
    }

  private apiUrl = Environment.baseUrl;  // URL to web api

  loginUser(user: User): Observable<User> {
    console.log('Login User');

    let formData = [user].map(user => "username=" + user.username + "&password=" + user.password).pop();

    return this.http.post<User>(`${this.apiUrl}/login`, formData,
      { responseType: 'json', headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}},
    );
  }

  logout() {
    this.oauthService.logOut();
    location.reload();
  }

  obtainAccessToken(){
    this.oauthService.initImplicitFlow();
  }

  isLoggedIn(){
    return this.oauthService.getAccessToken() !== null;
  }

  getResource(resourceUrl) : Observable<any>{
    let headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });

    return this._http.get(resourceUrl, {headers: headers, observe: 'response'});
  }

  logAccessToken() {
    console.log(this.oauthService.getAccessToken());
  }

}
