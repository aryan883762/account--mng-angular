import { Component, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService, AuthResult } from '../auth/auth.service';
import { environment } from '../environments/environment';
import { SiteApiResponseUtilities } from '../shared/services/SiteApiResponse';
import 'rxjs/add/operator/first';

@Component({
  selector: 'account-base'
})
export class AccountBaseComponent {

 private respUtils = new SiteApiResponseUtilities();
 public errors: string[];
 public submitted: boolean;
 public error: string = '';
  constructor(
        public route: ActivatedRoute,
        public router: Router,
        public authService: AuthService
    ) { }


  ngOnInit() {

  }

  ngOnDestroy() {

  }
  onLogin(result: AuthResult): void {
    this.submitted = false;
    if (result == AuthResult.Success) {
      this.error = null;
      let profile = environment.site.profileUrl(this.authService.profileSysId);
      this.router.navigate([profile], { queryParamsHandling: 'merge' });

    }
    else if (result == AuthResult.ServerOffline) {
      //this.error = "The server is offline. Please try again later.";
      this.error =  "server_offline_text";
    }
    else if (result == AuthResult.InvalidCredentials) {
            // The username or password is incorrect.
      this.error = "error_login_failed";
    }
    else if (result == AuthResult.EmailNotConfirmed) {
      //this.error = "Please verify your email address.";
      this.error = "verify_email_first_text";
    }

  }
   onError(error) {
        const errors = this.respUtils.getErrors(error);

        if (errors.length === 0) {
            errors.push("An unknown error occurred. Please try again.");
        }

        this.errors = errors;
        console.log(this.errors);
    }
}
