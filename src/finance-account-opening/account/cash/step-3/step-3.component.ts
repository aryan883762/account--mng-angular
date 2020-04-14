import { Component, OnInit }   from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { Step3, Step1 }            from '../data/formData.model';
import { FormDataService }     from '../data/formData.service';
import { LookupService }       from '../../../../shared/services/lookup.service';
@Component ({
    selector:     'margin-step-3'
    ,templateUrl: './step-3.component.html',
    styleUrls: ['../../style.less']
})

export class Step3Component implements OnInit {
    title = 'Step-3';
    step3Data: Step3;
    step1Data: Step1;
    form: any;
    disclosure: any[] = [];
    constructor(private router: Router, 
                private route: ActivatedRoute,
                private lookupSvc: LookupService, 
                private formDataService: FormDataService) {
    //   this.disclosure = this.lookupSvc.getAttributeValues('attrOtherInformationDisclosure');
    }

    ngOnInit() {
        window.scrollTo(0, 200);
        this.step3Data = this.formDataService.getStep3Data();
    }

    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }
        // if(!this.step3Data.other_information_disclosure_ids){
        //    return false;
        // }   
        this.formDataService.setStep3Data(this.step3Data);
        return true;
    }

    // onDisclosureSelect(values){
    //   this.step3Data.other_information_disclosure_ids = values.toString();
    // }
    
    goToPrevious(form: any) {
        //if (this.save(form)) {
            // Navigate to the prev page
            this.router.navigate(['../_step-2_'],{relativeTo: this.route});
        //}
    }
    goToNext(form: any) {
        this.step1Data =  this.formDataService.getStep1Data();
        this.step3Data.tax_id = (this.step3Data.tax_id)?this.step3Data.tax_id:this.step1Data.identification_number;
        setTimeout(() => {
            if (this.save(form)) {
                // Navigate to the next page
                this.router.navigate(['../_step-4_'],{relativeTo: this.route});
            }
        }, 500);

    }
}
