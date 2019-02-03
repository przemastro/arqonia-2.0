import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class OauthService {
 
  constructor(
    private _router: Router, private _http: HttpClient, private oauthService: OAuthService){
        this.oauthService.configure({
            loginUrl: 'https://localhost:8443/oauth/authorize',
            redirectUri: 'https://localhost:8443/',
            clientId: 'sampleClientId',
            scope: 'read write foo bar',
            oidc: false
        });
        this.oauthService.setStorage(sessionStorage);
        this.oauthService.tryLogin({});      
    }
 
  obtainAccessToken(){
    this.oauthService.initImplicitFlow();
  }

  getResource(resourceUrl) : Observable<any>{
    let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer ' + this.oauthService.getAccessToken()});

    return this._http.get(resourceUrl, {headers: headers, observe: 'response'});
  }

  isLoggedIn(){
    return this.oauthService.getAccessToken() !== null;
  }

  logout() {
      this.oauthService.logOut();
      location.reload();
  }

  logAccessToken() {
    console.log(this.oauthService.getAccessToken());
  }
}
