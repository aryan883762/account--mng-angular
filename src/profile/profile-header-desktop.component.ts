import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseProfileComponent } from './BaseProfileComponent'
import { SuccessDialogService } from '../shared/dialogs/success-dialog/dialog.service';
import { ErrorDialogService } from '../shared/dialogs/error-dialog/dialog.service';
import { ProfileService } from '../shared/services/profile.service';
@Component({
    selector: 'profile-header-desktop',
    templateUrl: 'profile-header-desktop.component.html',
    styleUrls: ['./styles/header-desktop.less']
})
export class ProfileHeaderDesktopComponent extends BaseProfileComponent {
   @Input() profile: any;
    constructor (
        route: ActivatedRoute,
        router: Router, 
        successDialogSvc : SuccessDialogService,
        errorDialogSvc: ErrorDialogService,
        private profileSvc: ProfileService
    ) {
        super(route, router, successDialogSvc, errorDialogSvc);
    }
   ngOnInit(){

   }
   
}