import { Component, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Credentials } from './modal';
import { environment } from '../../environments/environment';
import { AuthService, AuthResult } from '../../auth/auth.service';

import { ProgressLoadingService } from '../../shared/services/loading-response-progress.service';
import { SiteApiResponseUtilities } from '../../shared/services/SiteApiResponse';
@Component({
    selector: 'admin-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./style.less']
})
export class AdminLoginComponent {
	 private respUtils = new SiteApiResponseUtilities();
	 public errors: string[];
	 public submitted: boolean;
	 error: string = '';
	 credentials: Credentials = new Credentials();
	      constructor (
	        private route: ActivatedRoute,
	        private router: Router,
	        private authService: AuthService,
	        private responseProgress: ProgressLoadingService
	    ) {
	    }

  login(valid: boolean) {
   this.submitted = true;
    if (!valid) return;  
    this.responseProgress.progressResponse(true);
    this.authService
      .login(this.credentials).subscribe
            (
            r => this.onLogin(r),
            e => {
            this.onError(e)
            this.responseProgress.progressResponse(false);
            }
            );
  }

  private onLogin(result: AuthResult): void {
    this.submitted = false;

    if (result == AuthResult.Success) {
      this.error = null;
      this.responseProgress.progressResponse(false);
      this.router.navigate(['admin']);

    }
    else if (result == AuthResult.ServerOffline) {
      this.error = "The server is offline. Please try again later.";
    }
    else if (result == AuthResult.InvalidCredentials) {
      this.error = "The username or password is incorrect.";
    }
    // setTimeout(()=>{
    // this.responseProgress.progressResponse(false);
    // },500);


  }

  private onError(error) {
        const errors = this.respUtils.getErrors(error);

        if (errors.length === 0) {
            errors.push("An unknown error occurred. Please try again.");
        }

        this.errors = errors;
        console.log(this.errors);
    }
}
