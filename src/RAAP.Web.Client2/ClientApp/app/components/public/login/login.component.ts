import { Component, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { AuthService, ILogin} from "../../../services/auth.service";
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [DatePipe, AuthService]
})
export class LoginComponent {

    public showLoadingIcon: boolean;
    public loginModel: ILogin = { username: '', password: '' }
    private loginResponse: boolean;
    private datePipe: DatePipe;


    public id: string;

    public form = new FormGroup({
        'username': new FormControl(this.loginModel.username, [Validators.required, Validators.minLength(4)]),
        'password': new FormControl(this.loginModel.password, [Validators.required, Validators.minLength(4)])
    });

    constructor(
        private authService: AuthService,
        private alertService: AlertService,
        datePipe: DatePipe,
        private route: ActivatedRoute,
        private router: Router,
        private userService:UserService) {

        this.showLoadingIcon = false;
        this.datePipe = datePipe;

        if (router.url == '/logout') {
            this.logout();
        }
    }

    public submit(formDirective: FormGroupDirective) {

        if (!this.form.valid) {
            return;
        }

        this.showLoadingIcon = true;

        this.authService.login(this.form.value)
            .subscribe(
            result => {

                this.userService.getMyUser().subscribe(data => {
                    if (!(data.roles.length > 0)) {
                        this.alertService.error('Invalid user role');
                        this.showLoadingIcon = false;
                        this.logout();
                        return;
                    }
                });

                this.loginResponse = result;
                if (this.loginResponse) {
                    //ok
                    this.alertService.clear();
                    this.showLoadingIcon = false;
                    this.router.navigate(['/dashboardmain']);
                } else {
                    // not ok
                    this.alertService.error('Invalid username and/ or password!');
                    this.showLoadingIcon = false;
                }
                 
                },
            error => {
                    this.alertService.error('Invalid username and/ or password!');
                    this.showLoadingIcon = false;
                }
        );
 
    }

    public logout() {
        let loggedOut = this.authService.logout();
        if (loggedOut) {
            this.router.navigate(['/login']);
        }
        
    }
    

}

