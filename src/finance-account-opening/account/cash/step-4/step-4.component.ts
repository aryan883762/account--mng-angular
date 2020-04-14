import { Component, OnInit, Input }   from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ISiteApiResponse, SiteApiResponseUtilities } from '../../../../shared/services/SiteApiResponse';
import { FormData, Step1, Step2, Step3, Step4 }  from '../data/formData.model';
import { AuthService } from '../../../../auth/auth.service';
import { ProfileService } from '../../../../shared/services/profile.service';
import { FormDataService }     from '../data/formData.service';
import { LookupService }       from '../../../../shared/services/lookup.service';
import { CashAccountService } from '../cash-account.service';
import { ProgressLoadingService } from '../../../../shared/services/loading-response-progress.service';
import { SuccessDialogService } from '../../../../shared/dialogs/success-dialog/dialog.service';
import { SuccessDialog } from '../../../../shared/dialogs/success-dialog/models';
import { environment } from '../../../../environments/environment';
@Component ({
    selector:     'margin-step-4'
    ,templateUrl: './step-4.component.html',
    styleUrls: ['../../style.less']
})

export class Step4Component implements OnInit {
    title = 'Step-4';
    step1Data: Step1;
    step2Data: Step2;
    step3Data: Step3;
    step4Data: Step4;
    isFormValid: boolean = false;
    public showSaveErrored: boolean;
    public errors: string[] = [];
    private respUtils = new SiteApiResponseUtilities();
    form: FormGroup;
    securitiesAccount: any[] = [];
    fundAccount: any[] = [];
    termsAndCondition: boolean = false;
    noticeOnRisk: boolean = false;
    applyFOrChinaConnect: boolean = false;
    taxResident: boolean = false;
    w8BanForm: boolean = false;
    accountOpeningTermsURL: string = '';
    noticeOnRiskDisclosureURL: string = '';
    constructor(private router: Router, 
                private route: ActivatedRoute,
                private profileSvc: ProfileService,
                private authSvc: AuthService,
                private lookupSvc: LookupService, 
                private formDataService: FormDataService,
                private cashAccountSvc: CashAccountService, 
                private responseProgress: ProgressLoadingService,
                private successDialogSvc: SuccessDialogService) {
      this.securitiesAccount = this.lookupSvc.getAttributeValues('attrSecuritiesAccount');
    //   this.fundAccount = this.lookupSvc.getAttributeValues('attrFoundAccount');
      this.accountOpeningTermsURL = environment.site.accountOpeningTermsURL;
      this.noticeOnRiskDisclosureURL = environment.site.noticeOnRiskDisclosureURL;
    }

    ngOnInit() {
        window.scrollTo(0, 200);
        this.step4Data = this.formDataService.getStep4Data();
    }

    isValidForm(form: any): boolean {
        if(!form.valid){
            return false;
        }
        // if (!this.step4Data.found_account_ids || !this.step4Data.securities_account_ids) {
        //     return false;
        // }
        if (!this.step4Data.securities_account_ids) {
            return false;
        }
        this.formDataService.setStep4Data(this.step4Data);
        return true;
    }

    minSelectedCheckboxes(min = 1) {
        const validator: ValidatorFn = (formArray: FormArray) => {
          const totalSelected = formArray.controls
            .map(control => control.value)
            .reduce((prev, next) => next ? prev + next : prev, 0);
          return totalSelected < min ? { min: true } : null;
        };

        return validator;
      }

    goToPrevious(form: any) {
        //if (this.save(form)) {
            // Navigate to the prev page
            this.router.navigate(['../_step-3_'],{relativeTo: this.route});
        //}
    }
    submitForm(form: any) {
        if (this.isValidForm(form)) {
            this.step1Data = this.formDataService.getStep1Data();
            this.step2Data = this.formDataService.getStep2Data();
            this.step3Data = this.formDataService.getStep3Data();
            this.step4Data = this.formDataService.getStep4Data();
            this.isFormValid = this.formDataService.isFormValid();
            if(this.isFormValid){
               this.responseProgress.progressResponse(true);
               this.cashAccountSvc.
                    accountOpening( this.step1Data,
                                    this.step2Data,
                                    this.step3Data,
                                    this.step4Data)
                                    .subscribe(res=>{
                                        console.log(res);
                                    this.onSaveSuccess();
                                  }, err => {
                                      console.log(err);
                                    this.onSaveError(err);
                                    })
            }
        }
    }
    onSecuritiesAccountSelect(values){
       this.step4Data.securities_account_ids =  values.toString();
    }
    // onFundAccountSelect(values){
    //    this.step4Data.found_account_ids =  values.toString();
    // }
    private onSaveSuccess() {
        this.profileSvc.getProfileInfo(this.authSvc.profileSysId);
        let successDialog = new SuccessDialog();
        this.showSaveErrored = false;
        this.errors = [];
        this.responseProgress.progressResponse(false);
        successDialog.title = 'success';
        successDialog.message = 'congratulation_your_document_submitted_successfully_text';
        successDialog.isPublic = false;
        this.successDialogSvc.showDialog(successDialog);
        //this.router.navigate(['../../'],{relativeTo: this.route});
        
    }

    private onSaveError(error = null) {
        if (typeof (error) === "string") {
            this.errors.push(error);
        } else {
            if (error) {
                this.errors = this.respUtils.getErrors(error);
            }
        }
        this.responseProgress.progressResponse(false);
        this.showSaveErrored = true;
    }

}
