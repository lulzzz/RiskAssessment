import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { SoaChapter } from '../models/soa.model';
import { DataService } from '../shared/data.service';
import { AuthService } from "./auth.service";
import { PagedQuery, PagedResult, SimpleSearchResult } from '../models/common.model';

@Injectable()
export class SoaService {

    private serviceUrl: string;

    constructor(    
        private http: HttpClient,
        private authService: AuthService,
        private dataService: DataService,
        @Inject('BASE_URL') private baseURL: string,
    ) {
        this.serviceUrl = baseURL;
    }

    getSoaChapters(soaType: number, isoCode: string): Observable<{ enabled: boolean, soaChapters: SoaChapter[] }> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/soa/GetSoa/' + soaType + '/' + isoCode, requestOptions)
            .map(this.dataService.extractData)
            .catch(this.dataService.handleError);
    }

    getRelevantSoas() {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/soa/GetRelevantSoas', requestOptions)
            .map(this.dataService.extractData)
            .catch(this.dataService.handleError);
    }

    getSoaStatistics(soaType: number) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/soa/GetSoaStatistics/' + soaType, requestOptions)
            .map(this.dataService.extractData)
            .catch(this.dataService.handleError);
    }

    getAssetSoaStatistics(assetId: number, soaType: number, isoCode: string) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/soa/GetAssetSoaStatistics/' + assetId + '/' + soaType + '/' + isoCode, requestOptions)
            .map(this.dataService.extractData)
            .catch(this.dataService.handleError);
    }

    getAssetSoas(assetId: number, isoCode: string) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/soa/GetAssetSoas/' + assetId + '/' + isoCode, requestOptions)
            .map(this.dataService.extractData)
            .catch(this.dataService.handleError);
    };

    updateAssetSoas(assetSoas: any) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.post(this.serviceUrl + 'api/soa/UpdateAssetSoas', assetSoas, requestOptions)
            .map(this.dataService.extractData)
            .catch(this.dataService.handleError);
    }

    updateSoaChapters(chapters: SoaChapter): Observable<SoaChapter> {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.put(this.serviceUrl + 'api/soa', chapters, requestOptions)
            .map(response => response)
            .catch(this.dataService.handleError);
    }

    updateSoa(soa: SoaChapter) {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.post(this.serviceUrl + 'api/soa/UpdateSoa', soa, requestOptions)
            .map(response => response)
            .catch(this.dataService.handleError);
    }
}

