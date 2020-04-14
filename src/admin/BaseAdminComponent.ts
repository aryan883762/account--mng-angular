import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { AuthService } from '../auth/auth.service';
import { SiteApiResponseUtilities } from '../shared/services/SiteApiResponse';
import { UtilService, ResponseData } from './services/util.service';
export class BaseAdminComponent implements OnInit, OnDestroy {
    
    private respUtils = new SiteApiResponseUtilities();
    public errors: string[];
    public msgs: any[] = [];
    public response: ResponseData;
    private routerSub: ISubscription;

        constructor(
        private route: ActivatedRoute,
        private router: Router,
        private utilSvc: UtilService
        ) {

        this.routerSub = this.router.events.subscribe(
            () => window.scrollTo(0, 0)
        );
    }

    ngOnInit() {
     
    }

    ngOnDestroy() {
        if (this.routerSub) {
            this.routerSub.unsubscribe();
        }
    }

    onError(error) {
        const errors = this.respUtils.getErrors(error);

        if (errors.length === 0) {
            errors.push("An unknown error occurred. Please try again.");
        }

        this.errors = errors;
        console.log(this.errors);
        this.onRequestFailed();
    }

    onSuccess(){
        this.errors = [];
        this.msgs = [];
        this.response = new ResponseData();
        this.response.type = 'success';
        this.response.tilte = 'Success Message';
        this.response.message = 'Updated successfully.';
        this.utilSvc.showMessage(this.response);
    }

    onRequestFailed(){
        this.msgs = [];
        this.response = new ResponseData();
        this.response.type = 'error';
        this.response.tilte = 'Error Message';
        this.response.message = this.errors.toString();
        this.utilSvc.showMessage(this.response);
    }
  
}