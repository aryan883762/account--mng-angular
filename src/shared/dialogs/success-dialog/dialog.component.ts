import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { SuccessDialogService } from './dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../../auth/auth.service';
import { ProfileService } from '../../../shared/services/profile.service';
@Component({
    selector: 'success-dialog',
    styleUrls: ['styles.less'],
    templateUrl: 'dialog.component.html'
})

export class SuccessDialogComponent implements OnDestroy {
    dialogVisible: boolean;
    public projectName: string;
    public title: string;
    public message: string;
    public isPublic: boolean;
    private dialogSub: ISubscription;
    constructor(
        private dialogSvc: SuccessDialogService,
        private router: Router,
        private route: ActivatedRoute,
        private authSvc: AuthService,
        private profileSvc: ProfileService
    ) {
        this.dialogSub = this.dialogSvc.showDialog$.subscribe(model => {
            this.title = model.title;
            this.message = model.message;
            this.isPublic = model.isPublic;
            this.showDialog();
        });
    }

    showDialog() {
        this.dialogVisible = true;
    }

    hideDialog() {
        this.dialogVisible = false;
        if(!this.isPublic && !this.profileSvc.isAdmin){
             this.router.navigateByUrl('/profile', {skipLocationChange: true}).then(()=>
             this.router.navigate([`profile/${this.authSvc.profileSysId}`]));
         }else{
             let url = this.router.url;
            this.router.navigateByUrl('/admin', {skipLocationChange: true}).then(()=>
            this.router.navigate([url]));
         }

    }

    ngOnDestroy() {
        if (this.dialogSub) {
            this.dialogSub.unsubscribe();
        }
    }
}