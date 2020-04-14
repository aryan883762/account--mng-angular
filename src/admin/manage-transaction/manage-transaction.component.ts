import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseAdminComponent } from '../BaseAdminComponent';
import { AdminService } from '../services/admin.service';
import { LazyLoadEvent } from '../types';
import { Transaction } from './model';
import { UtilService } from '../services/util.service';
@Component({
    selector: 'manage-transaction',
    templateUrl: './manage-transaction.component.html'
})
export class ManageTransactionComponent extends BaseAdminComponent{
  transactions: any[] = [];
  datasource: any[] = [];
  public cols: any[];
  transaction: Transaction;
  totalRecords: number;
  loading: boolean;
  pageSizeOptions = [30, 50, {showAll: 'All'}]
  disable = false;
  pageSize = 30;
  constructor(
  	route: ActivatedRoute,
    router: Router,
    utilSvc: UtilService,
    private adminSvc: AdminService,
    private ref: ChangeDetectorRef){
    super(route, router, utilSvc);
    setTimeout(()=>{this.disable = true}, 5000)
  }

    ngOnInit() {
    }
    getTransactionInfo(data: any){
       this.transaction = new Transaction();
       if(data){
       this.transaction.id =  data['id'];
       this.transaction.status = data['status'];
       this.transaction.reason = data['reason'];
       }
    }
    updateTransactionStatus(form: any){
      //  if(form.invalid){
      //      return false;
      //  }
       this.adminSvc.checkApply(this.transaction).subscribe((res)=>{
        this.getTransactions({first:0, rows: this.pageSize});
        this.onSuccess(); 
       }, err=>{
        this.onError(err);
       })
    }
    tableData(event) {  
        this.loading = true;
        this.getTransactions(event);
    }

    getTransactions(event){
        this.adminSvc.getTransactionList().subscribe((res)=>{
            this.datasource = res.list;
            this.totalRecords = this.datasource.length;
            
            this.transactions = this.datasource.slice(event.first, (event.first + event.rows));
            this.loading = false;
            this.ref.detectChanges();
            }, err => {
              this.onError(err);
          })
    }

}