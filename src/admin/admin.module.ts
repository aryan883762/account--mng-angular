import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminGuard } from './admin.guard';

import { AdminLoginComponent } from './login/admin-login.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageClientsComponent } from './manage-client/manage-client.component';
import { ManageTransactionComponent } from './manage-transaction/manage-transaction.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { SharedModule } from '../shared/shared.module';

import { AdminService } from './services/admin.service';
import { UtilService } from './services/util.service';
@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    DashboardComponent,
    ManageClientsComponent,
    ManageTransactionComponent,
    ManageAccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    SharedModule
  ],
  exports: [AdminComponent],
  providers: [AdminGuard, AdminService, UtilService]
})
export class AdminModule { }
