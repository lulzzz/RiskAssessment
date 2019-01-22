import { Component, Inject, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Attribute } from '../../../../models/attribute.model';
import { AttributeService } from '../../../../services/attribute.service';
import { PagedQuery, PagedResult } from '../../../../models/common.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
    selector: 'cause',
    templateUrl: './cause.component.html',
})
export class CauseComponent implements OnInit {

    public showLoadingIcon: boolean;
    private ref: ChangeDetectorRef;
    private attributeTypeId: string;

    attributes: Attribute[] = [];
    queryParams: any;
    tableData: any = {};
    defaultPageSize: number = 20;
    pageSizes: object = [10, 20, 50, 100];

    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(ref: ChangeDetectorRef,
        private attributeService: AttributeService,
        private router: Router,
        private route: ActivatedRoute) {
        this.ref = ref;
        this.showLoadingIcon = false;
        this.attributeTypeId = "Cause";
    }

    ngOnInit() {
        this.onGetAttributes();
    }

    onGetAttributes() {
        this.attributeService.getAttributes(this.attributeTypeId, this.queryParams)
            .subscribe(
            response => {
                this.attributes = response.items;
                this.tableData['currentPage'] = response.currentPage;
                this.tableData['totalItems'] = response.totalItems;
                this.tableData['totalPages'] = response.totalPages;
            });
    }

    createCause() {
        this.router.navigate(['create'], { relativeTo: this.route });
    }

    filterCauseName(event: any) {
        const val = event.target.value.toLowerCase();

        const temp = this.attributes.filter(function (result) {
            return result.name.toLowerCase().indexOf(val) !== -1 || !val;
        });

        this.attributes = temp;
        this.table.offset = 0;
    }

    onPageChange(event: any) {
        this.queryParams = {
            page: event.page,
            pageSize: this.defaultPageSize
        }
        this.onGetAttributes();
    }

    onPageSizeChange(size: number) {
        this.queryParams = {
            pageSize: size
        }
        this.defaultPageSize = size;
        this.onGetAttributes();
    }

}