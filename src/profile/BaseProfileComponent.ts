import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { AuthService } from '../auth/auth.service';
import { SiteApiResponseUtilities } from '../shared/services/SiteApiResponse';
import { LanguageType } from '../shared/services/types';
import { environment } from '../environments/environment';
import { SuccessDialogService } from '../shared/dialogs/success-dialog/dialog.service';
import { ErrorDialogService } from '../shared/dialogs/error-dialog/dialog.service';
import { SuccessDialog } from '../shared/dialogs/success-dialog/models';
import { ErrorDialog } from '../shared/dialogs/error-dialog/models';
export class BaseProfileComponent implements OnInit, OnDestroy {
    
    private respUtils = new SiteApiResponseUtilities();
    public errors: string[];
    private routerSub: ISubscription;
    public isApplying: boolean;
    public profile: any;

        constructor(
        private route: ActivatedRoute,
        private router: Router,
        private successDialogSvc: SuccessDialogService,
        private errorDialogSvc: ErrorDialogService
        ) {

        this.routerSub = this.router.events.subscribe(
            () => window.scrollTo(0, 0)
        );
    }

    ngOnInit() {
     
    }

    ngOnDestroy() {
        if (this.routerSub) {
            this.routerSub.unsubscribe();
        }
    }



	logout(){
     localStorage.removeItem('access_token');
     localStorage.removeItem('type');
     localStorage.removeItem('profileSysId');
     localStorage.removeItem('user');
     this.router.navigate(['/account/signIn']);

	}

    onError(error) {
        const errors = this.respUtils.getErrors(error);

        if (errors.length === 0) {
            errors.push("An unknown error occurred. Please try again.");
        }

        this.errors = errors;
        console.log(this.errors);
    }

    showSuccessDialog(title: string, msg: string, isPublic: boolean) {
      this.errors = [];
      let successDialog = new SuccessDialog();
      successDialog.title = title;
      successDialog.message = msg;
      successDialog.isPublic = isPublic;
      this.successDialogSvc.showDialog(successDialog);
    }

    showErrorDialog(title: string, msg: string, isPublic: boolean) {
      let errorDialog = new ErrorDialog();
      errorDialog.title = title;
      errorDialog.message = msg;
      errorDialog.isPublic = isPublic;
      this.errorDialogSvc.showDialog(errorDialog);
    }
  
}