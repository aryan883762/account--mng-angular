import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseAdminComponent } from '../BaseAdminComponent';
import { AdminService } from '../services/admin.service';
import { LookupService } from '../../shared/services/lookup.service';
import { LazyLoadEvent } from '../types';
import { Account, AccountInfo } from './model';
import { UtilService } from '../services/util.service';
declare var $: any;
@Component({
    selector: 'manage-account',
    templateUrl: './manage-account.component.html',
    styleUrls: ['../styles/common.less']
})
export class ManageAccountComponent extends BaseAdminComponent{
  accounts: any[] = [];
  datasource: any[] = [];
  public cols: any[];
  accountInfo: AccountInfo;
  account: Account;
  totalRecords: number;
  loading: boolean;
  pageSizeOptions = [30, 50, {showAll: 'All'}]
  pageSize = 30
  disable = false;
  sourceOfFunds: number[] = [];
  selectedDisclosureValues: number[] = [];
  selectedFundAccount: number[] = [];
  selectedSecuritiesAccount: number[] = [];

  constructor(
  	route: ActivatedRoute,
    router: Router,
    utilSvc: UtilService,
    private adminSvc: AdminService,
    private lookupSvc: LookupService,
    private ref: ChangeDetectorRef){
    super(route, router, utilSvc);
    setTimeout(()=>{this.disable = true}, 5000)
  }

    ngOnInit() {

    }

    tableData(event) {  
        this.loading = true;
        this.adminSvc.getAccountList().subscribe((res)=>{
          this.datasource = res.list;
          this.totalRecords = this.datasource.length;
          
          this.accounts = this.datasource.slice(event.first, (event.first + event.rows));
          this.loading = false;
          this.ref.detectChanges();
          }, err => {
            this.onError(err);
        })
    }

    getAccountInfo(isExpanded: boolean, accountID: number){
        if(isExpanded){
         if($('i.pi.pi-chevron-down').length){
           let el = $('i.pi.pi-chevron-down').parent()[0];
           el.click();
         }
          this.adminSvc.accountInfo(accountID).subscribe((res)=>{
            this.accountInfo = res['account_info'];
            this.account = res['account'];
            this.sourceOfFunds = this.accountInfo.sources_of_found_ids?this.accountInfo.sources_of_found_ids.split(',').map(Number):[];
            this.selectedDisclosureValues = this.accountInfo.other_information_disclosure_ids?this.accountInfo.other_information_disclosure_ids.split(',').map(Number):[];
            this.selectedFundAccount = this.accountInfo.found_account_ids?this.accountInfo.found_account_ids.split(',').map(Number):[];
            this.selectedSecuritiesAccount = this.accountInfo.securities_account_ids?this.accountInfo.securities_account_ids.split(',').map(Number):[];
            console.log(this.accountInfo);
            this.ref.detectChanges();
          })
        }
        console.log(isExpanded, accountID);
    }

    downloadOpeningForm(accountID:any){
        this.adminSvc.getOpeningForm(accountID).subscribe((pdfURL)=>{
          console.log(pdfURL); 
          window.open(pdfURL);    
        }, err=>{
          this.onError(err);
          this.onRequestFailed();
        })
    }

    submitForm(form: any){
           if (!form.valid) {
            return false;
        }

    }

    updateAccount(){
       this.adminSvc.updateAccount(this.account).subscribe((res)=>{
            this.onSuccess();
        },err=>{
          this.onError(err);
          this.onRequestFailed();
        })
    }

}