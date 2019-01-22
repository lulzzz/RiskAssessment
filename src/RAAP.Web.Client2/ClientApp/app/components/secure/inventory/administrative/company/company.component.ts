import { Component, Inject, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from '../../../../../models/company.model';
import { CompanyService } from '../../../../../services/company.service';
import { PagedQuery, PagedResult } from '../../../../../models/common.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
    selector: 'company',
    templateUrl: './company.component.html',
})
export class CompanyComponent implements OnInit {

    public showLoadingIcon: boolean;
    private ref: ChangeDetectorRef;
    companies: Company[] = [];
    queryParams: any;
    tableData: any = {};
    defaultPageSize: number = 20;
    pageSizes: object = [10, 20, 50, 100];

    @ViewChild(DatatableComponent) table: DatatableComponent;
    constructor(ref: ChangeDetectorRef,
        private companyService: CompanyService,
        private router: Router,
        private route: ActivatedRoute) {
        this.ref = ref;
        this.showLoadingIcon = false;
    }

    ngOnInit() {
        this.onGetCompanies();
    }

    onGetCompanies() {
        this.companyService.getCompanies(this.queryParams)
            .subscribe(
            response => {
                this.companies = response.items;
                this.tableData['currentPage'] = response.currentPage;
                this.tableData['totalItems'] = response.totalItems;
                this.tableData['totalPages'] = response.totalPages;
            });
    }

    onCreateCompany() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }

    filterCompanyName(event: any) {
        const val = event.target.value.toLowerCase();

        const temp = this.companies.filter(function (result) {
            return result.name.toLowerCase().indexOf(val) !== -1 || !val;
        });

        this.companies = temp;
        this.table.offset = 0;
    }

    onPageChange(event: any) {
        this.queryParams = {
            page: event.page,
            pageSize: this.defaultPageSize
        }
        this.onGetCompanies();
    }

    onPageSizeChange(size: number) {
        this.queryParams = {
            pageSize: size
        }
        this.defaultPageSize = size;
        this.onGetCompanies();
    }
}
