import { Component, OnInit, Input }   from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Step1 }            from '../data/formData.model';
import { FormDataService }     from '../data/formData.service';
import { LookupService }       from '../../../../shared/services/lookup.service';
import { ProfileService } from '../../../../shared/services/profile.service'; 
import { ErrorDialogService } from '../../../../shared/dialogs/error-dialog/dialog.service';
import { ErrorDialog } from '../../../../shared/dialogs/error-dialog/models';
import { AccountBaseComponent } from '../../AccountBaseComponent';
@Component ({
    selector:     'margin-step-1',
    templateUrl: './step-1.component.html',
    styleUrls: ['../../style.less']
})

export class Step1Component extends AccountBaseComponent implements OnInit {
    title = 'Step-1';
    step1Data: Step1;
    form: any;

    constructor(private router: Router, private route: ActivatedRoute,
    private lookupSvc: LookupService, private formDataService: FormDataService,
    private profileSvc: ProfileService, private errorDialogSvc: ErrorDialogService) {
        super();
    }

    ngOnInit() {
        window.scrollTo(0, 200);
        this.step1Data = this.formDataService.getStep1Data();
         if (this.profileSvc.hasCashAccount && this.profileSvc.isCashAccountCompleted){
            let err = new ErrorDialog();
            err.title = 'Error';
            err.message = "Oops! Cash account aleady exist."
            err.isPublic = false;
            this.errorDialogSvc.showDialog(err);
            return false;
        }
    }

    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }
        if (this.mobilePhoneForm.invalid &&  this.employerPhoneForm.invalid ) {
            return false;
        }
         this.step1Data.country_phone_code = this.mobilePhoneForm.value['phone']['dialCode'];
         this.step1Data.phone_number = this.mobilePhoneForm.value['phone']['number'];  
         this.step1Data.employer_country_phone_code = this.employerPhoneForm.value['phone']['dialCode'];
         this.step1Data.employer_phone_number = this.employerPhoneForm.value['phone']['number'];   
         if(this.homePhoneForm.value['phone'] && this.homePhoneForm.invalid){
             return false;  
         }
         if(!this.homePhoneForm.invalid){
            this.step1Data.country_phone_code_home = this.homePhoneForm.value['phone']['dialCode'];
            this.step1Data.phone_number_home = this.homePhoneForm.value['phone']['number'];  
         }

         this.formDataService.setStep1Data(this.step1Data);
         return true;
    }

    goToNext(form: any) {
        console.log(this.step1Data);
        if (this.save(form)) {
            // Navigate to the work page
            this.router.navigate(['../_step-2_'],{relativeTo: this.route});
        }
    }
}
