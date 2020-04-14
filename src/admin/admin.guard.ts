import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, Route } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { environment } from '../environments/environment';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private authSvc: AuthService,
        private router: Router
    ) { }

    canActivate() {
        if (this.authSvc.isLoggedIn  && this.authSvc.accountType == 'admin') {
            return true;
        }
        this.router.navigate(['/admin/login']);
        return false;
    }

}