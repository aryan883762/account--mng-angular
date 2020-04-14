import { Component, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { AccountBaseComponent } from '../account-base.component';
import { ProgressLoadingService } from '../../shared/services/loading-response-progress.service';

import 'rxjs/add/operator/first';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['../account.less']
})
export class RegisterComponent extends AccountBaseComponent {
   email: string = '';
   requestSent: boolean = false;
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

  register(valid: boolean){
    this.submitted = true;
    if (!valid) return;
    this.responseProgress.progressResponse(true);

    this.authService
      .signup(this.email).first().subscribe
            (
            r => this.onSignupSuccess(r),
            e => {
            this.responseProgress.progressResponse(false);
            this.onError(e);
            }
            );
  }

  onSignupSuccess(response) {
    this.requestSent = true;
    localStorage.setItem('Remail',this.email);
    this.responseProgress.progressResponse(false);
   }


}
