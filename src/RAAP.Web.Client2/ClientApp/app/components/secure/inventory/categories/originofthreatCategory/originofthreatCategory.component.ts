import { Component, Inject, ChangeDetectorRef, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AttributeCategory } from '../../../../../models/attribute.model';
import { CategoriesService } from '../../../../../services/categories.service';
import { PagedQuery, PagedResult } from '../../../../../models/common.model';

@Component({
    selector: 'app-originofthreat-category',
    templateUrl: './originofthreatCategory.component.html',
})

export class OriginOfThreatCategoryComponent implements OnInit {

    public showLoadingIcon: boolean;
    private ref: ChangeDetectorRef;
    id: number = 0;
    editMode: boolean = false;
    url: string = 'attributecategory';
    attributeId: string = 'OriginOfThreat';
    queryParams: any;
    tableData: any = {};
    defaultPageSize: number = 20;
    pageSizes: object = [10, 20, 50, 100];

    originofthreatCategories: AttributeCategory [] = [];

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
        this.categoryService.getCategories(this.url, this.queryParams, this.attributeId)
            .subscribe( response => {
                this.originofthreatCategories = response.items;
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
