import { Injectable, Inject } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Asset } from '../models/asset.model';
import { AuthService } from "./auth.service";
import { PagedQuery, PagedResult, SimpleSearchResult } from '../models/common.model';
import { BaseService } from '../shared/base.service';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable()
export class AssetService extends BaseService {
    private serviceUrl: string;
    private aId: any;

    constructor(private http: HttpClient,
                private authService: AuthService,
                protected alertService: AlertService,
                protected router: Router,
                @Inject('BASE_URL') private baseURL: string) {
        super(alertService, router);
        this.serviceUrl = baseURL;
    }
    //
    getAssets(category: number, queryParams?: any): Observable<PagedResult<Asset>> {
        var requestOptions = this.authService.requestOptionsWithToken();
        let params = this.getQueryParams(queryParams || null);

        return this.http.get(this.serviceUrl + 'api/asset?' + params + '&category=' + category, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    getAllAssets(queryParams?: any): Observable<PagedResult<Asset>> {
        var requestOptions = this.authService.requestOptionsWithToken();
        let params = this.getQueryParams(queryParams || null);

        return this.http.get(this.serviceUrl + 'api/asset?' + params, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    getAsset(assetId: number): Observable<Asset> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/asset/' + assetId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    getAssetsSubCategorie(queryParams?: any): Observable < any > {
        var requestOptions = this.authService.requestOptionsWithToken();
        let params = this.getQueryParams(queryParams || null);

        return this.http.get(this.serviceUrl + 'api/assetsubcategory?' + params, requestOptions)
             .map(this.extractData)
            .catch(this.errorHandler.bind(this));
        } 

    updateAsset(asset: Asset): Observable<Asset> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.put(this.serviceUrl + 'api/asset', asset, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    createAsset(asset: Asset) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.post(this.serviceUrl + 'api/asset', asset, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    deleteAsset(assetId: number) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.delete(this.serviceUrl + 'api/Asset/' + assetId, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    search(query: string): Observable<SimpleSearchResult[]> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/asset/search/' + query, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    getUnhandlededThreats(probability: number, impact: number, levelType: number) : Observable<Asset[]> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/asset/getunhandledthreats?probability=' + probability + '&impact=' + impact + '&levelType=' + levelType, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    getReverse(id: number) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/asset/reverse/' + id, requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }

    getAssetId(): Observable<any> {
        return this.aId;
    }

    setAssetId(assetId: any) {
        this.aId = assetId;
    }

}
