import { Component, ViewChild, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { NgxNotificationService } from 'ngx-notification';
import { IdentityPreviewDialogService } from './dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseDialogComponent } from '../BaseDialogComponent';
import { IdentityPreview } from './models';
import { ProfileService } from '../../services/profile.service';
import { SuccessDialogService } from '../success-dialog/dialog.service';
import { SuccessDialog } from '../success-dialog/models';
import { ErrorDialogService } from '../error-dialog/dialog.service';
import { ErrorDialog } from '../error-dialog/models';
import { SelectItem } from 'primeng/api';
import { AdminService } from '../../../admin/services/admin.service';
@Component({
    selector: 'indentity-preview-dialog',
    styleUrls: ['styles.less'],
    templateUrl: 'dialog.component.html'
})

export class IdentityPreviewDialogComponent extends BaseDialogComponent<IdentityPreview> implements OnDestroy {
    dialogVisible: boolean;
    private dialogSub: ISubscription;
    form: any;
    types: SelectItem[];
    selectedType: string = 'id_card';
    public docs: any = null;
    public idCard: IdentityPreview;
    public address: IdentityPreview;
    public company_br: IdentityPreview;
    public bank_book: IdentityPreview;
    public w8_ban: IdentityPreview;
    constructor(
        el: ElementRef,
        notificationSvc: NgxNotificationService,
        private ref: ChangeDetectorRef,
        private dialogSvc: IdentityPreviewDialogService,
        private router: Router,
        private route: ActivatedRoute,
        private profileSvc: ProfileService,
        private successDialogSvc: SuccessDialogService,
        private errorDialogSvc: ErrorDialogService,
        private adminSvc: AdminService
        ) {
            super(IdentityPreview, el, notificationSvc);
            this.types = [
            {label: 'ID', value: 'id_card', icon: 'fa fa-fw fa-id-badge'},
            {label: 'Address', value: 'address', icon: 'fa fa-fw fa-id-card'},
            {label: 'Bank book', value: 'bank_book', icon: 'fas  fa-passport'},
            {label: 'w8-ban', value: 'w8-ban', icon: 'fas fa-money-check'} ];
            this.dialogSub = this.dialogSvc.showDialog$.subscribe(model => {
                 this.docs = model;
                 this.idCard = new IdentityPreview();
                 this.address = new IdentityPreview();
                 this.company_br = new IdentityPreview();
                 this.bank_book = new IdentityPreview();
                 this.w8_ban = new IdentityPreview();
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
                    this.company_br.doc_id = addDoc['id'];
                    this.company_br.user_id = addDoc['user_id'];
                    this.company_br.doc_url = addDoc['doc_url'];
                    this.company_br.status = addDoc['status'];
                    this.company_br.reason = addDoc['reason'];
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
                 this.buildModel();
            });
        }


    checkURL(url) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }
    updateIdentityStatus(form:any){
       if(!form.valid){
         return false;
       }
     let dataD = (this.selectedType === 'id_card')?this.idCard:this.address;
     switch(this.selectedType){
         case 'id_card':{
             dataD = this.idCard;
             break;
         }
         case 'address':{
            dataD = this.address;
            break;
        }
        case 'bank_book':{
            dataD = this.bank_book;
            break;
        }
        case 'w8-ban':{
            dataD = this.w8_ban;
            break;
        }
        case 'company_br':{
            dataD = this.company_br;
            break;
        }
     }
     this.adminSvc.verifyUserDocs(dataD).subscribe((res)=>{
        this.onRequestSuccess();
     }, err=>{
       this.onSaveError(err);
       this.onRequestFailed();
     })

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