import { Component, Inject, Injectable, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Company } from '../models/company.model';
import { AuthService } from "./auth.service";
import { DataService } from '../shared/data.service';
import { PagedQuery, PagedResult, SimpleSearchResult } from '../models/common.model';

import { BaseService } from '../shared/base.service';
import { AlertService } from './alert.service';

@Component({
    selector: 'company-service',
    providers: [AuthService]
})


 @Injectable()
export class CompanyService extends BaseService  {

    private serviceUrl: string;

    constructor(private http: HttpClient,
                private authService: AuthService,
                private dataService: DataService,
                @Inject('BASE_URL') private baseUrl: string,
                //private ref: ChangeDetectorRef,
                protected alertService: AlertService,
                private route: ActivatedRoute,
                protected router: Router) {
        super(alertService, router);
        this.serviceUrl = baseUrl;
    }

    public getCompanies(queryParams?: any): Observable<any> {
        var requestOptions = this.authService.requestOptionsWithToken();
        let params = this.getQueryParams(queryParams || null);

        return this.http.get(this.serviceUrl + 'api/company?' + params, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    public getCompany(companyId: number): Observable<Company> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/company/' + companyId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    public updateCompany(company: Company): Observable<Company> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.put(this.serviceUrl + 'api/company', company, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    public createCompany(company: Company) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.post(this.serviceUrl + 'api/company', company, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    public deleteCompany(companyId: number) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.delete(this.serviceUrl + 'api/company/' + companyId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    public uploadFile(fileToUpload: any, companyId?: number) {
        var requestOptions = this.authService.requestOptionsFormDataWithToken();
        let formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(this.serviceUrl + 'api/company/profileimage?companyId=' + companyId, formData, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    public getCompanyImage(companyId: number) {
        var requestOptions = this.authService.requestOptionsWithToken();
        requestOptions.responseType = 'blob';
        return this.http.get(this.serviceUrl + "api/company/image?companyId=" + companyId + "&rnd=" + new Date(), requestOptions)
            .map(this.extractData);
    }
}
