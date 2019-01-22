import { Component, Inject, Injectable, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';
import { AuthService } from "./auth.service";
import { PagedQuery, PagedResult, SimpleSearchResult } from '../models/common.model';
import { HttpErrorResponse } from '@angular/common/http';

import { BaseService } from '../shared/base.service';
import { AlertService } from './alert.service';

@Injectable()
export class UserService extends BaseService {
    private serviceUrl: string;

    constructor(private http: HttpClient,
                private authService: AuthService,
                @Inject('BASE_URL') private baseUrl: string,
                private route: ActivatedRoute,
                protected alertService: AlertService,
                protected router: Router) {
        super(alertService, router);
        this.serviceUrl = baseUrl;
    }

    public getUsers(queryParams?: any, companyId?: number): Observable<any> {
        if (!companyId)
            companyId = 1;

        var requestOptions = this.authService.requestOptionsWithToken();
        let params = this.getQueryParams(queryParams || null);

        return this.http.get(this.serviceUrl + 'api/user?' + params + '&companyId=' + companyId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    public getUser(userId: number): Observable<User> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/user/' + userId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    public getMyUser(): Observable<User> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/account/GetMyDetails', requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    public updateUser(user: User): Observable<any> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.put(this.serviceUrl + 'api/user', user, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    public createUser(user: User): Observable<any> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.post(this.serviceUrl + 'api/user', user, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

     public deleteUser(userId: number) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.delete(this.serviceUrl + 'api/user/' + userId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    public uploadFile(fileToUpload: any, userId?: number) {
        var requestOptions = this.authService.requestOptionsFormDataWithToken();
        let formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(this.serviceUrl + 'api/user/profileimage?userId=' + userId, formData, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));

     }

    public setPassword(password: any) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.post(this.serviceUrl + 'api/user/SetPassword', password, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    public getUserImage(userId: number) {
        var requestOptions = this.authService.requestOptionsWithToken();
        requestOptions.responseType = 'blob';
        return this.http.get(this.serviceUrl + "api/user/image?userId=" + userId + "&rnd=" + new Date(), requestOptions)
            .map(this.extractData);
    }

        

}

