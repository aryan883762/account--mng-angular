import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialogService } from '../../../shared/dialogs/success-dialog/dialog.service';
import { ErrorDialogService } from '../../../shared/dialogs/error-dialog/dialog.service';
import { BaseProfileComponent } from '../../BaseProfileComponent';
import { IdentityVarificationDialogService } from '../../../shared/dialogs/identity-varification-dialog/dialog.service';
import { IdentityStatusDialogService } from '../../../shared/dialogs/identity-status-dialog/dialog.service';
import { StockAccountService } from '../../../shared/services/stock-account.service';
import { ProfileService } from '../../../shared/services/profile.service';
@Component({
    selector: 'cash-account',
    templateUrl: './cash-account.component.html',
    styleUrls: ['../../styles/common.less']
})
export class CashAccountComponent extends BaseProfileComponent {
    @Input() profile: any;
    public data: any;
    public isLoading: boolean;
    public hasAccount: boolean;
    public isIdentityVerified: boolean; 
    public isAccountCompleted: boolean;
    public isDocsVerified: boolean;
    public balanceInCashAccount: number = 0;
    constructor(
        route: ActivatedRoute,
        router: Router,
        successDialogSvc : SuccessDialogService,
        errorDialogSvc: ErrorDialogService,
        private identityDialogSvc: IdentityVarificationDialogService,
        private identityStatusDialogSvc: IdentityStatusDialogService,
        private stockAccountSvc: StockAccountService,
        private profileSvc: ProfileService
    ) {
        super(route, router, successDialogSvc, errorDialogSvc);
    }

    ngOnInit(){
       this.getAccountInfo();
    }
     getAccountInfo(){
      this.hasAccount =  this.profileSvc.hasCashAccount;
      this.isIdentityVerified = this.profileSvc.isIdentityVerified;
      this.isAccountCompleted =  this.profileSvc.isCashAccountCompleted;
      this.balanceInCashAccount = this.profileSvc.balanceInCashAccount;
      this.isDocsVerified = this.profileSvc.isAllDocumentVerified;
      console.log('----cash account-----');
      console.log('hasAccount:',this.hasAccount);
      console.log('isIdentityVerified', this.isIdentityVerified)
      console.log('isAccountCompeted', this.isAccountCompleted);
      console.log('----end-----');
        }
    // ngOnChanges(){
    //     this.data = this.cashData;
    //     this.isLoading = this.isCashDataLoading;
    //     let acc =  this.data['account'];
    //     if(acc){
    //        this.isAccountCompleted = acc['complete']; 
    //         console.log(this.isAccountCompleted);
    //     }
    //     console.log(this.data['account']);
    // }
    
    identityVarification() {
        this.identityStatusDialogSvc.showDialog(this.profileSvc.docs, this.profileSvc.cashAccountInfo);
      //   if(!this.profileSvc.isAddressProofUploaded || !this.profileSvc.isIdCardUploaded){
      //     if(!this.profileSvc.isAddressProofUploaded) {
      //     this.identityDialogSvc.showDialog('address');
      //     }else{
      //       this.identityDialogSvc.showDialog('id_card');
      //     }
      // }
      // else{
      //     this.showSuccessDialog('Information','Identity Information is not verified, Documents under verification proccess.', true);
      // }
    }


}