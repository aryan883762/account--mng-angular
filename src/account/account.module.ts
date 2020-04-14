import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';


import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { AccountAcivateComponent } from './activate-account/account-activate.component'
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HeaderComponent } from './header/header.component';
import { SuccessCheckmarkComponent } from './shared/components/success-checkmark/success.component'
@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    AccountRoutingModule,
    DialogModule,
    ProgressBarModule,
    SharedModule 
  ],
  declarations: [ 
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    AccountAcivateComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
    HeaderComponent,
    SuccessCheckmarkComponent
  ],
  exports: [ 
    AccountComponent 
  ],
  providers: [
    
  ]
})
export class AccountModule { }