import { Component, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Credentials } from '../credentials';
import { environment } from '../../environments/environment';
import { AuthService, AuthResult } from '../../auth/auth.service';
import { AccountBaseComponent } from '../account-base.component';
import { ProgressLoadingService } from '../../shared/services/loading-response-progress.service';

import 'rxjs/add/operator/first';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['../account.less'],
  providers: []
})
export class LoginComponent extends AccountBaseComponent {

  credentials: Credentials = new Credentials();
  submitted: boolean;
      constructor (
        route: ActivatedRoute,
        router: Router,
        authService: AuthService,
        private responseProgress: ProgressLoadingService
    ) {
        super(route, router, authService);
    }

  ngOnInit() {
   
  }

  ngOnDestroy() {
 
  }

  login(valid: boolean) {
   this.submitted = true;
    if (!valid) return;  
    this.responseProgress.progressResponse(true);
    this.authService
      .login(this.credentials).subscribe
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
            this.onError(e)
            }
            );
  }

  // onUserLogin(result: AuthResult): void {
  //   this.submitted = false;
  //   this.responseProgress.progressResponse(false);
  //   if (result == AuthResult.Success) {
  //     this.error = null;
  //     let profile = environment.site.profileUrl(this.authService.profileSysId);
  //     this.router.navigate([profile], { queryParamsHandling: 'merge' });

  //   }
  //   else if (result == AuthResult.ServerOffline) {
  //     //this.error = "The server is offline. Please try again later.";
  //     this.error =  "server_offline_text";
  //   }
  //   else if (result == AuthResult.InvalidCredentials) {
  //           // The username or password is incorrect.
  //     this.error = "error_login_failed";
  //   }
  //   else if (result == AuthResult.EmailNotConfirmed) {
  //     //this.error = "Please verify your email address.";
  //     this.error = "verify_email_first_text";
  //   }

  // }

  forgotPassword() {
     this.router.navigate(['account/forgotPassword']);
  }
}
