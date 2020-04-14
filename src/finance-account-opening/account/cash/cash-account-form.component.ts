import { Component, OnInit, Input }   from '@angular/core';
import { Subscription, ISubscription } from 'rxjs/Subscription';

import { FormDataService }            from './data/formData.service';
import { ProgressLoadingService } from '../../../shared/services/loading-response-progress.service';
@Component ({
    selector:     'multi-step-wizard-app'
    ,templateUrl: './cash-account-form.component.html',
    styleUrls: ['../style.less']
})

export class CashAccountFormComponent implements OnInit {
    title = 'Multi-Step Wizard';
    @Input() formData;
    private responseProgressSub: ISubscription;
    isResponseLoaded: boolean = true;
    constructor(private formDataService: FormDataService,private responseProgress: ProgressLoadingService) {
      this.responseProgressSub = this.responseProgress.progressResponse$.subscribe(res => {
            this.isResponseLoaded = res;
            
        });
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        console.log(this.title + ' loaded!');
    }


    ngOnDestroy() {
        this.responseProgressSub.unsubscribe();
    }
}