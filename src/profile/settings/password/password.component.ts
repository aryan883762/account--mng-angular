import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialogService } from '../../../shared/dialogs/success-dialog/dialog.service';
import { ErrorDialogService } from '../../../shared/dialogs/error-dialog/dialog.service';
import { BaseProfileComponent } from '../../BaseProfileComponent';
import { ProfileService } from '../../../shared/services/profile.service';
import { AuthService } from '../../../auth/auth.service';
import { ProgressLoadingService } from '../../../shared/services/loading-response-progress.service';

@Component({
    selector: 'password-reset',
    templateUrl: './password.component.html',
    styleUrls: ['../../styles/common.less']
})
export class PasswordSettingComponent extends BaseProfileComponent {
    public model: any = {
        newPassword: null,
        confirmPassword: null
    }
    public submitted: boolean;
    constructor(
        route: ActivatedRoute,
        router: Router,
        successDialogSvc: SuccessDialogService,
        errorDialogSvc: ErrorDialogService,
        private profileSvc: ProfileService,
        private authSvc: AuthService,
        private responseProgress: ProgressLoadingService
    ) {
        super(route, router, successDialogSvc, errorDialogSvc);


    }

       onChangePassword(f) {
        this.submitted = true;
        if (!f.valid) {
            return;
        }
        if (this.model.newPassword != this.model.confirmPassword) {
            return;
        }
        this.responseProgress.progressResponse(true);
        this.profileSvc.updatePassword(this.model).subscribe((res)=>{
         this.onRequestSuccess();
        }, err => {
             this.onRequestFailed(err);
             })
       }

        onRequestSuccess() {
          this.authSvc.clearLocal();
          this.errors = [];
          this.submitted = false;
          let title = 'Success';
          let message = 'Congratulation! Password change successfully.';
          let isPublic = false;
          this.responseProgress.progressResponse(false);
          this.showSuccessDialog(title, message, isPublic)
        }

        onRequestFailed(err) {
           this.onError(err);
           let title = 'Error';
           let message = 'Failed! Your request sent failed.';
           let isPublic = true;
           this.showErrorDialog(title, message, isPublic)
        }

}