import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Deposit } from './modal';
import { BaseProfileComponent } from '../BaseProfileComponent';
import { StockAccountService } from '../../shared/services/stock-account.service';
import { LookupService }       from '../../shared/services/lookup.service';
import { ProfileService } from '../../shared/services/profile.service';
import { AuthService } from '../../auth/auth.service';
import { SuccessDialogService } from '../../shared/dialogs/success-dialog/dialog.service';
import { ErrorDialogService } from '../../shared/dialogs/error-dialog/dialog.service';

@Component({
    selector: 'deposit-fund',
    templateUrl: './deposit-fund.component.html',
    styleUrls: ['../styles/common.less']
})
export class DepositFundComponent extends BaseProfileComponent {
    deposit: Deposit = new Deposit();
    public isLoading: boolean;
    public submitted: boolean;
    transaction: any[] = [];
    output: any = null;
    selectedFile: any = null;
    constructor(
        route: ActivatedRoute,
        router: Router,
        successDialogSvc : SuccessDialogService,
        errorDialogSvc: ErrorDialogService,
        private stockAccountSvc: StockAccountService,
        private lookupSvc: LookupService,
        private profileSvc: ProfileService,
        private authSvc: AuthService,
        private ref: ChangeDetectorRef
    ) {
       super(route, router, successDialogSvc, errorDialogSvc);
    }

    ngOnInit(){
      this.transactionList();
    }

    transactionList(){
       this.isLoading = true;
       this.stockAccountSvc.transactionList("deposit").subscribe((res)=>{
       this.isLoading = false;
       this.transaction = res['list'];
       this.ref.detectChanges();
      },err=>{
       this.onError(err);
       console.log(this.errors);
     })
    }

    onFileChanged(event) {
      let that = this;
      this.selectedFile = event.target.files[0];
      this.deposit.doc = this.selectedFile;
      console.log(this.deposit.doc);
      var reader = new FileReader();
      reader.onloadend = function() {
        that.output = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }  

    depositApply(form: any) {
       this.submitted = true;
        if (!form.valid) {
            return false;
        }

        if(!this.deposit.doc){
          return false;
        }

      this.isApplying = true;
      this.stockAccountSvc.depositApply(this.deposit)
          .subscribe((res)=>{
               this.onRequestSuccess();
               }, err => {
                 this.onRequestFailed(err);
                });
    }

    onRequestSuccess() {
      this.transactionList();
      this.profileSvc.getProfileInfo(this.authSvc.profileSysId);
      this.isApplying = false;
      this.errors = [];
      this.submitted = false;
      let title = 'success';
      let message = 'Congratulation_Your_deposit_request_sent_successfully';
      let isPublic = true;
      this.showSuccessDialog(title, message, isPublic);
    }

    onRequestFailed(err) {
       this.onError(err);
       this.isApplying = false;
       let title = 'error';
       let message = `${this.errors.toString()}`;
       let isPublic = true;
       this.showErrorDialog(title, message, isPublic)
    }


}