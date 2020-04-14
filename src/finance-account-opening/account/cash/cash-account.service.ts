import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { SiteApiResponseUtilities } from '../../../shared/services/SiteApiResponse';
import { Step1, Step2, Step3, Step4 } from './data/formData.model';
@Injectable()
export class CashAccountService {
  
  private respUtils = new SiteApiResponseUtilities();

  constructor(private http: HttpClient){}
  
  accountOpening( step1Data: Step1, 
                  step2Data: Step2, 
                  step3Data: Step3, 
                  step4Data: Step4) {
                    console.log(step1Data);
     const url = environment.endpoints.client_account.openAccount;
     let body = new URLSearchParams();
     body.set('account_type', 'cash');
     let records = Object.assign(step1Data, step2Data, step3Data, step4Data);
     Object.keys(records).forEach((key, index)=>{
       body.set(key, records[key].toString());
     });
     return this.http
        .post(url, body.toString(), {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        })
        .map(r => r)
        .catch(r => this.respUtils.onServiceError(r));
  }
}