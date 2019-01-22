import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthService {

    private serviceUrl: string;
    private jwtHelper = new JwtHelper();
    
    constructor(private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,
        private router: Router
        
    ) {
        this.serviceUrl = baseUrl;
    }

    public getToken(): string {

        let userFromStore = localStorage.getItem('currentUser');

        if (userFromStore) {
            let currentUser = JSON.parse(userFromStore);
            return currentUser.token;
        } else 
            return "";
    }

    private handleError(error: Response | any) {
        let errorMsg = error;
        try {
            let errorResponse = error.json();
            errorMsg = errorResponse.error;
            // json
        } catch (e) { }

        return Observable.throw(errorMsg);
    }

    public login(model: ILogin): Observable<boolean> {

        let myHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
       
        return this.http.post(this.serviceUrl + 'token', "grant_type=password&username=" + model.username + "&password=" + model.password, { headers: myHeader })
            .map((response: any) => {
                // login successful if there's a jwt token in the response
                let token = response && response.access_token;
                let expiresIn = response && response.expires_in;
                let expirationDate = Date.now() + (expiresIn * 1000);

                if (token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: model.username, token: token, expirationDate: expirationDate }));
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            })
            .catch(this.handleError);
    }

    public requestOptionsWithToken(): any {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.getToken(),
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Content-Type': 'application/json'
            })
        };
        return httpOptions;
    }

    public getTokenData(): TokenData {

        let userFromStore = localStorage.getItem('currentUser');
        if (userFromStore) {
            let currentUser = JSON.parse(userFromStore);

            var tokenData = new TokenData();
            tokenData.username = currentUser.username;
            tokenData.roles = new Array<string>();

            return tokenData;
        } else {
            localStorage.removeItem('currentUser');
            this.router.navigate(['/login']);

            return new TokenData();
        }
    }

    public logout(): boolean {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        return true;
    }

    public requestOptionsFormDataWithToken(): any {
        const httpOptions = {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this.getToken(),
                })
            };
        return httpOptions;
    }
}

export interface ILogin {
    username: string;
    password: string;
}

export class TokenData {
    roles: Array<string>;
    firstName: string;
    lastName: string;
    username: string;
}
