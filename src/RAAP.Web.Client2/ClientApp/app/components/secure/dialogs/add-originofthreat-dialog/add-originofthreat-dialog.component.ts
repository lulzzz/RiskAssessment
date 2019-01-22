import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, ChangeDetectorRef, OnInit, AfterViewInit, ViewChild, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Attribute } from '../../../../models/attribute.model';
import { AttributeService } from '../../../../services/attribute.service';
import { PagedQuery, PagedResult } from '../../../../models/common.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { OriginOfThreatComponent } from '../../inventory/originofthreat/originofthreat.component';


@Component({
    selector: 'app-originofthreat-dialog',
    templateUrl: './add-originofthreat-dialog.component.html',
    styleUrls: ['./add-originofthreat-dialog.component.css']
})

export class AddOriginOfThreatDialogComponent implements OnInit {
    onAdd = new EventEmitter();
    public showLoadingIcon: boolean;
    private ref: MatDialogRef<AddOriginOfThreatDialogComponent>;
    id: number = 0;
    origins: Attribute[] =[] ;
    newOrigins: Attribute[] = [];
    addOrigin: Attribute[] = [];
    private attributeTypeId: string = "OriginOfThreat";
    @ViewChild(DatatableComponent) table: DatatableComponent;

    tableData: any = {};
    defaultPageSize: number = 50;
    orderByKey: string = 'Name';
    queryParams: any;
    pageSizes: object = [10, 20, 50, 100];

    constructor(private dialogRef: MatDialogRef<AddOriginOfThreatDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any =[],
        private attributeService: AttributeService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.ref = dialogRef;
        this.showLoadingIcon = false;

        this.queryParams = {
            pageSize: this.defaultPageSize,
            orderByKey: this.orderByKey
        }
    }

    ngOnInit() {
        this.onGetOrigins();
    }

    onGetOrigins() {
        this.attributeService.getAttributes(this.attributeTypeId, this.queryParams)
            .subscribe(
            response => {
                this.newOrigins = [];
                this.origins = response.items;
                this.tableData['currentPage'] = response.currentPage;
                this.tableData['totalPages'] = response.totalPages;
                this.tableData['totalItems'] = response.totalItems;
                for (var i = 0; i < this.origins.length; i++) {
                    var u = 0;
                    if (this.data.origins.length == 0)
                        this.newOrigins.push(this.origins[i]);

                    for (var j = 0; j < this.data.origins.length; j++) {
                        if (this.data.origins[j].attributeId != this.origins[i].attributeId) {
                            u++;
                            if (this.data.origins.length == u) {
                                this.newOrigins.push(this.origins[i]);
                            }
                        }
                    }
                }
                this.origins = this.newOrigins;
                this.tableData['totalItems'] -= response.items.length - this.origins.length;
            });
    }

    onCloseDialog() {
        this.dialogRef.close();
    }

    onAddOrigin(attributeId: number) {
        this.origins.forEach((t, i) => {
            if (t.attributeId == attributeId) {
                this.origins.splice(i, 1);
            }
        });

        this.attributeService.getAttribute(attributeId)
            .subscribe(response => {
                this.addOrigin.push(response);
                this.onAdd.emit(response);
            });
    }

    onPageChange(event: any) {
        this.queryParams = {
            page: event.page,
            pageSize: this.defaultPageSize
        }
        this.onGetOrigins();
    }

    onPageSizeChange(size: number) {
        this.queryParams = {
            pageSize: size
        }
        this.defaultPageSize = size;
        this.onGetOrigins();
    }

}