import { Component, ChangeDetectionStrategy  } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, ISubscription } from 'rxjs/Subscription';

import { AuthService, AuthResult } from '../auth/auth.service';
import { ProgressColorService } from '../shared/services/progress-color.service';
import { ProgressLoadingService } from '../shared/services/loading-response-progress.service';
import 'rxjs/add/operator/filter';
import { environment } from '../environments/environment';
import { Title } from '@angular/platform-browser';
import { LookupService } from 'src/shared/services/lookup.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./styles.less']
})
export class AppComponent {
    progressColor: string;
    private responseProgressSub: ISubscription;
    private progressSub: Subscription;
    private routerSub: Subscription;
    isAdminMode: boolean;
    hideLoader: boolean;
    isResponseLoaded: boolean = true;
    constructor(
        private router: Router,
        private authSvc: AuthService,
        private progressSvc: ProgressColorService,
        private responseProgress: ProgressLoadingService,
        private titleService: Title,
        private lookupService: LookupService
    ) {
        this.progressColor = this.progressSvc.color;
       
        this.progressSub = this.progressSvc.changed$.subscribe(c => {
            this.progressColor = c;
        });
        this.isResponseLoaded = false;
        this.responseProgressSub = this.responseProgress.progressResponse$.subscribe(res => {
            this.isResponseLoaded = res;
        });
        this.lookupService.HideLoaderLogo$.subscribe((res)=>{
            this.hideLoader = true;
        })
    }

    ngOnInit() {
        this.authSvc.isOnCRMSite = 'true';
        let language = localStorage.getItem(environment.storage.language);
        if(language === 'en_US'){
            this.titleService.setTitle('');
        }else{
            this.titleService.setTitle('');
        }

        window.addEventListener('focus', this.onFocus);
        window.addEventListener('blur', this.onBlur);
        document.addEventListener("visibilitychange", this.visibilityChange);

        this.routerSub = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(event => {
                if(event['url'].includes('admin') && !this.hideLoader){
                  this.hideLoader = true;
                }
                this.onNavigationEnd();
                window.scrollTo(0, 0);
        });

        if (environment.maintenance){
            this.router.navigate(['/maintenance']);
        }
    }

    ngOnDestroy() {
        this.routerSub.unsubscribe();
        this.progressSub.unsubscribe();
        this.responseProgressSub.unsubscribe();
    }
    
    onFocus = (event) => {
        this.authSvc.isOnCRMSite = 'true';
    }

    onBlur = (event) => {
        this.authSvc.isOnCRMSite = 'false';
    }

    visibilityChange = (event) => {
        if (document.hidden) {
            this.authSvc.isOnCRMSite = 'false';
        } else {
            this.authSvc.isOnCRMSite = 'true';
        }
    }

    onNavigationEnd() {
        window.scrollTo(0, 0);
    }
}