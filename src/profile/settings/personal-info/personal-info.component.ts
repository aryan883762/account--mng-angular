import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialogService } from '../../../shared/dialogs/success-dialog/dialog.service';
import { ErrorDialogService } from '../../../shared/dialogs/error-dialog/dialog.service';
import { BaseProfileComponent } from '../../BaseProfileComponent';

@Component({
    selector: 'personal-info',
    templateUrl: './personal-info.component.html',
    styleUrls: ['../../styles/common.less']
})
export class PersonalInfoSettingComponent extends BaseProfileComponent {

    constructor(
        route: ActivatedRoute,
        router: Router,
        successDialogSvc: SuccessDialogService,
        errorDialogSvc: ErrorDialogService,
    ) {
        super(route, router, successDialogSvc, errorDialogSvc);


    }
}