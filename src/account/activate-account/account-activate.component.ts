import { Component, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Credentials } from '../credentials';
import { environment } from '../../environments/environment';
import { AuthService, AuthResult } from '../../auth/auth.service';
import { ProgressLoadingService } from '../../shared/services/loading-response-progress.service';

import 'rxjs/add/operator/first';
import { AccountBaseComponent } from '../account-base.component';
@Component({
  selector: 'account-activate',
  templateUrl: 'account-activate.component.html',
  styleUrls: ['../account.less']
})
export class AccountAcivateComponent extends AccountBaseComponent {
  password: string = '';
  token: string = '';
  credentials: Credentials = new Credentials();
     constructor (
        route: ActivatedRoute,
        router: Router,
        authService: AuthService,
        private responseProgress: ProgressLoadingService
    ) {
        super(route, router, authService);
    }

  ngOnInit() {
   this.route.queryParams
      .filter(params => params.token)
      .subscribe(params => {
        this.token = params.token;
      });
  }

  activate(valid: boolean){
    this.submitted = true;
    if (!valid) return;
    this.responseProgress.progressResponse(true);
    const data = {
       token: this.token,
       password: this.password
    }
    this.authService
      .activateAccount(data).first().subscribe
            (
            r => this.onActivatonSuccess(r),
            e => {
            this.onError(e)
            this.responseProgress.progressResponse(false);
            }
            );
  }

  onActivatonSuccess(response) {
    this.credentials.password  = this.password;
    this.credentials.email = localStorage.getItem('Remail');
    if(this.credentials.password && this.credentials.email){
      this.responseProgress.progressResponse(true);
      this.authService
        .login(this.credentials).first().subscribe
              (
              r => {
                if(r != AuthResult.Success)
                {
                  this.responseProgress.progressResponse(false);
                }
                this.onLogin(r);
              },
              e => {
              this.responseProgress.progressResponse(false);
              this.onError(e);
              }
              );
    }else{
        this.responseProgress.progressResponse(false);
        this.router.navigate(['/account/signIn']);
    }
    // console.log(response);
    //this.responseProgress.progressResponse(false);
    //  this.router.navigate(['/account/signIn']);
   }

}
