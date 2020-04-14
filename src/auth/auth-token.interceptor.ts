import { Injectable, Injector } from '@angular/core';
import { AuthService, AuthResult } from './auth.service';
import { environment } from '../environments/environment';
import { LanguageType } from '../shared/services/types';
import { 
    HttpInterceptor, 
    HttpRequest, 
    HttpHandler, 
    HttpSentEvent, 
    HttpHeaderResponse, 
    HttpProgressEvent, 
    HttpResponse, 
    HttpUserEvent, 
    HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';


@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor (
        private inj: Injector,
        private router: Router
    ) { }
    
    private authSvc: AuthService;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        this.authSvc = this.inj.get(AuthService);
        const isSiteApi = req.url && req.url.startsWith(environment.site.api);
        const isAuthUrl = req.url && req.url == environment.endpoints.auth.url;

        let lan = localStorage.getItem(environment.storage.language) || "";
        let language = LanguageType.zh_CN.toString();
        if(lan in LanguageType){
        // if(Object.values(LanguageType).includes(lan)){
           language = lan;
        }else{
           localStorage.setItem(environment.storage.language, language); 
           language = LanguageType.zh_CN;
        }
        let newAuthReq = req.clone({ headers: req.headers.set('Accept-Language', language)});
        if (this.authSvc.bearer && !req.headers.get('Authorization') && isSiteApi && !isAuthUrl) {
             newAuthReq = req.clone({ headers: req.headers.set('Authorization', this.authSvc.bearer).set('Accept-Language', language)});
          if(req.method === 'DELETE'){
                newAuthReq = req.clone({ headers: req.headers.set('Authorization', this.authSvc.bearer).set('Accept-Language', language).set('Content-Type', 'application/x-www-form-urlencoded') });
           }

            return next.handle(newAuthReq).catch(error => {
                if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        case 401:
                        {
                           this.authSvc.logout();
                           this.router.navigate(['account/signIn']);
                        }
                        default:
                            return Observable.throw(error);
                    }
                } else {
                    return Observable.throw(error);
                }
            });
        }
        else {
            if(req.url.indexOf('translations') > 0){
                       return next.handle(req);
            }
           else{
                return next.handle(newAuthReq);
          }
        }
    }

}