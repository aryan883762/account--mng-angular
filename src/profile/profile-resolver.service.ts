import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

import { ProfileService } from '../shared/services/profile.service';

import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class ProfileResolverService implements Resolve<any> {
    constructor(
        private profileSvc: ProfileService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        
        let viewingProfileSysId = parseInt(route.paramMap.get('profileSysId'));
        
        return this.profileSvc.getProfile(viewingProfileSysId)
            .map(profile => {
                if (profile) {
                    return profile;
                } else {
                  this.router.navigate(['/']);
                    return null;
                }
            })
            .catch(error => {
                this.router.navigate(['/']);
                return Observable.of(null);
            });
            
    }

 
}