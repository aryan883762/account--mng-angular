import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class IdentityStatusDialogService {
    private showDialogSource = new Subject<any>();
    public showDialog$ = this.showDialogSource.asObservable();
    
    showDialog(docs: any, accountInfo: any) {
    	let result = {
    		docs,
    		accountInfo
    	}
        this.showDialogSource.next(result);
    }
}