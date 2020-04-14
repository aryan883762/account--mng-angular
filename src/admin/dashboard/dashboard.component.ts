import { Component, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { BaseAdminComponent } from '../BaseAdminComponent';
import { UtilService } from '../services/util.service';
@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['../styles/common.less']
})
export class DashboardComponent extends BaseAdminComponent{
   public users: any[] = [];
   public totalRecords: number = 0;
   constructor(
  	 route: ActivatedRoute,
    router: Router,
    utilSvc: UtilService,
   	private adminSvc: AdminService,
   	private ref: ChangeDetectorRef){
    super(route, router, utilSvc);
   }

   ngOnInit(){
   	  this.adminSvc.getProfileList().subscribe((res)=>{
	    this.users = res['list'];
	    this.totalRecords = this.users.length;
	    this.ref.detectChanges();
		    }, err => {
		   this.onError(err);
		});
   }
}