import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountAcivateComponent } from './activate-account/account-activate.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoggedInGuard } from './logged.in.guard';
const routes: Routes = [
    {
    path: '',
    component: AccountComponent,
    children: [{
      path: '',
      children: [
        { path: '', redirectTo: 'signIn', pathMatch: 'full' },

        { path: 'signIn', canActivate: [LoggedInGuard], component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'forgotPassword', component: RequestPasswordComponent },
        { path: 'resetPassword', component: ResetPasswordComponent },
        { path: 'activateAccount', component: AccountAcivateComponent }
      ]
    }]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AccountRoutingModule {}
