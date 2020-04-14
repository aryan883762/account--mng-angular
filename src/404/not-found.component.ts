import { Component } from "@angular/core";
import { LookupService } from 'src/shared/services/lookup.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/auth/auth.service';
import { environment } from '../environments/environment';
@Component({
    selector: 'site-not-found',
    templateUrl: 'not-found.component.html',
    styleUrls: ['./styles.less']
})
export class NotFoundComponent{
       constructor(private lookupService: LookupService, 
        private _location: Location,
        private router: Router,
        private authSvc: AuthService){
        this.lookupService.HideLoaderLogo('true')
       }
       backClicked() {
        this._location.back();
      }
      homePage(){
        if(this.authSvc.accountType === 'admin'){
            this.router.navigate(['/admin']);
        }else{
            this.router.navigate(['/']);
        }
        
      }
  
}