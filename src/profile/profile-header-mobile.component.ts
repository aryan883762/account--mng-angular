import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseProfileComponent } from './BaseProfileComponent';
import { SuccessDialogService } from '../shared/dialogs/success-dialog/dialog.service';
import { ErrorDialogService } from '../shared/dialogs/error-dialog/dialog.service';
import { ProfileService } from '../shared/services/profile.service';
@Component({
    selector: 'profile-header-mobile',
    templateUrl: './profile-header-mobile.component.html',
    styleUrls: ['./styles/header-mobile.less']
})
export class ProfileHeaderMobileComponent extends BaseProfileComponent {
   @Input() profile: any;
   activeNav: true;
   title: string = 'account_overview_text';
    constructor (
        route: ActivatedRoute,
        router: Router,
        successDialogSvc : SuccessDialogService,
        errorDialogSvc: ErrorDialogService,
        private profileSvc: ProfileService
    ) {
        super(route, router, successDialogSvc, errorDialogSvc);
    }

    setTitle(title: string)
    {

        this.title = title;
    }

}