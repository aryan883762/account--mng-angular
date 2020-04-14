import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class IdentityPreviewDialogService {
    private showDialogSource = new Subject<any>();
    public showDialog$ = this.showDialogSource.asObservable();
    
    showDialog(data: any) {
        this.showDialogSource.next(data);
    }
}