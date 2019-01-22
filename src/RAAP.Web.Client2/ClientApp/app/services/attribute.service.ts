import { Injectable, Inject } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Attribute } from '../models/attribute.model';
import { AuthService } from "./auth.service";
import { PagedQuery, PagedResult, SimpleSearchResult } from '../models/common.model';
import { BaseService } from '../shared/base.service';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';


@Injectable()
export class AttributeService extends BaseService {

    private serviceUrl: string;

    constructor(private http: HttpClient,
                private authService: AuthService,
                protected alertService: AlertService,
                protected router: Router,
                @Inject('BASE_URL') private baseURL: string) {
        super(alertService, router);
        this.serviceUrl = baseURL;
    }

    getAttributes(attributeTypeId: string, queryParams?: any): Observable<PagedResult<Attribute>> {
        var requestOptions = this.authService.requestOptionsWithToken();
        let params = this.getQueryParams(queryParams || null);

        return this.http.get(this.serviceUrl + 'api/attribute?' + params + '&attributeTypeId=' + attributeTypeId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    getAttribute(attributeId: number): Observable<Attribute> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/attribute/' + attributeId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    updateAttribute(attribute: Attribute): Observable<Attribute> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.put(this.serviceUrl + 'api/attribute', attribute, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    createAttribute(attribute: Attribute) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.post(this.serviceUrl + 'api/attribute', attribute, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    deleteAttribute(attributeId: number): Observable<any>{
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.delete(this.serviceUrl + 'api/attribute/' + attributeId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    search(query: string): Observable<SimpleSearchResult[]> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/attribute/search/' + query, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    getAttributeCategory(attributeTypeId: string, queryParams?: any): Observable<any> {
        var requestOptions = this.authService.requestOptionsWithToken();
        let params = this.getQueryParams(queryParams || null);

        return this.http.get(this.serviceUrl + 'api/attributecategory?' + params + '&attributeTypeId=' + attributeTypeId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }
}
