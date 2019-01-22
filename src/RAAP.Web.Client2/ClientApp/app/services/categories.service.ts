import { Injectable, Inject } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { AssetCategory } from '../models/asset.model';
import { ThreatCategory } from '../models/threat.model';
import { AttributeCategory } from '../models/attribute.model';

import { AuthService } from "./auth.service";
import { PagedQuery, PagedResult, SimpleSearchResult } from '../models/common.model';

import { BaseService } from '../shared/base.service';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable()
export class CategoriesService extends BaseService {
    private serviceUrl: string;
    private url: string;

    constructor(private http: HttpClient,
                private authService: AuthService,
                protected alertService: AlertService,
                protected router: Router,
                @Inject('BASE_URL') private baseURL: string) {
        super(alertService, router);
        this.serviceUrl = baseURL;
    }

    getCategories(url: string, queryParams?: any, attribouteId?: string): Observable<any> {
        var requestOptions = this.authService.requestOptionsWithToken();
        let params = this.getQueryParams(queryParams || null);
        let attributeParam = attribouteId ? '&attributeTypeId=' + attribouteId : '';

        return this.http.get(this.serviceUrl + 'api/' + url + '?' + params + attributeParam, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    } 

    getCategory(categoryId: number, url: string): Observable<Object> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/' + url + '/' + categoryId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    deleteCategory(categoryId: number, url: string) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.delete(this.serviceUrl + 'api/' + url +'/' + categoryId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    updateCategory(assetCategory: Object, url: string): Observable<Object> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.put(this.serviceUrl + 'api/' + url, assetCategory, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    createCategory(assetSubCategory: Object, url: string) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.post(this.serviceUrl + 'api/' + url, assetSubCategory, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }
}
