import { Component, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

import { environment } from '../environments/environment';
import { Credentials } from './credentials';

import { ProgressColorService } from '../shared/services/progress-color.service';
import { ProgressLoadingService } from '../shared/services/loading-response-progress.service';
import { LanguageType } from '../shared/services/types';
import 'rxjs/add/operator/first';
import { AuthService } from 'src/auth/auth.service';

@Component({
  selector: 'site-account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.less']
})
export class AccountComponent {
  private responseProgressSub: ISubscription;
  isLoginActive: boolean = true;
  isAcountAlterMode: boolean = false;
  isResponseLoaded: boolean = false;
  constructor(
    private router: Router,
    private progressSvc: ProgressColorService,
    private responseProgress: ProgressLoadingService,
    private authService: AuthService,
    el: ElementRef
  ) {
    this.progressSvc.color = '#FFFFFF';
    this.responseProgressSub = this.responseProgress.progressResponse$.subscribe(res => {
            this.isResponseLoaded = res;
    });

  }

  ngOnInit() {
  }

  changeLanguage(lType: string) {
       if(lType === LanguageType.en_US)
       {
         localStorage.setItem(environment.storage.language,lType);
         
       }else{
         localStorage.setItem(environment.storage.language,lType);
       }

       window.location.reload();

    }

   get activeLanguage(){
        return localStorage.getItem(environment.storage.language);
    }
    
  ngOnDestroy() {
    this.progressSvc.reset();
    if (this.responseProgressSub) {
            this.responseProgressSub.unsubscribe();
    }
  }

  // isAlterMode(): boolean{
  //   let url = this.router.url;
  //   if(url.includes("activateAccount") || url.includes("resetPassword") || url.includes("forgotPassword")){
  //    return true;
  //   } else{
  //      return false;
  //   }
  // }

}
