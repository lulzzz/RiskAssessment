import { Injectable, Inject } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Process, ProcessCategory } from '../models/process.model';
import { AuthService } from "./auth.service";
import { PagedQuery, PagedResult, SimpleSearchResult } from '../models/common.model';

import { BaseService } from '../shared/base.service';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable()
export class ProcessService extends BaseService {

    private serviceUrl: string;
    private pId: any;

    constructor(private http: HttpClient,
                private authService: AuthService,
                protected alertService: AlertService,
                protected router: Router,
                @Inject('BASE_URL') private baseURL: string) {
        super(alertService, router);
        this.serviceUrl = baseURL;
    }

    getProcesss(queryParams?: any): Observable<PagedResult<Process>> {
        var requestOptions = this.authService.requestOptionsWithToken();
        let params = this.getQueryParams(queryParams || null);

        return this.http.get(this.serviceUrl + 'api/process?' + params , requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    getProcess(processId: number): Observable<Process> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/process/' + processId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    updateProcess(process: Process): Observable<Process> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.put(this.serviceUrl + 'api/process', process, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    createProcess(process: Process) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.post(this.serviceUrl + 'api/process', process, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    deleteProcess(processId: number) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.delete(this.serviceUrl + 'api/process/' + processId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    getProcessCategories(queryParams?: any): Observable<any> {
        var requestOptions = this.authService.requestOptionsWithToken();
        let params = this.getQueryParams(queryParams || null);

        return this.http.get(this.serviceUrl + 'api/processcategory?' + params, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    } 

    getCategry(id: number): Observable<any> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/processcategory/'+ id , requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    } 

    search(query: string) : Observable<SimpleSearchResult[]> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/process/search/' + query, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    getProcesId(): Observable<any> {
        return this.pId;
    }

    setProcesId(proceId: any) {
        this.pId = proceId;
    }
}
