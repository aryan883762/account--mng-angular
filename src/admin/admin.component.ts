import { Component } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UtilService, ResponseData } from './services/util.service';
@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./styles/layout.less']
})
export class AdminComponent{
	  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private utilSvc: UtilService,
        private messageService: MessageService
        ) {
           this.utilSvc.showMessage$.subscribe((res)=>{
              this.showMessage(res)
           })
        }
	logout(){
    //this.authSvc.logout();
    localStorage.clear();
    this.router.navigate(['/admin/login']);
    }
    showMessage(response: ResponseData){
      this.messageService.add({severity: response.type, summary: response.tilte, detail: response.message})
    }
    // showSuccess(msg: string) {
    //     this.messageService.add({severity:'success', summary: 'Success Message', detail: msg});
    // }
    // showError() {
    //     this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
    // }
}