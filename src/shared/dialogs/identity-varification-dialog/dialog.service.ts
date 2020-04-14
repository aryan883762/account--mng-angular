import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class IdentityVarificationDialogService {
    private showDialogSource = new Subject<string>();
    public showDialog$ = this.showDialogSource.asObservable();
    
    showDialog(data: string) {
        this.showDialogSource.next(data);
    }
}