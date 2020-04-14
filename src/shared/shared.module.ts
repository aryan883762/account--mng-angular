import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// components or directives
import { TwoDigitDecimaNumberDirective } from './directives/two-digit-decima-number.directive';
import { SuccessDialogComponent } from './dialogs/success-dialog/dialog.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/dialog.component';
import { IdentityVarificationDialogComponent } from './dialogs/identity-varification-dialog/dialog.component';
import { IdentityPreviewDialogComponent } from './dialogs/identity-preview-dialog/dialog.component';
import { IdentityStatusDialogComponent } from './dialogs/identity-status-dialog/dialog.component';

// services
import { ProgressColorService } from './services/progress-color.service';
import { LookupService } from './services/lookup.service';
import { ProfileService } from './services/profile.service';
import { StockAccountService } from './services/stock-account.service';
import { SuccessDialogService } from './dialogs/success-dialog/dialog.service';
import { ErrorDialogService } from './dialogs/error-dialog/dialog.service';
import { IdentityVarificationDialogService } from './dialogs/identity-varification-dialog/dialog.service';
import { IdentityPreviewDialogService } from './dialogs/identity-preview-dialog/dialog.service';
import { IdentityStatusDialogService } from './dialogs/identity-status-dialog/dialog.service';
import { MessageService } from 'primeng/api';

//primeng controls
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FileUploadModule } from 'primeng/fileupload';
import { BlockUIModule } from 'primeng/blockui';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { MessagesModule } from 'primeng/messages';
import { FieldsetModule } from 'primeng/fieldset';
import { SelectButtonModule } from 'primeng/selectbutton';

// dialogs
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TranslatePipe } from './pipes/translate.pipe';
import { PrefixPipe } from './pipes/prefix_vowel.pipe';
import { CheckboxGroupComponent } from './components/checkbox-group/checkbox-group.component'; 
import { RadioButtonGroupComponent } from './components/radiobutton-group/radiobutton-group.component';
import { PhoneGroupComponent } from './components/phone-group/phone-group.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        DropdownModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        RadioButtonModule,
        CheckboxModule,
        CardModule,
        TableModule,
        CalendarModule,
        InputTextareaModule,
        ProgressSpinnerModule,
        FileUploadModule,
        BlockUIModule,
        PanelModule,
        ToastModule,
        MessagesModule,
        FieldsetModule,
        SelectButtonModule,
        BsDropdownModule.forRoot(),
        NgxIntlTelInputModule
    ],
    declarations: [
        TwoDigitDecimaNumberDirective,
        SuccessDialogComponent,
        ErrorDialogComponent,
        IdentityVarificationDialogComponent,
        IdentityPreviewDialogComponent,
        IdentityStatusDialogComponent,
        CheckboxGroupComponent,
        RadioButtonGroupComponent,
        PhoneGroupComponent,
        TranslatePipe,
        PrefixPipe
    ],
    exports: [
        TwoDigitDecimaNumberDirective,
        SuccessDialogComponent,
        ErrorDialogComponent,
        IdentityVarificationDialogComponent,
        IdentityPreviewDialogComponent,
        IdentityStatusDialogComponent,
        CheckboxGroupComponent,
        RadioButtonGroupComponent,
        PhoneGroupComponent,
        TranslatePipe,
        DropdownModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        RadioButtonModule,
        CheckboxModule,
        CardModule,
        TableModule,
        CalendarModule,
        InputTextareaModule,
        ProgressSpinnerModule,
        FileUploadModule,
        BlockUIModule,
        PanelModule,
        ToastModule,
        TabViewModule,
        MessagesModule,
        FieldsetModule,
        SelectButtonModule,
        NgxIntlTelInputModule
    ],
    providers: [
         MessageService,
         LookupService,
         ProfileService,
         StockAccountService,
         SuccessDialogService,
         ErrorDialogService,
         IdentityVarificationDialogService,
         IdentityPreviewDialogService,
         IdentityStatusDialogService
    ]
})
export class SharedModule {}
