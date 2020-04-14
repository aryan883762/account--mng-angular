import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseAdminComponent } from '../BaseAdminComponent';
import { AdminService } from '../services/admin.service';
import { IdentityPreviewDialogService } from '../../shared/dialogs/identity-preview-dialog/dialog.service';
import { LazyLoadEvent } from '../types';
import { MessageService } from 'primeng/api';
import { Profile } from './model';
import { UtilService } from '../services/util.service';
declare var $: any;
@Component({
    selector: 'manage-clients',
    templateUrl: './manage-client.component.html',
    styleUrls: ['../styles/common.less'],
    providers: [MessageService]
})
export class ManageClientsComponent extends BaseAdminComponent{
  users: any[] = [];
  datasource: any[] = [];
  totalRecords: number;
  loading: boolean;
  pageSizeOptions = [30, 50, {showAll: 'All'}];
  pageSize = 30;
  disable = false;
  constructor(
  	route: ActivatedRoute,
    router: Router,
    utilSvc: UtilService,
    private adminSvc: AdminService,
    private ref: ChangeDetectorRef,
    private messageSvc: MessageService,
    private identityPreviewDialogSvc: IdentityPreviewDialogService){
    super(route, router, utilSvc);
    setTimeout(()=>{this.disable = true}, 5000)
    }

    ngOnInit() {
    }
    tableData(event) {  
        this.loading = true;
        this.adminSvc.getProfileList().subscribe((res)=>{
          this.datasource = res.list;
          this.totalRecords = this.datasource.length;
          
          this.users = this.datasource.slice(event.first, (event.first + event.rows));
          this.loading = false;
          this.ref.detectChanges();
          }, err => {
            this.onError(err);
        })
    }

    toggleExpand(isExpanded: boolean, accountID: number){
        if(isExpanded){
          if($('i.pi.pi-chevron-down').length){
           let el = $('i.pi.pi-chevron-down').parent()[0];
           el.click();
         }
       }
     }
    updateUser(user: Profile){
      this.adminSvc.updateUser(user).subscribe((res)=>{
        this.onSuccess();
      },err=>{
        this.onError(err);
        this.onRequestFailed();
      })
    }

    deleteUser(id: any){
      this.adminSvc.deleteUser(id).subscribe((res)=>{
        this.onSuccess();
        window.location.reload();
      },err=>{
        this.onError(err);
        this.onRequestFailed();
      })
    }

    openDocument(data: any) {
     this.identityPreviewDialogSvc.showDialog(data);
    }
 

}