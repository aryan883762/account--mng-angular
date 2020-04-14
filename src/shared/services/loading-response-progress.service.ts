import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ProgressLoadingService {
    private progressResponseSource = new Subject<boolean>();
    public progressResponse$ = this.progressResponseSource.asObservable();
    
    private openAccountResponseSource = new Subject<boolean>();
    public openAccountResponse$ = this.openAccountResponseSource.asObservable();
    
    progressResponse(data: boolean) {
        this.progressResponseSource.next(data);
    }

    //stock account submit
    openAccountResponse(data: boolean) {
        this.openAccountResponseSource.next(data);
    }
}