import { Component, Inject, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Attribute } from '../../../../models/attribute.model';
import { AttributeService } from '../../../../services/attribute.service';
import { PagedQuery, PagedResult } from '../../../../models/common.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
    selector: 'originofthreat',
    templateUrl: './originofthreat.component.html',
})
export class OriginOfThreatComponent implements OnInit {
    originAttributes: Attribute[] = [];
    private attributeTypeId: string = "OriginOfThreat";
    public showLoadingIcon: boolean;
    private ref: ChangeDetectorRef;
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
    }

    ngOnInit() {
        this.onGetAttributes();
    }

    onGetAttributes() {
        this.attributeService.getAttributes(this.attributeTypeId, this.queryParams)
            .subscribe(
            response => {
                this.originAttributes = response.items;
                this.tableData['currentPage'] = response.currentPage;
                this.tableData['totalItems'] = response.totalItems;
                this.tableData['totalPages'] = response.totalPages;
            });
    }

    createOriginOfThreat() {
        this.router.navigate(['create'], { relativeTo: this.route });
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