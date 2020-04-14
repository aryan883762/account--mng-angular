import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private authSvc: AuthService,
        private router: Router
    ) { }

    canActivate() {
        if (this.authSvc.isLoggedIn && this.authSvc.accountType == 'client') {
            return true;
        }
        this.router.navigate(['/account']);
        return false;
    }

    canLoad(route: Route) {
        if (environment.maintenance){
            this.router.navigate(['/maintenance']);
            return false;
        }
        return true;
    }
}