import { Component, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { AccountBaseComponent } from '../account-base.component';
import { ProgressLoadingService } from '../../shared/services/loading-response-progress.service';
import 'rxjs/add/operator/first';

@Component({
  selector: 'request-password',
  templateUrl: 'request-password.component.html',
  styleUrls: ['../account.less']
})
export class RequestPasswordComponent extends AccountBaseComponent {
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

  requestPassword(valid: boolean){
    this.submitted = true;
    if (!valid) return;
    this.responseProgress.progressResponse(true);
    this.authService
      .requestPassword(this.email).first().subscribe
            (
            r => this.onRequestSuccess(r),
            e => {
            this.responseProgress.progressResponse(false);
            this.onError(e);
            }
            );
  }

  onRequestSuccess(response) {
    this.requestSent = true;
    this.responseProgress.progressResponse(false);
   }


}
