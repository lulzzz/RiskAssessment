import { Component, Inject, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../../../models/user.model';
import { UserService } from '../../../../../services/user.service';
import { PagedQuery, PagedResult } from '../../../../../models/common.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Company } from '../../../../../models/company.model';
import { CompanyService } from '../../../../../services/company.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    public showLoadingIcon: boolean;
    private ref: ChangeDetectorRef;
    users: User[] = [];
    companies: Company[] = [];
    userForm: FormGroup;
    selectedOption: number = 0;
    queryParams: any;
    defaultPageSize: number = 20;
    tableData: any = {};
    pageSizes: object = [10, 20, 50, 100];
   
    @ViewChild(DatatableComponent) table: DatatableComponent;
    constructor(ref: ChangeDetectorRef,
        private userService: UserService,
        private companyService: CompanyService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute) {
        this.ref = ref;
        this.showLoadingIcon = false;
    }

    ngOnInit() {
        this.onGetMyUserDetails();
        this.onGetCompanies();
        this.createForm();
    }

    onGetUsers(companyId: number) {
        this.queryParams = {
            pageSize: this.defaultPageSize
        }

        this.userService.getUsers(this.queryParams, companyId)
            .subscribe(
            response => {
                this.users = response.items;
                this.tableData['currentPage'] = response.currentPage;
                this.tableData['totalItems'] = response.totalItems;
                this.tableData['totalPages'] = response.totalPages;
            });
    }

    onCreateUser() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }

    filterUserName(event: any) {
        const val = event.target.value.toLowerCase();

        const temp = this.users.filter(function (result) {
            return result.username.toLowerCase().indexOf(val) !== -1 || !val;
        });

        this.users = temp;
        this.table.offset = 0;
    }

    onGetCompanies() {
        this.queryParams = {
            pageSize: 1000
        }

        this.companyService.getCompanies(this.queryParams)
            .subscribe(
            response => {
                this.companies = response.items;
                this.queryParams = false;
            });
    }

    onChangeCompany(companyId: number) {
        this.onGetUsers(companyId);
    }

    createForm() {
        this.userForm = this.fb.group({
            companyId: this.selectedOption
        });
    }

    onGetMyUserDetails() {
        this.userService.getMyUser()
            .subscribe(
            response => {
                this.selectedOption = response.companyId;
                this.userForm.patchValue({
                    companyId: this.selectedOption
                });
                this.onGetUsers(this.selectedOption);
            });
    }

    onPageChange(event: any) {
        this.queryParams = {
            page: event.page,
            pageSize: this.defaultPageSize
        }
        this.onGetUsers(this.selectedOption);
    }

    onPageSizeChange(size: number) {
        this.queryParams = {
            pageSize: size
        }
        this.defaultPageSize = size;
        this.onGetUsers(this.selectedOption);
    }
}
