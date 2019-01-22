import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, ChangeDetectorRef, OnInit, AfterViewInit, ViewChild, EventEmitter, Output, Input, ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Attribute } from '../../../../models/attribute.model';
import { AttributeService } from '../../../../services/attribute.service';
import { PagedQuery, PagedResult } from '../../../../models/common.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CauseComponent } from '../../inventory/cause/cause.component';

@Component({
    selector: 'app-cause-dialog',
    templateUrl: './add-cause-dialog.component.html',
    styleUrls: ['./add-cause-dialog.component.css']
})
export class AddCauseDialogComponent implements OnInit {
    onAddCause = new EventEmitter();
    public showLoadingIcon: boolean;
    private ref: MatDialogRef<AddCauseDialogComponent>;
    id: number = 0;
    atributes: Attribute[] = [];
    newAtributes: Attribute[] = [];
    addAtributes: Attribute[] = [];

    tableData: any = {};
    defaultPageSize: number = 50;
    orderByKey: string = 'Name';
    queryParams: any;
    pageSizes: object = [10, 20, 50, 100];

    @ViewChild(DatatableComponent) table: DatatableComponent;
    constructor(private dialogRef: MatDialogRef<AddCauseDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
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
        this.onGetAttributes();
    }

    onCloseDialog() {
        this.dialogRef.close();
    }

    onGetAttributes() {
        this.attributeService.getAttributes('Cause', this.queryParams)
            .subscribe(
            response => {
                this.newAtributes = [];
                this.atributes = response.items;
                this.tableData['currentPage'] = response.currentPage;
                this.tableData['totalPages'] = response.totalPages;
                this.tableData['totalItems'] = response.totalItems;
                for (var i = 0; i < this.atributes.length; i++) {
                    var u = 0;
                    if (this.data.atributes.length == 0)
                        this.newAtributes.push(this.atributes[i]);
                    for (var j = 0; j < this.data.atributes.length; j++) {
                        if (this.data.atributes[j].attributeId != this.atributes[i].attributeId) {
                            u++;
                            if (this.data.atributes.length == u) {
                                this.newAtributes.push(this.atributes[i]);
                            }
                        }
                    }
                }
                this.atributes = this.newAtributes;

                this.tableData['totalItems'] -= response.items.length - this.atributes.length;
            });
    }

    onAddCauses(attributeId: number) {
        this.atributes.forEach((t, i) => {
            if (t.attributeId == attributeId) {
                this.atributes.splice(i, 1);
                this.atributes = [...this.atributes];
            }
        });

        this.attributeService.getAttribute(attributeId)
            .subscribe(response => {
                this.addAtributes.push(response);
                this.onAddCause.emit(this.addAtributes);
                this.data = this.addAtributes;
            });
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