import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ISubscription, Subscription } from 'rxjs/Subscription';
import { ProfileService } from '../shared/services/profile.service';
import { ProgressLoadingService } from '../shared/services/loading-response-progress.service';
import { LanguageType } from '../shared/services/types';
import { environment } from '../environments/environment';
@Component({
    selector: 'crm-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['./styles.less']
})
export class ProfileComponent implements OnInit, OnDestroy {
   private routeSub: ISubscription;
   private profileSub: Subscription;
   profile: any;

    constructor(private route: ActivatedRoute,
     private profileSvc: ProfileService,
     private responseProgress: ProgressLoadingService) { 
        this.profileSub = this.profileSvc.getProfileInfo$.subscribe(res => {
            environment.profileData = res;
            this.profile = res;
        });
    }

    ngOnInit() {
       this.routeSub = this.route.data.subscribe((data: { profile: any }) => {
       this.profile = data.profile;
       environment.profileData = data.profile;
       this.responseProgress.progressResponse(false);
        console.log(this.profile);
        });
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
       if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
    }

}
