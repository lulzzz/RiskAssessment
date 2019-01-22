import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, ChangeDetectorRef, OnInit, AfterViewInit, ViewChild, EventEmitter, Output, Input, ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Threat } from '../../../../models/threat.model';
import { ThreatService } from '../../../../services/threat.service';
import { PagedQuery, PagedResult } from '../../../../models/common.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ThreatComponent } from '../../inventory/threat/threat.component';


@Component({
    selector: 'app-threat-dialog',
    templateUrl: './add-threat-dialog.component.html',
    styleUrls: ['./add-threat-dialog.component.css']
})
export class AddThreatDialogComponent implements OnInit {
    onAdd = new EventEmitter();
    public showLoadingIcon: boolean;
    private ref: MatDialogRef<AddThreatDialogComponent>;
    id: number = 0;
    threats: Threat[] = [];
    newThreats: Threat[] = [];
    addThreats: Threat[] = [];
    addedThreats: Threat[] = [];

    tableData: any = {};
    defaultPageSize: number = 50;
    orderByKey: string = 'Name';
    queryParams: any;
    pageSizes: object = [10, 20, 50, 100];

    @ViewChild(DatatableComponent) table: DatatableComponent;
    constructor(private dialogRef: MatDialogRef<AddThreatDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
        private threatService: ThreatService,
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
        this.onGetThreats();
    }

    onCloseDialog() {
        this.dialogRef.close();
    }

    onGetThreats() {
        this.threatService.getThreats(this.queryParams)
            .subscribe(
            response => {
                this.newThreats = [];
                this.threats = response.items;
                this.tableData['currentPage'] = response.currentPage;
                this.tableData['totalPages'] = response.totalPages;
                this.tableData['totalItems'] = response.totalItems;
                this.addedThreats = this.data.threatForm;

                for (var i = 0; i < this.threats.length; i++) {
                    var u = 0;
                    let existingthreat= false;

                    for (let singleThreat of this.addedThreats) {
                        if (this.threats[i].threatId == singleThreat.threatId)
                            existingthreat = true;
                    }

                    if (existingthreat == true)
                        continue;

                    if (this.addedThreats.length == 0)
                        this.newThreats.push(this.threats[i]);

                    for (var j = 0; j < this.addedThreats.length; j++) {
                        if (this.addedThreats[j].threatId != this.threats[i].threatId) {
                            u++;
                            if (this.addedThreats.length == u) {
                                this.newThreats.push(this.threats[i]);
                            }
                        }
                    }
                }

                this.threats = this.newThreats;
                this.tableData['totalItems'] -= response.items.length - this.threats.length;
            });
    }

    onAddThreat(threatId: number) {
        this.threats.forEach((t, i) => {
            if (t.threatId == threatId) {
                this.threats.splice(i, 1);
                this.threats = [...this.threats];
            }
        });

        this.threatService.getThreat(threatId)
            .subscribe(response => {
                response.controlsCount = response.controls.length;
                this.addThreats.push(response);
                this.onAdd.emit(this.addThreats);
                this.data = this.addThreats;
            });
    }

    onPageChange(event: any) {
        this.queryParams = {
            page: event.page,
            pageSize: this.defaultPageSize
        }
        this.onGetThreats();
    }

    onPageSizeChange(size: number) {
        this.queryParams = {
            pageSize: size
        }
        this.defaultPageSize = size;
        this.onGetThreats();
    }
}