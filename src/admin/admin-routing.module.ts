import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from './admin.guard';

import { AdminComponent } from './admin.component';

import { AdminLoginComponent } from './login/admin-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageClientsComponent } from './manage-client/manage-client.component';
import { ManageTransactionComponent } from './manage-transaction/manage-transaction.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';

const routes: Routes = [
    { path: 'login', component: AdminLoginComponent },
    { path:'', component: AdminComponent, canLoad: [AdminGuard],
      canActivate: [AdminGuard],   
        children: [{
            path: '',
            children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {  path: 'dashboard', component: DashboardComponent },
            {  path: 'clients-management', component: ManageClientsComponent },
            { path: 'account-management', component: ManageAccountComponent },
            {  path: 'transaction-management', component: ManageTransactionComponent }
            ]
        }] 
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule{

}