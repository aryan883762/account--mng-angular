import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
export class AccountBaseComponent{
    separateDialCode = true;
    SearchCountryField = SearchCountryField;
    TooltipLabel = TooltipLabel;
    CountryISO = CountryISO;
    preferredCountries: CountryISO[] = [CountryISO.China, CountryISO.HongKong, CountryISO.Singapore];
    phoneNumber: any;
    
    //personal number
    mobilePhoneForm = new FormGroup({
        phone: new FormControl(undefined, [Validators.required])
    });
    homePhoneForm = new FormGroup({
        phone: new FormControl(undefined, [Validators.required])
    });

    //employer number
    employerPhoneForm = new FormGroup({
        phone: new FormControl(undefined, [Validators.required])
    });

    //authorized person number
    authorizedPerson1PhoneForm = new FormGroup({
        phone: new FormControl('')
    });
    authorizedPerson2PhoneForm = new FormGroup({
        phone: new FormControl('')
    });
    authorizedPerson3PhoneForm = new FormGroup({
        phone: new FormControl('')
    });

    constructor() {
    }
  
}