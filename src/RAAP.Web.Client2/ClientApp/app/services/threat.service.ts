import { Injectable, Inject } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Threat } from '../models/threat.model';
import { AuthService } from "./auth.service";
import { PagedQuery, PagedResult, SimpleSearchResult } from '../models/common.model';

import { BaseService } from '../shared/base.service';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable()
export class ThreatService extends BaseService {

    private serviceUrl: string;

    constructor(private http: HttpClient,
                private authService: AuthService,
                protected alertService: AlertService,
                protected router: Router,
                @Inject('BASE_URL') private baseURL: string) {
        super(alertService, router);
        this.serviceUrl = baseURL;
    }

    getThreats(queryParams?: any): Observable<PagedResult<Threat>> {
        var requestOptions = this.authService.requestOptionsWithToken();
        let params = this.getQueryParams(queryParams || null);

        return this.http.get(this.serviceUrl + 'api/threat?' + params, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    getThreat(threatId: number): Observable<Threat> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/threat/' + threatId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    updateThreat(threat: Threat): Observable<Threat> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.put(this.serviceUrl + 'api/threat', threat, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    createThreat(threat: Threat) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.post(this.serviceUrl + 'api/threat', threat, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    deleteThreat(threatId: number) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.delete(this.serviceUrl + 'api/threat/' + threatId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    search(query: string): Observable<SimpleSearchResult[]> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/threat/search/' + query, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    getThreatCategory(queryParams?: any): Observable<any> {
        var requestOptions = this.authService.requestOptionsWithToken();
        let params = this.getQueryParams(queryParams || null);

        return this.http.get(this.serviceUrl + 'api/threatcategory?' + params, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }
}