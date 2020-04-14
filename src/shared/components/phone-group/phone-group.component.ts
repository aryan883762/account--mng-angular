import { Component, OnInit, OnChanges, ViewChild, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
@Component({
    selector: 'phone-group',
    templateUrl: './phone-group.component.html'
    })
export class PhoneGroupComponent implements OnInit {
    @Input() fromGroupName: string;
    form: FormGroup;
    separateDialCode = true;
    SearchCountryField = SearchCountryField;
    TooltipLabel = TooltipLabel;
    CountryISO = CountryISO;
    preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
    phoneNumber: any;

    constructor() {

    }
    ngOnInit(){
    }

    }