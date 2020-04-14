import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Withdraw } from './modal';
import { BaseProfileComponent } from '../BaseProfileComponent';
import { ProfileService } from '../../shared/services/profile.service';
import { AuthService } from '../../auth/auth.service';
import { SuccessDialogService } from '../../shared/dialogs/success-dialog/dialog.service';
import { ErrorDialogService } from '../../shared/dialogs/error-dialog/dialog.service';
import { StockAccountService } from '../../shared/services/stock-account.service';
import { SuccessDialog } from '../../shared/dialogs/success-dialog/models';

@Component({
    selector: 'withdraw-fund',
    templateUrl: './withdraw-fund.component.html',
    styleUrls: ['../styles/common.less']
})
export class WithdrawFundComponent extends BaseProfileComponent {
    public withdraw: Withdraw = new Withdraw();
    public transaction: any = [];
    public isLoading: boolean;
    public isApplying: boolean;
    public submitted: boolean;
    constructor(
        route: ActivatedRoute,
        router: Router,
        successDialogSvc : SuccessDialogService,
        errorDialogSvc: ErrorDialogService,
        private profileSvc: ProfileService,
        private authSvc: AuthService,
        private stockAccountSvc: StockAccountService, 
        private ref: ChangeDetectorRef
    ) {
       super(route, router, successDialogSvc, errorDialogSvc);
    }
    ngOnInit(){
     this.transactionList();
    }

    transactionList(){
       this.isLoading = true;
       this.stockAccountSvc.transactionList("withdraw").subscribe((res)=> {
       this.transaction = res['list'];
       this.isLoading = false;
       this.ref.detectChanges();
     },err=>{
       this.onError(err);
       console.log(this.errors);
     });
    }

     withdrawApply(form: any) {
       this.submitted = true;
        if (!form.valid) {
            return false;
        }
            
      this.isApplying = true;
      this.stockAccountSvc.withdrawApply(this.withdraw)
          .subscribe((res)=>{
               this.onRequestSuccess();
               }, err => {
               this.onRequestFailed(err);
                });
    }

    onRequestSuccess() {
      this.transactionList();
      this.profileSvc.getProfileInfo(this.authSvc.profileSysId);
      this.submitted = false;
      this.isApplying = false;
      let title = 'success';
      let message = 'Congratulation_Your_withdraw_request_sent_successfully';
      let isPublic = true;
      this.showSuccessDialog(title, message, isPublic)
    }

    onRequestFailed(err) {
       this.isApplying = false;
       this.onError(err);
       let title = 'error';
       let message = `${this.errors.toString()}`
       let isPublic = true;
       this.showErrorDialog(title, message, isPublic)
    }

}