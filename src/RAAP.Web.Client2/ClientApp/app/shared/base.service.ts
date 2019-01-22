import { AlertService } from "../services/alert.service";
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import { ErrorObject } from '../models/error-object.model';
import 'rxjs/add/observable/of';
import { PagedQuery } from "../models/common.model";

export class BaseService {
    protected router: Router;
    protected alertService: AlertService;

    constructor(_alertService: AlertService, _router: Router) {
        this.alertService = _alertService;
        this.router = _router;
    }

    errorHandler(error: HttpErrorResponse) {
        let autoClear = 5000;
        const body = error.error;
        switch (error.status) {
            case 400:
                this.alertService.error("Bad request!", autoClear);
                break;
            case 401:
                localStorage.removeItem('currentUser');
                this.router.navigate(['/login']);
                break;
            case 404:
                this.router.navigateByUrl("/not-found");
                break;
            case 409:
                this.alertService.error(body.exceptionMessage);
                break;
            case 500:
            default:
                this.alertService.error("Unkown error - please try again!", autoClear);
                break;
        }

        let errorObject = new ErrorObject();
        errorObject.error = body;

        return Observable.of(errorObject);
    }

    public extractData(res: any) {
        return res || [];
    }

    public getQueryParams(params?: any) {
        let query = new PagedQuery();
        query.isDescending = params && params.isDescending == false ? false : true;
        query.page = params && params.page ? params.page : 1;
        query.pageSize = params && params.pageSize ? params.pageSize : 20;
        query.orderByKey = params && params.orderByKey ? params.orderByKey : '';
        let parameters = new URLSearchParams();

        for (let key in query) {
            parameters.set(key, (<any>query)[key])
        }

        return parameters;
    }
}
