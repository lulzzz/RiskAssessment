import { Component, Inject, ChangeDetectorRef, OnInit, Input, ViewChild } from '@angular/core';

import { Threat } from '../../../../models/threat.model';
import { ThreatService } from '../../../../services/threat.service';
import { PagedQuery, PagedResult, SimpleSearchResult } from '../../../../models/common.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router, ActivatedRoute } from '@angular/router';
import { HelpService } from '../../../../services/help.service';

@Component({
    selector: 'app-threat',
    templateUrl: './threat.component.html',
    styleUrls: ['./add-edit-threat.component.css']
})
export class ThreatComponent implements OnInit {
    public showLoadingIcon: boolean;
    private ref: ChangeDetectorRef;

    threats: Threat[] = [];
    threatCopy: Threat;
    queryParams: any;
    tableData: any = {};
    defaultPageSize: number = 100;
    pageSizes: object = [10, 20, 50, 100];

    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(ref: ChangeDetectorRef,
        private threatService: ThreatService,
        private router: Router,
        private route: ActivatedRoute,
        private helpService:HelpService
    ) {
        this.ref = ref;
        this.showLoadingIcon = false;

        this.queryParams = {
            pageSize: this.defaultPageSize
        }
    }

    ngOnInit() {
        this.onGetThreats();
    }

    onGetThreats() {
        this.threatService.getThreats(this.queryParams)
            .subscribe(
            response => {
                this.threats = response.items;
                this.tableData['currentPage'] = response.currentPage;
                this.tableData['totalItems'] = response.totalItems;
                this.tableData['totalPages'] = response.totalPages;
            });
    }

    filterThreatName(event: any) {
        const val = event.target.value.toLowerCase();

        const temp = this.threats.filter(function (result) {
            return result.name.toLowerCase().indexOf(val) !== -1 || !val;
        });

        this.threats = temp;
        this.table.offset = 0;
    }

    onCopy(threatId: number) {

        this.threatService.getThreat(threatId)
            .subscribe(
            response => {
                this.threatCopy = response;

                this.helpService.isNameAvaiable(this.threatCopy.name, 'threat')
                    .subscribe(response => {
                        this.threatCopy.name = response;
                        this.threatCopy.threatId = 0;
                        this.threatService.createThreat(this.threatCopy).subscribe((data) => {
                            this.router.navigate(['/threat/edit/' + data.threatId]);
                        })

                    });
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
