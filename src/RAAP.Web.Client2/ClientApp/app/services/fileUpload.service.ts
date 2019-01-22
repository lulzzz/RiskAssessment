import { Injectable, Inject } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { DataService } from '../shared/data.service';
import { AuthService } from "./auth.service";
import { PagedQuery, PagedResult, SimpleSearchResult } from '../models/common.model';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class fileUploadService {

    private serviceUrl: string;

    constructor(private http: HttpClient,
        private authService: AuthService,
        private dataService: DataService,
        @Inject('BASE_URL') private baseURL: string) {

        this.serviceUrl = baseURL;
    }

    public uploadFile(formData: FormData) {
        var requestOptions = this.authService.requestOptionsFormDataWithToken();
        return this.http.post(this.serviceUrl + 'api/upload/', formData, requestOptions)
            .map(response => response)
            .catch(this.dataService.handleError);
    }
}