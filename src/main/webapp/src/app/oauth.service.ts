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

  obtainAccessTokenV2(){
    this.createLoginUrl()
      .then(function (url) {
        location.href = url;
      })
      .catch(error => {
        console.error('Error in initImplicitFlow', error);
      });
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

  protected createLoginUrl(
    state = '',
    loginHint = '',
    customRedirectUri = '',
    noPrompt = false,
    params: object = {}
  ) {
    let redirectUri: string;

    if (customRedirectUri) {
      redirectUri = customRedirectUri;
    } else {
      redirectUri = this.oauthService.redirectUri;
    }

    return this.oauthService.createAndSaveNonce().then((nonce: any) => {
      state = nonce;

      if (!this.oauthService.requestAccessToken && !this.oauthService.oidc) {
        throw new Error(
          'Either requestAccessToken or oidc or both must be true'
        );
      }

      if (this.oauthService.oidc && this.oauthService.requestAccessToken) {
        this.oauthService.responseType = 'id_token token';
      } else if (this.oauthService.oidc && !this.oauthService.requestAccessToken) {
        this.oauthService.responseType = 'id_token';
      } else {
        this.oauthService.responseType = 'token';
      }

      const seperationChar = this.oauthService.loginUrl.indexOf('?') > -1 ? '&' : '?';

      let scope = this.oauthService.scope;

      if (this.oauthService.oidc && !scope.match(/(^|\s)openid($|\s)/)) {
        scope = 'openid ' + scope;
      }

      let url =
        this.oauthService.loginUrl +
        seperationChar +
        'response_type=' +
        encodeURIComponent(this.oauthService.responseType) +
        '&client_id=' +
        encodeURIComponent(this.oauthService.clientId) +
        '&state=' +
        encodeURIComponent(state) +
        '&redirect_uri=' +
        encodeURIComponent(redirectUri) +
        '&scope=' +
        encodeURIComponent(scope);

      if (loginHint) {
        url += '&login_hint=' + encodeURIComponent(loginHint);
      }

      if (this.oauthService.resource) {
        url += '&resource=' + encodeURIComponent(this.oauthService.resource);
      }

      if (this.oauthService.oidc) {
        url += '&nonce=' + encodeURIComponent(nonce);
      }

      if (noPrompt) {
        url += '&prompt=none';
      }

      for (const key of Object.keys(params)) {
        url +=
          '&' + encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      }

      if (this.oauthService.customQueryParams) {
        for (const key of Object.getOwnPropertyNames(this.oauthService.customQueryParams)) {
          url +=
            '&' + key + '=' + encodeURIComponent(this.oauthService.customQueryParams[key]);
        }
      }

      return url;
    });
  }
}
