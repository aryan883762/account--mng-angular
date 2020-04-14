import { Component, OnInit, Input, Output, EventEmitter }   from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Step2 }            from '../data/formData.model';
import { FormDataService }     from '../data/formData.service';
import { LookupService }       from '../../../../shared/services/lookup.service';
import { CountryCity } from '../../../../shared/services/country-city';
import { AccountBaseComponent } from '../../AccountBaseComponent';
@Component ({
    selector:     'margin-step-2'
    ,templateUrl: './step-2.component.html',
    styleUrls: ['../../style.less']
})

export class Step2Component extends AccountBaseComponent implements OnInit {
    title = 'Step-2';
    step2Data: Step2;
    form: any;
    public countryCity: CountryCity[];
    public countryCityCode: string[];
    sourceOfFunds: any[] = [];
    withdrawMethods: any[] = [];
    identityDeclaration1: any[] = [];
    identityDeclaration2: any[] = [];
    constructor(private router: Router, 
                private route: ActivatedRoute,
                private lookupSvc: LookupService, 
                private formDataService: FormDataService) {
      super();
      this.sourceOfFunds = this.lookupSvc.getAttributeValues('attrSourcesOfFund');
      this.identityDeclaration1  = this.lookupSvc.getAttributeValues('attrIdentityDeclaration1');
      this.identityDeclaration2 = this.lookupSvc.getAttributeValues('attrIdentityDeclaration2');
      this.withdrawMethods = this.lookupSvc.getAttributeValues('attrWithdrawMethod');

    }

    ngOnInit() {
        window.scrollTo(0, 200);
        this.step2Data = this.formDataService.getStep2Data();
    }
    onIdentityDeclaration1Change(id) {
      this.step2Data.identity_declaration1_id = id;
    }

    onIdentityDeclaration2Change(id){
      this.step2Data.identity_declaration2_id = id;
    }
    
    onSourceOfFundSelect(values){
       this.step2Data.sources_of_found_ids = values.toString();
    }

    onWithdrawMethodChange(id){
      this.step2Data.withdraw_method_id = id;
    }
    save(form: any): boolean {

        if (!form.valid) {
            return false;
        }
        if(!this.step2Data.identity_declaration1_id 
            || !this.step2Data.identity_declaration2_id
            || !this.step2Data.sources_of_found_ids
            || !this.step2Data.withdraw_method_id)
            {
           return false;
        }
       this.setPhoneNumber();
       this.formDataService.setStep2Data(this.step2Data);
        return true;
        
    }

    setPhoneNumber(){
        if(this.authorizedPerson1PhoneForm.value['phone'] && !this.authorizedPerson1PhoneForm.invalid){
            this.step2Data.authorised_person_1_country_phone_code = this.authorizedPerson1PhoneForm.value['phone']['dialCode'];
            this.step2Data.authorised_person_1_phone_number = this.authorizedPerson1PhoneForm.value['phone']['number'];  
        }
        if(this.authorizedPerson2PhoneForm.value['phone'] && !this.authorizedPerson2PhoneForm.invalid){
            this.step2Data.authorised_person_2_country_phone_code = this.authorizedPerson2PhoneForm.value['phone']['dialCode'];
            this.step2Data.authorised_person_2_phone_number = this.authorizedPerson2PhoneForm.value['phone']['number'];   
        }
        if(this.authorizedPerson3PhoneForm.value['phone'] && !this.authorizedPerson3PhoneForm.invalid){
            this.step2Data.authorised_person_3_country_phone_code = this.authorizedPerson3PhoneForm.value['phone']['dialCode'];
            this.step2Data.authorised_person_3_phone_number = this.authorizedPerson3PhoneForm.value['phone']['number'];    
        }  
    }
    getPasswordCollection(type: string){
        switch(type){
            case 'email':{
             this.step2Data.password_collection_by_email_yesno = 1;
             this.step2Data.password_collection_by_mail_yesno = 0;
             this.step2Data.password_collection_in_person_yesno = 0;
             break;
            }
            case 'mail': {
             this.step2Data.password_collection_by_email_yesno = 0;
             this.step2Data.password_collection_by_mail_yesno = 1;
             this.step2Data.password_collection_in_person_yesno = 0;
             break;
            }
            case 'in_person': {
             this.step2Data.password_collection_by_email_yesno = 0;
             this.step2Data.password_collection_by_mail_yesno = 0;
             this.step2Data.password_collection_in_person_yesno = 1;
             break;
            }
            default: {
             this.step2Data.password_collection_by_email_yesno = 0;
             this.step2Data.password_collection_by_mail_yesno = 0;
             this.step2Data.password_collection_in_person_yesno = 0;
             break;
            }
        }
     }
     goToPrevious(form: any) {
        //if (this.save(form)) {
            // Navigate to the prev page
            this.router.navigate(['../_step-1_'],{relativeTo: this.route});
        //}
    }

    goToNext(form: any) {
        console.log(this.step2Data);
        if (this.save(form)) {
            // Navigate to the next page
            this.router.navigate(['../_step-3_'],{relativeTo: this.route});
        }
    }
}
