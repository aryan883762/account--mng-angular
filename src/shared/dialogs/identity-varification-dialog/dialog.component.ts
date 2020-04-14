import { Component, ViewChild, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { NgxNotificationService } from 'ngx-notification';
import { IdentityVarificationDialogService } from './dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseDialogComponent } from '../BaseDialogComponent';
import { IdentityVarification } from './models';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../../auth/auth.service';
import { SuccessDialogService } from '../success-dialog/dialog.service';
import { SuccessDialog } from '../success-dialog/models';
import { ErrorDialogService } from '../error-dialog/dialog.service';
import { ErrorDialog } from '../error-dialog/models';
@Component({
    selector: 'indentity-varification-dialog',
    styleUrls: ['styles.less'],
    templateUrl: 'dialog.component.html'
})

export class IdentityVarificationDialogComponent extends BaseDialogComponent<IdentityVarification> implements OnDestroy {
    dialogVisible: boolean;
    private dialogSub: ISubscription;
    form: any;
    public outputImg: any = null;
    selectedFile: any = null;
    public headerTitle: string = 'Identity Card';
    constructor(
        el: ElementRef,
        notificationSvc: NgxNotificationService,
        private ref: ChangeDetectorRef,
        private dialogSvc: IdentityVarificationDialogService,
        private router: Router,
        private route: ActivatedRoute,
        private profileSvc: ProfileService,
        private authSvc: AuthService,
        private successDialogSvc: SuccessDialogService,
        private errorDialogSvc: ErrorDialogService
        ) {
            super(IdentityVarification, el, notificationSvc);
            this.dialogSub = this.dialogSvc.showDialog$.subscribe(docType => {
                 this.buildModel(docType);
            });
        }


    onFileChanged(event) {
      let that = this;
      this.selectedFile = event.target.files[0];
      this.model.document = this.selectedFile;
      console.log(this.model.document);
      var reader = new FileReader();
      reader.onloadend = function() {
        that.outputImg = reader.result;
        that.ref.detectChanges();
      };
      reader.readAsDataURL(this.selectedFile);
    }

    removeUpload(){
     this.selectedFile = null;
     this.outputImg = null;
     this.model = this.newModel();
    }

    save(form: any): boolean {
        this.submitted =  true;
        if (!form.valid) {
            return false;
        }

        if(!this.model.document){
           return false;
        }
            
        this.profileSvc.uploadDoc(this.model).subscribe((res)=>{
            this.profileSvc.getProfileInfo(this.authSvc.profileSysId);
            this.hideDialog();
            let successDialog = new SuccessDialog();
            this.showSaveErrored = false;
            this.errors = [];
            this.submitted =  false;
            successDialog.title = 'success';
            successDialog.message = 'congratulation_your_document_submitted_successfully_text';
            successDialog.isPublic = true;
            this.successDialogSvc.showDialog(successDialog);
        }, err=>{
             this.onSaveError(err);
             this.onRequestFailed();
        })
        return true;
        
    }

    private buildModel(docType: string) {
          this.model = this.newModel();
          this.model.documentType = docType;
          switch(docType){
              case 'id_card':{
                this.headerTitle = 'identity_card_text';
                this.model.documentType = docType;
                break;
              }
              case 'company_br':{
                this.headerTitle = 'company_br_text';
                this.model.documentType = docType;
                break;
              }
              case 'address':{
                this.headerTitle = 'address';
                this.model.documentType = docType;
                break;
              }
              case 'bank_book':{
                this.headerTitle = 'bank_book';
                this.model.documentType = docType;
                break;
              }
              case 'w8-ban':{
                this.headerTitle = 'w8-ban';
                this.model.documentType = docType;
                break;
              }
          }
        //   if(docType == 'id_card'){
        //     this.headerTitle = 'identity_card_text';
        //   }
        //   else if(docType == 'company_br'){
        //       this.headerTitle = 'company_br_text';
        //   }else{
        //     this.headerTitle = 'address_proof_text';
        //     this.model.documentType = 'address';
        //   }
          this.showDialog();
      }

  onRequestFailed(){
        let errorDialog = new ErrorDialog();
        errorDialog.title = 'Eror';
        errorDialog.message = `Error Message! ${this.errors.toString()}`;
        errorDialog.isPublic = true;
        this.errorDialogSvc.showDialog(errorDialog);
  } 




    ngOnDestroy() {
        if (this.dialogSub) {
            this.dialogSub.unsubscribe();
        }
    }
}