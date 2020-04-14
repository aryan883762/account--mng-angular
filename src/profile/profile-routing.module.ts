import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { ProfileResolverService } from './profile-resolver.service';
import { ProfileComponent } from './profile.component';

import { ProfileOverviewComponent } from './overview/profile-overview.component';
import { WithdrawFundComponent } from './withdraw-fund/withdraw-fund.component';
import { DepositFundComponent } from './deposit-fund/deposit-fund.component';
import { StockHistoryComponent } from './stock-history/stock-history.component';
import { TransferToStockComponent } from './transfer-to-stock/transfer-to-stock.component';

import { PasswordSettingComponent } from './settings/password/password.component';
import { ProfileInfoSettingComponent } from './settings/profile-info/profile-info.component';
import { PersonalInfoSettingComponent } from './settings/personal-info/personal-info.component';

const routes: Routes = [
  {
    path: ':profileSysId',
    component: ProfileComponent,
    resolve: { profile: ProfileResolverService },
    children: [{
      path: '',
      children: [
        { path: '', redirectTo: 'overview', pathMatch: 'full' },

        { path: 'overview', component: ProfileOverviewComponent },

        { path: 'fund-deposit', component: DepositFundComponent },

        { path: 'fund-withdraw', component: WithdrawFundComponent },

        { path: 'stock-history', component: StockHistoryComponent },

        { path: 'transfer-to-stock', component: TransferToStockComponent },
        
        { path: 'setting/personal-info', component: PersonalInfoSettingComponent },
        
        { path: 'setting/profile-info', component: ProfileInfoSettingComponent },
        
        { path: 'setting/password', component: PasswordSettingComponent },
        
        { path:'account-opening/margin', 
          loadChildren:()=>import(`../account-account-opening/account/margin/margin-account-form.module`)
          .then(m=>m.MarginAccountFormModule)},
          
        { path:'account-opening/cash', 
          loadChildren:()=>import(`../account-account-opening/account/cash/cash-account-form.module`)
          .then(m=>m.CashAccountFormModule)} 
      ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProfileResolverService]
})
export class ProfileRoutingModule { }