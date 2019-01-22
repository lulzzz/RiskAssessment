import { Component, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Process } from '../../../../models/process.model';
import { ProcessService } from '../../../../services/process.service';
import { PagedQuery, PagedResult } from '../../../../models/common.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogsService } from '../../../../shared/dialogs.service';
import { HelpService } from '../../../../services/help.service';

@Component({
    selector: 'app-process',
    templateUrl: './process.component.html',
    styleUrls: ['./add-edit-process.component.css']
})
export class ProcessComponent {
    public showLoadingIcon: boolean;
    private ref: ChangeDetectorRef;
    process: Process[] = [];
    proc: Process;
    queryParams: any;
    tableData: any = {};
    defaultPageSize: number = 20;
    pageSizes: object = [10, 20, 50, 100];

    @ViewChild(DatatableComponent) table: DatatableComponent;
    constructor(ref: ChangeDetectorRef,
        private processService: ProcessService,
        private dialogService: DialogsService,
        private helpService:HelpService,
        private router: Router,
        private route: ActivatedRoute) {
        this.ref = ref;
        this.showLoadingIcon = false;
    }

    ngOnInit() {
        this.onGetProcesses();
    }

    onGetProcesses() {
        this.processService.getProcesss(this.queryParams)
            .subscribe(
            response => {
                this.process = response.items;
                this.tableData['currentPage'] = response.currentPage;
                this.tableData['totalItems'] = response.totalItems;
                this.tableData['totalPages'] = response.totalPages;
              
            });
    }

    filterProcessName(event: any) {
        const val = event.target.value.toLowerCase();

        const temp = this.process.filter(function (result) {
            return result.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.process = temp;
        this.table.offset = 0;
    }

    onCopy(processId: number) {
        this.processService.getProcess(processId)
            .subscribe(
            response => {
                this.proc = response;
                this.helpService.isNameAvaiable(this.proc.name, 'process')
                    .subscribe(response => {
                        this.proc.name = response;
                        this.proc.processId = 0;
                        this.processService.createProcess(this.proc).subscribe((data) => {
                            this.router.navigate(['/process/edit/' + data.processId]);
                        })
                    });
            });
    }

    onPageChange(event: any) {
        this.queryParams = {
            page: event.page,
            pageSize: this.defaultPageSize
        }
        this.onGetProcesses();
    }

    onPageSizeChange(size: number) {
        this.queryParams = {
            pageSize: size
        }
        this.defaultPageSize = size;
        this.onGetProcesses();
    }



}
