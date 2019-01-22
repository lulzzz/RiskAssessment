import { Component, Inject, ChangeDetectorRef, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ControlCategory } from '../../../../../models/control.model';
import { CategoriesService } from '../../../../../services/categories.service';
import { PagedQuery, PagedResult } from '../../../../../models/common.model';

@Component({
    selector: 'app-asset',
    templateUrl: './controlCategory.component.html',
})

export class ControlCategoryComponent implements OnInit {

    public showLoadingIcon: boolean;
    private ref: ChangeDetectorRef;
    id: number = 0;
    editMode: boolean = false;
    url: string = 'controlcategory';
    queryParams: any;
    tableData: any = {};
    defaultPageSize: number = 20;
    pageSizes: object = [10, 20, 50, 100];

    controlCategories: ControlCategory [] = [];

    constructor(ref: ChangeDetectorRef,
        private categoryService: CategoriesService,
        private router: Router,
        private route: ActivatedRoute) {
        this.ref = ref;
        this.showLoadingIcon = false;

        if (this.route.snapshot.params["id"]) {
            this.id = +this.route.snapshot.params["id"];
        }
    }

    ngOnInit() {
        this.onGetCategories();
    }

    onGetCategories() {
        this.categoryService.getCategories(this.url, this.queryParams)
            .subscribe( response => {
                this.controlCategories = response.items;
                this.tableData['currentPage'] = response.currentPage;
                this.tableData['totalItems'] = response.totalItems;
                this.tableData['totalPages'] = response.totalPages;
            });
    }

    onNewCategory() {
        this.router.navigate(['edit'], { relativeTo: this.route });
    }

    onPageChange(event: any) {
        this.queryParams = {
            page: event.page,
            pageSize: this.defaultPageSize
        }
        this.onGetCategories();
    }

    onPageSizeChange(size: number) {
        this.queryParams = {
            pageSize: size
        }
        this.defaultPageSize = size;
        this.onGetCategories();
    }
}
