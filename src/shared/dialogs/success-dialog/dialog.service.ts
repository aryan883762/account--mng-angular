import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SuccessDialog } from './models';

@Injectable()
export class SuccessDialogService {
    private showDialogSource = new Subject<SuccessDialog>();
    public showDialog$ = this.showDialogSource.asObservable();
    
    showDialog(data: SuccessDialog) {
        this.showDialogSource.next(data);
    }
}