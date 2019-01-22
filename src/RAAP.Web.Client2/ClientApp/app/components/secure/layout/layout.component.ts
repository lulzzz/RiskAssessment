import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component, Directive, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthService, TokenData } from '../../../services/auth.service';
import { MenuService } from '../../../services/menu.service';
import { AssetService } from '../../../services/asset.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProcessService } from '../../../services/process.service';
import { Process } from '../../../models/process.model';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
    providers: [AuthService]
})

@Directive({
    selector: '[routerLinkActive]',
    exportAs: 'routerLinkActive'
})

export class SecureLayoutComponent {
    
    public tokenData: TokenData = new TokenData();
    private menu: Object[] = new Array<object>();
    private categoryTitle: string = "Category title";
    private componentTitle: string = "Component";
    public panelOpenState: boolean = false;
    public route: string;
    public isProcessRoute: boolean = false;
    public isProcessBpRoute: boolean = false;
    public showLoadingIcon: boolean;
    public node: Array<any> = [];
    public childerns: Object[] = new Array<object>();
    public process: Process[] = [];
    public proc: Process;
    public user: User;
    public fullName: string;
    public userEmail: string;
    
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private assetService: AssetService,
        private menuService: MenuService,
        private processService: ProcessService,
        private userService: UserService) {

        this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map((route) => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter((route) => route.outlet === 'primary')
            .mergeMap((route) => route.data)
            .subscribe((data) => {
                this.isProcessRoute = this.router.url == '/processdashboard' ? true : false;
                this.isProcessBpRoute = this.router.url.indexOf('?bp=') > -1 ? true : false;

                if (data.title == 'View Process' || data.title == 'View Asset' || data.title == 'View Threat' || data.title == 'Create Process' || data.title == 'Edit Process') {
                    this.isProcessRoute = true;
                }

                if (this.isProcessRoute || this.isProcessBpRoute)
                    this.isProcessRoute = true;
                

                this.menu = this.menuService.getMenu(data.title, this.isProcessRoute);
                this.componentTitle = data.title;
                this.categoryTitle = this.menuService.getCategoryTitle(data.title);
            });
        this.showLoadingIcon = false;
    }

    ngOnInit() {
        this.tokenData = this.authService.getTokenData();
        // if (this.isProcessBpRoute)
            this.onGetProcesses();
        this.getDetails();
    }

    public getDetails(): void {
        this.showLoadingIcon = true;

        this.userService.getMyUser()
            .subscribe(
            result => {
                this.user = result;
                this.showLoadingIcon = false;
                this.fullName = this.user.firstName + ' ' + this.user.lastName;
                this.userEmail = this.user.email;
            },
            error => {
                this.showLoadingIcon = false;
            });
    }

    public ngAfterViewInit() {
        this.panelOpenState = true;
    }

    public logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    public onGetProcesses() {
        this.processService.getProcesss()
            .subscribe(
            response => {
                this.process = response.items;
            });
    }

    public createProcess() {
        this.router.navigate(['/process/new'], { queryParams: { bp: "" } })
    }

    public refreshTreeView() {
        this.showLoadingIcon = true;

        this.processService.getProcesss()
            .subscribe(
            response => {
                this.process = response.items;
            });
    };

    public reloadState() {
        // reset internal seed -- important!
        // assetService.seed = 0;

        this.refreshTreeView();
    }
}

