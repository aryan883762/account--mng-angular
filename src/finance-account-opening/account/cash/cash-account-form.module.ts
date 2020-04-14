import { NgModule }           from '@angular/core';
import { FormsModule }        from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent }    from './navbar/navbar.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
/* Feature Components */
import { Step1Component }  from './step-1/step-1.component';
import { Step2Component } from './step-2/step-2.component';
import { Step3Component } from './step-3/step-3.component';
import { Step4Component } from './step-4/step-4.component';
import { CashAccountFormComponent } from './cash-account-form.component';
/* Routing Module */
import { CashAccountFormRoutingModule }   from './cash-account-form.routing';

import { FormDataService }    from './data/formData.service';
import { WorkflowService }    from './workflow/workflow.service';
import { CashAccountService } from './cash-account.service';

@NgModule({
    imports:[ 
            FormsModule,
            CashAccountFormRoutingModule,
            CommonModule,
            ReactiveFormsModule,
            SharedModule
          ],
    declarations: [ 
         CashAccountFormComponent,
         NavbarComponent,
         Step1Component,
         Step2Component,
         Step3Component,
         Step4Component
         ],
    providers:[ 
        FormDataService,
        WorkflowService,
        CashAccountService
    ]
})

export class CashAccountFormModule {}