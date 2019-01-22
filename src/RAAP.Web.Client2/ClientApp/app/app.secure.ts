import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class SecureComponent implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            let userFromStore = localStorage.getItem('currentUser');
            let currentUser = userFromStore ? JSON.parse(userFromStore) : null;

            if (!currentUser || (currentUser.expirationDate && (Date.now() > currentUser.expirationDate))) {
                localStorage.removeItem('currentUser');
                this.router.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        }
        this.router.navigate(['/login']);
        return false;
    }
}
