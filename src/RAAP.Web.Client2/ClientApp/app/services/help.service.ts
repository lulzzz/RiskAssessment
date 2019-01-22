import { Injectable, Inject } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { AuthService } from "./auth.service";
import { PagedQuery, PagedResult, SimpleSearchResult } from '../models/common.model';
import { BaseService } from '../shared/base.service';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable()
export class HelpService extends BaseService {
    private serviceUrl: string;

    constructor(private http: HttpClient,
        private authService: AuthService,
        protected alertService: AlertService,
        protected router: Router,
        @Inject('BASE_URL') private baseURL: string) {
        super(alertService, router);
        this.serviceUrl = baseURL;
    }
 
    isNameAvaiable(name: string, objectType: string) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/help/isNameAvaiable?name=' + name + '&objectType=' + objectType, requestOptions)
            .map(this.extractData).catch(this.errorHandler.bind(this));
    }
}
