import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialogService } from '../../../shared/dialogs/success-dialog/dialog.service';
import { ErrorDialogService } from '../../../shared/dialogs/error-dialog/dialog.service';
import { BaseProfileComponent } from '../../BaseProfileComponent';

@Component({
    selector: 'transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['../../styles/common.less', './style.less']
})
export class TransactionListComponent extends BaseProfileComponent {
   @Input() transaction:any;
   data: any[] = []
    constructor(
        route: ActivatedRoute,
        router: Router,
        successDialogSvc : SuccessDialogService,
        errorDialogSvc: ErrorDialogService
    ) {
        super(route, router, successDialogSvc, errorDialogSvc);
    }
    ngOnChanges() {
      this.data = this.transaction;
    }
}