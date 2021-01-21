import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    constructor(private messageService: MessageService) { }

    countRequests = 0;
    isLoading = new Subject<boolean>();

    show() {
        this.isLoading.next(true);
        // this.messageService.clear();
        this.countRequests += 1;
    }
    
    hide() {
        this.countRequests -= 1;
        if (this.countRequests == 0) {
            this.isLoading.next(false);
        }
    }
}