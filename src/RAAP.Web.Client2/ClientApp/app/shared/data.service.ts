import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate } from '@angular/router';
import { PagedQuery } from '../models/common.model';


@Injectable()
export class DataService {

    public extractData(res: any) {
        return res || [];
    }
    constructor(
        private router: Router
    ) { }

    public handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}