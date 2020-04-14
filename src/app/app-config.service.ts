import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class AppConfigService {
  private appConfig;

  constructor (
      private http: HttpClient
    ) { }

    async loadAppConfig() {
       // this.http.get('/assets/configs/current.json?k=' + (new Date).getTime())
       //      .toPromise()
       //      .then(data => {
       //          this.appConfig = data;
       //          Object.assign(environment, this.appConfig);  
       //  });
       const translations = await this.http.get('').toPromise();
             localStorage.setItem('translation', JSON.stringify(translations));

       await  this.http.get(`${environment.siteApiUrl}/index/startup`).subscribe((attributes)=>{
             localStorage.setItem('attributes', JSON.stringify(attributes));
        });


        return;
    }
  
    getConfig() {
        return this.appConfig;
    }
}