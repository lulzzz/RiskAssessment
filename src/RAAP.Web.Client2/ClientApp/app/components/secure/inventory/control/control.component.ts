import { Component, Inject, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Control } from '../../../../models/control.model';
import { ControlService } from '../../../../services/control.service';
import { PagedQuery, PagedResult } from '../../../../models/common.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ControlSliderFilter } from './control-slider-filter';
import { HelpService } from '../../../../services/help.service';

@Component({
    selector: 'app-control',   
    templateUrl: './control.component.html',
    styleUrls: ['./add-edit-control.component.css']
})
export class ControlComponent implements OnInit {

    public showLoadingIcon: boolean;
    private ref: ChangeDetectorRef;
    controls: Control[] = [];
    controlCopy: Control;
    queryParams: any;
    tableData: any = {};
    defaultPageSize: number = 20;
    pageSizes: object = [10, 20, 50, 100];

    @ViewChild(DatatableComponent) table: DatatableComponent;
    constructor(ref: ChangeDetectorRef,
        private controlService: ControlService,
        private helpService:HelpService,
        private router: Router,
        private route: ActivatedRoute) {
        this.ref = ref;
        this.showLoadingIcon = false;
    }

    ngOnInit() {
        this.onGetControls();
    }

    onGetControls() {
        this.controlService.getControls(this.queryParams)
            .subscribe(
            response => {
                this.controls = response.items;
                this.tableData['currentPage'] = response.currentPage;
                this.tableData['totalItems'] = response.totalItems;
                this.tableData['totalPages'] = response.totalPages;
            });
    }

    createControl() {
        this.router.navigate(['create'], { relativeTo: this.route });
    }

    filterControlName(event: any) {
        const val = event.target.value.toLowerCase();

        const temp = this.controls.filter(function (result) {
            return result.name.toLowerCase().indexOf(val) !== -1 || !val;
        });

        this.controls = temp;
        this.table.offset = 0;
    }

    onCopy(controlId: number) {
        this.controlService.getControl(controlId)
            .subscribe(
            response => {
                this.controlCopy = response;
                this.helpService.isNameAvaiable(this.controlCopy.name, 'control')
                    .subscribe(response => {
                        this.controlCopy.name = response;
                        this.controlCopy.controlId = 0;
                        this.controlService.createControl(this.controlCopy).subscribe((data) => {
                            this.router.navigate(['/control/edit/' + data.controlId]);
                        })
                    });
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
