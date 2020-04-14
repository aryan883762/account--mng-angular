import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class ResponseData {
     type: string;
     tilte: string;
     message: string;
}

@Injectable()
export class UtilService {
    constructor(){}
    private showMessageSource = new Subject<ResponseData>();
    public showMessage$ = this.showMessageSource.asObservable();
    
    showMessage(res: ResponseData) {
        this.showMessageSource.next(res);
    }
}