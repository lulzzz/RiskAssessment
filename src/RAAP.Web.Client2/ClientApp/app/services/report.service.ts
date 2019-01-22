import { Injectable, Inject } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { BaseService } from '../shared/base.service';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class ReportService extends BaseService {
    private serviceUrl: string;

    constructor(private http: HttpClient,
        protected alertService: AlertService,
        protected router: Router,
        protected authService:AuthService,
        @Inject('BASE_URL') private baseURL: string) {
        super(alertService, router);
        this.serviceUrl = baseURL;
    }

    getDashboardReport() {
        var requestOptions = this.authService.requestOptionsWithToken();
        return this.http.get(this.serviceUrl + 'api/report' + '/GetDashboardReport', requestOptions)
            .map(this.extractData)
            .catch(this.errorHandler.bind(this));
    }
}
