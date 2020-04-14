import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialogService } from '../../shared/dialogs/success-dialog/dialog.service';
import { ErrorDialogService } from '../../shared/dialogs/error-dialog/dialog.service';
import { ProgressLoadingService } from '../../shared/services/loading-response-progress.service';
import { BaseProfileComponent } from '../BaseProfileComponent';
import { StockAccountService } from '../../shared/services/stock-account.service';
import { ProfileService } from '../../shared/services/profile.service';
import { AccountType } from '../../shared/services/types';
import { environment } from '../../environments/environment';
@Component({
    selector: 'profile-overview',
    templateUrl: './profile-overview.component.html',
    styleUrls: ['./styles/common.less']
})
export class ProfileOverviewComponent extends BaseProfileComponent {
    isMarginAccount: boolean = true;
    profile: any = {};
    constructor(
        route: ActivatedRoute,
        router: Router,
        successDialogSvc : SuccessDialogService,
        errorDialogSvc: ErrorDialogService,
        private stockAccountSvc: StockAccountService,
        private profileSvc: ProfileService,
        private responseProgress: ProgressLoadingService
    ) {
        super(route, router, successDialogSvc, errorDialogSvc);
    }

    ngOnInit() {
        console.log('inside overview');
    }
}