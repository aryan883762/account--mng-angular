import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialogService } from '../../../shared/dialogs/success-dialog/dialog.service';
import { ErrorDialogService } from '../../../shared/dialogs/error-dialog/dialog.service';
import { BaseProfileComponent } from '../../BaseProfileComponent';
import { environment } from '../../../environments/environment';
import { ProfileService } from '../../../shared/services/profile.service';
import { LookupService } from '../../../shared/services/lookup.service';
import { AuthService } from '../../../auth/auth.service';
import { MessageService } from 'primeng/api';
import { ISubscription, Subscription } from 'rxjs/Subscription';
import { IdentityPreview } from '../../../shared/dialogs/identity-preview-dialog/models';
import { IdentityVarificationDialogService } from '../../../shared/dialogs/identity-varification-dialog/dialog.service';
import { SelectItem } from 'primeng/api';
export interface PersonalInfo {
  name: string;
  section: string;
  phoneNumber: string;
}
@Component({
    selector: 'profile-info',
    templateUrl: './profile-info.component.html',
    styleUrls: ['../../styles/common.less'],
})
export class ProfileInfoSettingComponent extends BaseProfileComponent {
    private profileSub: Subscription;
    name_chinese: string = '';
    name_english: string = '';
    public submitted: boolean;
    types: SelectItem[];
    selectedType: string = 'id_card';
    public docs: any = null;
    public idCard: IdentityPreview;
    public address: IdentityPreview;
    constructor(
        route: ActivatedRoute,
        router: Router,
        successDialogSvc: SuccessDialogService,
        errorDialogSvc: ErrorDialogService,
        private profileSvc: ProfileService,
        private messageSvc: MessageService,
        private identityDialogSvc: IdentityVarificationDialogService,
        private authSvc: AuthService,
        private lookupSvc: LookupService
    ) {
        super(route, router, successDialogSvc, errorDialogSvc);
          this.types = [
            {label: 'ID', value: 'id_card', icon: 'fa fa-fw fa-id-badge'},
            {label: 'Address', value: 'address', icon: 'fa fa-fw fa-id-card'},
            ];
        this.profileSub = this.profileSvc.getProfileInfo$.subscribe(res => {
             this.getInfo();
        });
    }
    ngOnInit() {
      this.getInfo();
    }

    getInfo(){
      let user = environment.profileData['user'];
        //basic
      this.name_chinese = user['name_chinese'];
      this.name_english = user['name_english'];
      this.docs = user['docs'];
      this.idCard = new IdentityPreview();
      this.address = new IdentityPreview();
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
    }

    savePersonalInfo(form: any){
    	   if (!form.valid) {
            return false;
        }
        this.profileSvc.updateUser(this.name_chinese, this.name_english).subscribe((res)=>{
             this.onRequestSuccess();
               }, err => {
                 this.onRequestFailed(err);
                });
    }

    checkURL(url) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    identityVarification(docType: string) {
     this.identityDialogSvc.showDialog(docType);
    }

    onRequestSuccess() {
      this.profileSvc.getProfileInfo(this.authSvc.profileSysId);
      this.submitted = false;
      let title = 'Success';
      let message = 'Congratulation! Updated successfully.';
      let isPublic = true;
      this.showSuccessDialog(title, message, isPublic)
    }

    onRequestFailed(err) {
       this.onError(err);
       let title = 'Error';
       let message = this.errors.toString();
       let isPublic = true;
       this.showErrorDialog(title, message, isPublic)
    }


}