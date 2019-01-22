import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, ChangeDetectorRef, OnInit, AfterViewInit, ViewChild, EventEmitter, Output, Input, ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Control } from '../../../../models/control.model';
import { ControlService } from '../../../../services/control.service';
import { PagedQuery, PagedResult } from '../../../../models/common.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CauseComponent } from '../../inventory/cause/cause.component';

@Component({
    selector: 'app-controls-dialog',
    templateUrl: './add-controls-dialog.component.html',
    styleUrls: ['./add-controls-dialog.component.css']
})
export class AddControlsDialogComponent implements OnInit {
    onAddControl = new EventEmitter();
    public showLoadingIcon: boolean;
    private ref: MatDialogRef<AddControlsDialogComponent>;
    id: number = 0;
    controls: Control[] = [];
    newControls: Control[] = [];
    addControls: Control[] = [];

    tableData: any = {};
    defaultPageSize: number = 50;
    orderByKey: string = 'Name';
    queryParams: any;
    pageSizes: object = [10, 20, 50, 100];

    @ViewChild(DatatableComponent) table: DatatableComponent;
    constructor(private dialogRef: MatDialogRef<AddControlsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
        private controlService: ControlService,
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
        this.onGetControls();
    }

    onCloseDialog() {
        this.dialogRef.close();
    }

    onGetControls() {
        this.controlService.getControls(this.queryParams)
            .subscribe(
            response => {
                this.newControls = [];
                this.controls = response.items;
                this.tableData['currentPage'] = response.currentPage;
                this.tableData['totalPages'] = response.totalPages;
                this.tableData['totalItems'] = response.totalItems;
                for (var i = 0; i < this.controls.length; i++) {
                    var u = 0;
                    if (this.data.controls.length == 0)
                        this.newControls.push(this.controls[i]);

                    for (var j = 0; j < this.data.controls.length; j++) {
                        if (this.data.controls[j].controlId != this.controls[i].controlId) {
                            u++;
                            if (this.data.controls.length == u) {
                                this.newControls.push(this.controls[i]);
                            }
                        }
                    }
                }
                this.controls = this.newControls;

                this.tableData['totalItems'] -= response.items.length - this.controls.length;
            });
    }

    onAddControls(controlId: number) {
        this.controls.forEach((t, i) => {
            if (t.controlId == controlId) {
                this.controls.splice(i, 1);
                this.controls = [...this.controls];
            }
        });

        this.controlService.getControl(controlId)
            .subscribe(response => {
                this.addControls.push(response);
                this.onAddControl.emit(this.addControls);
                this.data = this.addControls;
            });
    }

    onPageChange(event: any) {
        this.queryParams = {
            page: event.page,
            pageSize: this.defaultPageSize
        }
        this.onGetControls();
    }

    onPageSizeChange(size: number) {
        this.queryParams = {
            pageSize: size
        }
        this.defaultPageSize = size;
        this.onGetControls();
    }
}