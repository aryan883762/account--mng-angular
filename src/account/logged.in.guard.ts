import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, Route } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { environment } from '../environments/environment';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(
        private authSvc: AuthService,
        private router: Router
    ) { }

    canActivate() {
        if (!this.authSvc.isLoggedIn) {
            return true;
        }
        if(this.authSvc.accountType === 'admin'){
            this.router.navigate(['/admin']);
        }else{
            let profile = environment.site.profileUrl(this.authSvc.profileSysId);
            this.router.navigate([profile], { queryParamsHandling: 'merge' });
        }

        return false;
    }
}