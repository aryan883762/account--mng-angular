import { HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

export interface ISiteApiResponse {
    error: any;
}

export class SiteApiResponseUtilities {
    getErrors(resp: ISiteApiResponse) {
        if (!resp) return [];
        
        let errors = [];

        if (resp.error) {
            errors.push(resp.error.body);
        }
    
        return errors;
    }

    onServiceError (resp: HttpErrorResponse): Observable<any> {
        let data = {};
        if (resp instanceof HttpErrorResponse) {
            data = resp.error ? resp.error : {};
        }
    
        return Observable.throw(data);
    }
}