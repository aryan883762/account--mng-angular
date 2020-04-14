import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Step1Component }    from './step-1/step-1.component';
import { Step2Component } from './step-2/step-2.component';
import { Step3Component } from './step-3/step-3.component';
import { Step4Component } from './step-4/step-4.component';
import { CashAccountFormComponent } from './cash-account-form.component';
import { WorkflowGuard }        from './workflow/workflow-guard.service';
import { WorkflowService }      from './workflow/workflow.service';


export const appRoutes: Routes = [
    {
        path: '',
        component: CashAccountFormComponent,
        children: [{
          path: '',
          children: [
            { path: '', redirectTo: '_step-1_', pathMatch: 'full' },
            {  path: '_step-1_', component: Step1Component },
            {  path: '_step-2_', component: Step2Component, canActivate: [WorkflowGuard] },
            {  path: '_step-3_', component: Step3Component, canActivate: [WorkflowGuard] },
            {  path: '_step-4_', component: Step4Component, canActivate: [WorkflowGuard] }
          ]
        }]
      }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
  providers: [WorkflowGuard]
})

export class CashAccountFormRoutingModule {}