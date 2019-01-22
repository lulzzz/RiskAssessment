import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Alert, AlertType } from '../models/alert.model';

@Injectable()
export class AlertService {
    private subject = new Subject<Alert>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, autoClear = 2000) {
        this.alert(AlertType.Success, message, autoClear);
    }

    error(message: string, autoClear = 0) {
        this.alert(AlertType.Error, message, autoClear);
    }

    info(message: string, autoClear = 2000) {
        this.alert(AlertType.Info, message, autoClear);
    }

    warn(message: string, autoClear = 0) {
        this.alert(AlertType.Warning, message, autoClear);
    }

    alert(type: AlertType, message: string, autoClear: number = 0) {
        this.subject.next(<Alert>{ type: type, message: message, autoClear: autoClear });
    }

    clear() {
        this.subject.next();
    }
}