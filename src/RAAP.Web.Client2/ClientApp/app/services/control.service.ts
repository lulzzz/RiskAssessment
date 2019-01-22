import { Injectable, Inject } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Control } from '../models/control.model';
import { AuthService } from "./auth.service";
import { PagedQuery, PagedResult, SimpleSearchResult } from '../models/common.model';

import { BaseService } from '../shared/base.service';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable()
export class ControlService extends BaseService {

    private serviceUrl: string;

    constructor(private http: HttpClient,
                private authService: AuthService,
                protected alertService: AlertService,
                protected router: Router,
                @Inject('BASE_URL') private baseURL: string) {
        super(alertService, router);
        this.serviceUrl = baseURL;
    }

    getControls(queryParams?: any): Observable<PagedResult<Control>> {
        var requestOptions = this.authService.requestOptionsWithToken();
        let params = this.getQueryParams(queryParams || null);

        return this.http.get(this.serviceUrl + 'api/control?' + params, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    getControl(controlId: number): Observable<Control> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/control/' + controlId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    updateControl(control: Control): Observable<Control> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.put(this.serviceUrl + 'api/control', control, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    createControl(control: Control) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.post(this.serviceUrl + 'api/control', control, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    deleteControl(controlId: number) {
        console.log(controlId);
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.delete(this.serviceUrl + 'api/control/' + controlId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    search(query: string): Observable<SimpleSearchResult[]> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/control/search/' + query, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    getControlCategory(queryParams?: any): Observable<any> {
        var requestOptions = this.authService.requestOptionsWithToken();
        let params = this.getQueryParams(queryParams || null);

        return this.http.get(this.serviceUrl + 'api/controlcategory?' + params, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }
}