import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SiteApiResponseUtilities } from '../shared/services/SiteApiResponse';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';

export enum AuthResult {
    Success = 0,
    InvalidCredentials = 1,
    EmailNotConfirmed = 2,
    ServerOffline = 3,
}

@Injectable()
export class AuthService {
    private respUtils = new SiteApiResponseUtilities();
    constructor(
        private http: HttpClient
    ) { }

   get profileSysId() {
        return parseInt(localStorage.getItem(environment.storage.auth.profileSysId));
    }

    get isLoggedIn() {
        return this.accessToken !== null;
    }
 
    get accountType() {
        return localStorage.getItem(environment.storage.auth.type);
    }
   
    get bearer() {
        if (!this.isLoggedIn) {
            return null;
        }

        return `${this.accessToken}`;
    }

    login(data) {
        const url = environment.endpoints.auth.url;
        let body = new URLSearchParams();
        body.set('type',  data.type);
        body.set('email', data.email);
        body.set('password', data.password)

        return this.http
            .post(url, body.toString(), {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
            })
            .map(r => this.onLogin(r))
            .catch(r => this.onError(r));
    }

    signup(email: any) {
        const url = environment.endpoints.auth.signup;
        let body = new URLSearchParams();
        body.set('type', 'client');
        body.set('email', email);
        return this.http
            .post(url, body.toString(), {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
            })
            .map(r => r)
            .catch(r => this.respUtils.onServiceError(r));
    }
    
    activateAccount(data: any) {
        const url = environment.endpoints.auth.activateAccount;
        let body = new URLSearchParams();
        body.set('password', data.password);
        return this.http
            .post(url,  body.toString(),
            {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('Authorization', data.token)
            })
            .map(r => r)
            .catch(r => this.respUtils.onServiceError(r));
    }

    requestPassword(email: any){
        const url = environment.endpoints.auth.requestPassword;
        let body = new URLSearchParams();
        body.set('type', 'client');
        body.set('email', email);
        return this.http
            .post(url, body.toString(), {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
            })
            .map(r => r)
            .catch(r => this.respUtils.onServiceError(r));
    }
    
    resetPassword(data: any) {
        const url = environment.endpoints.profile.resetPassword;
        let body = new URLSearchParams();
        body.set('password', data.password);
        return this.http
            .put(url,  body.toString(),
            {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('Authorization', data.token)
            })
            .map(r => r)
            .catch(r => this.respUtils.onServiceError(r));
    }
    
    
    logout(): void {
     this.clearLocal();
        // setTimeout(() => {
        //     window.location.reload();
        // });
    }

    clearLocal(): void {
     localStorage.removeItem('access_token');
     localStorage.removeItem('type');
     localStorage.removeItem('profileSysId');
     localStorage.removeItem('user');
    }

    private onLogin(response): AuthResult {
        if (response.token) {
            if(response.user.type != 'client'){
                localStorage.setItem('user', JSON.stringify(response));
            }
            localStorage.setItem(environment.storage.auth.accessToken, response.token);
            localStorage.setItem(environment.storage.auth.profileSysId, response.user.id);
            localStorage.setItem(environment.storage.auth.type, response.user.type);
            if (this.isLoggedInWithCRM == 'initiate') {
                localStorage.setItem(environment.storage.auth.loginWithCRM, 'complete');
            }
            return AuthResult.Success;
        } else {
            return AuthResult.InvalidCredentials;
        }
    }
    private get accessToken() {
        return localStorage.getItem(environment.storage.auth.accessToken);
    }

    private get refreshToken() {
        return localStorage.getItem(environment.storage.auth.refreshtoken);
    }


    private onError(error): Observable<AuthResult> {
        if (error.status == 606) {
             return Observable.of(AuthResult.InvalidCredentials);

        }

        return Observable.of(AuthResult.ServerOffline)
    }

   
   get isLoggedInWithCRM() {
        return localStorage.getItem(environment.storage.auth.loginWithCRM);
    }

    set isOnCRMSite(v: string) {
        localStorage.setItem(environment.storage.auth.isOnCRMSite, v);
    }

    get isOnCRMSite() {
        return localStorage.getItem(environment.storage.auth.isOnCRMSite);

    }

}
