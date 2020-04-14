import { Component, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { ProgressLoadingService } from '../../shared/services/loading-response-progress.service';
import 'rxjs/add/operator/first';
import { AccountBaseComponent } from '../account-base.component';
@Component({
  selector: 'reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['../account.less']
})
export class ResetPasswordComponent extends AccountBaseComponent {
  password: string = '';
  token: string = '';
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

  resetPassword(valid: boolean){
    this.submitted = true;
    if (!valid) return;
    this.responseProgress.progressResponse(true);
    const data = {
       token: this.token,
       password: this.password
    }
    this.authService
      .resetPassword(data).first().subscribe
            (
            r => this.onResetSuccess(r),
            e => {
            this.responseProgress.progressResponse(false);
            this.onError(e);
            }
            );
  }

  onResetSuccess(response) {
    this.responseProgress.progressResponse(false);
    this.router.navigate(['/account/signIn']);
   }

}
