import { Component, ViewChild, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ISubscription, Subscription } from 'rxjs/Subscription';
import { NgxNotificationService } from 'ngx-notification';
import { IdentityStatusDialogService } from './dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseDialogComponent } from '../BaseDialogComponent';
import { IdentityStatus } from './models';
import { ProfileService } from '../../services/profile.service';
import { SuccessDialogService } from '../success-dialog/dialog.service';
import { SuccessDialog } from '../success-dialog/models';
import { ErrorDialogService } from '../error-dialog/dialog.service';
import { IdentityVarificationDialogService } from '../identity-varification-dialog/dialog.service';
import { ErrorDialog } from '../error-dialog/models';
import { SelectItem } from 'primeng/api';
import { TranslatePipe } from '../../pipes/translate.pipe';
@Component({
    selector: 'indentity-status-dialog',
    styleUrls: ['styles.less'],
    templateUrl: 'dialog.component.html',
    providers: [TranslatePipe]
})

export class IdentityStatusDialogComponent extends BaseDialogComponent<IdentityStatus> implements OnDestroy {
    dialogVisible: boolean;
    private dialogSub: ISubscription;
    private profileSub: Subscription;
    form: any;
    types: SelectItem[];
    selectedType: string = '';
    public docs: any = null;
    public accountInfo: any = null;
    public idCard: IdentityStatus;
    public address: IdentityStatus;
    public companyBR: IdentityStatus;
    public bank_book: IdentityStatus;
    public w8_ban: IdentityStatus;
    constructor(
        el: ElementRef,
        notificationSvc: NgxNotificationService,
        private ref: ChangeDetectorRef,
        private dialogSvc: IdentityStatusDialogService,
        private router: Router,
        private route: ActivatedRoute,
        private profileSvc: ProfileService,
        private successDialogSvc: SuccessDialogService,
        private errorDialogSvc: ErrorDialogService,
        private identityDialogSvc: IdentityVarificationDialogService,
        private translatePipe: TranslatePipe
        ) {
            super(IdentityStatus, el, notificationSvc);
             this.profileSub = this.profileSvc.getProfileInfo$.subscribe(res => {
              this.docs = this.profileSvc.docs; 
              this.setDocs();
             });
            this.dialogSub = this.dialogSvc.showDialog$.subscribe(model => {
                 this.docs = model['docs'];
                 this.accountInfo = model['accountInfo'];
                 this.types = [
                    {label: this.translatePipe.transform('address_txt'), value: 'address', icon: 'fa fa-fw fa-id-card'},
                    {label: this.translatePipe.transform('bank_book'), value: 'bank_book', icon: 'fas  fa-passport'},
                    {label: this.translatePipe.transform('w8-ban'), value: 'w8-ban', icon: 'fas fa-money-check'} ];
                 if(this.accountInfo){
                   let ownerType = this.accountInfo['owner_type_id'];
                   if(ownerType==1){
                     this.selectedType = 'company_br';
                     this.types.unshift(
                        {label: this.translatePipe.transform('company_br_text'), value: 'company_br', icon:'fas fa-file-invoice'});

                   }else{
                      this.selectedType = 'id_card';
                      this.types.unshift(
                            {label: this.translatePipe.transform('identity_card_text'), value: 'id_card', icon: 'fa fa-fw fa-id-badge'})
                   }
                 }
                 console.log(model)
                 this.setDocs();
                 this.buildModel();
            });
        }

    setDocs(){
       this.idCard = new IdentityStatus();
       this.address = new IdentityStatus();
       this.companyBR = new IdentityStatus();
       this.bank_book = new IdentityStatus();
       this.w8_ban = new IdentityStatus();
       if(this.docs['id_card']){
          let idDoc = this.docs['id_card'];
          this.idCard.doc_id = idDoc['id'];
          this.idCard.user_id = idDoc['user_id'];
          this.idCard.doc_url = idDoc['doc_url'];
          this.idCard.status = idDoc['status'];
          this.idCard.reason = idDoc['reason'];
       }
       if(this.docs['address']){
          let addDoc = this.docs['address'];
          this.address.doc_id = addDoc['id'];
          this.address.user_id = addDoc['user_id'];
          this.address.doc_url = addDoc['doc_url'];
          this.address.status = addDoc['status'];
          this.address.reason = addDoc['reason'];
       }
       if(this.docs['company_br']){
          let addDoc = this.docs['company_br'];
          this.companyBR.doc_id = addDoc['id'];
          this.companyBR.user_id = addDoc['user_id'];
          this.companyBR.doc_url = addDoc['doc_url'];
          this.companyBR.status = addDoc['status'];
          this.companyBR.reason = addDoc['reason'];
       }
       if(this.docs['bank_book']){
        let addDoc = this.docs['bank_book'];
        this.bank_book.doc_id = addDoc['id'];
        this.bank_book.user_id = addDoc['user_id'];
        this.bank_book.doc_url = addDoc['doc_url'];
        this.bank_book.status = addDoc['status'];
        this.bank_book.reason = addDoc['reason'];
     }
     if(this.docs['w8-ban']){
        let addDoc = this.docs['w8-ban'];
        this.w8_ban.doc_id = addDoc['id'];
        this.w8_ban.user_id = addDoc['user_id'];
        this.w8_ban.doc_url = addDoc['doc_url'];
        this.w8_ban.status = addDoc['status'];
        this.w8_ban.reason = addDoc['reason'];
     }
    }
    checkURL(url) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    identityVarification(docType: string) {
     this.identityDialogSvc.showDialog(docType);
    }
    private buildModel() {
          this.model = this.newModel();
          this.showDialog();
      }

    onRequestFailed(){
          let errorDialog = new ErrorDialog();
          errorDialog.title = 'Eror';
          errorDialog.message = `Error Message! ${this.errors.toString()}`;
          errorDialog.isPublic = true;
          this.errorDialogSvc.showDialog(errorDialog);
    } 

    onRequestSuccess(){
          this.hideDialog();
          let successDialog = new SuccessDialog();
          this.showSaveErrored = false;
          this.errors = [];
          this.submitted =  false;
          successDialog.title = 'Success';
          successDialog.message = 'Verification done.';
          successDialog.isPublic = false;
          this.successDialogSvc.showDialog(successDialog);
    }   
    ngOnDestroy() {
        if (this.dialogSub) {
            this.dialogSub.unsubscribe();
        }
    }
}