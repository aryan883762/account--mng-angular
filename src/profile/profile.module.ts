import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// entry point
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';

// profile headers
import { ProfileHeaderDesktopComponent } from './profile-header-desktop.component';
import { ProfileHeaderMobileComponent } from './profile-header-mobile.component';

// overview section
import { ProfileOverviewComponent } from './overview/profile-overview.component';

import { WithdrawFundComponent } from './withdraw-fund/withdraw-fund.component';
import { DepositFundComponent } from './deposit-fund/deposit-fund.component';
import { StockHistoryComponent } from './stock-history/stock-history.component';
import { TransferToStockComponent } from './transfer-to-stock/transfer-to-stock.component';

import { MarginAccountComponent } from './shared/margin-account/margin-account.component';
import { CashAccountComponent } from './shared/cash-account/cash-account.component';
import { TransactionListComponent } from './shared/transaction-list/transaction-list.component';

//settings
import { PasswordSettingComponent } from './settings/password/password.component';
import { ProfileInfoSettingComponent } from './settings/profile-info/profile-info.component';
import { PersonalInfoSettingComponent } from './settings/personal-info/personal-info.component';



@NgModule({
    imports: [ 
        FormsModule,
        SharedModule,
        CommonModule,
        ProfileRoutingModule
    ],
    declarations: [
        ProfileComponent,
        ProfileHeaderDesktopComponent,
        ProfileHeaderMobileComponent,
        ProfileOverviewComponent,
        MarginAccountComponent,
        CashAccountComponent,
        TransactionListComponent,
        WithdrawFundComponent,
        DepositFundComponent,
        StockHistoryComponent,
        TransferToStockComponent,
        PasswordSettingComponent,
        ProfileInfoSettingComponent,
        PersonalInfoSettingComponent
    ],
    exports: [ 
        ProfileComponent
    ],
    providers: [
    ]
})
export class ProfileModule {}