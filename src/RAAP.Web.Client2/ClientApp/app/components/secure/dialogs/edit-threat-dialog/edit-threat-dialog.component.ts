import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, ChangeDetectorRef, OnInit, AfterViewInit, ViewChild, EventEmitter, Output, Input, ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Threat } from '../../../../models/threat.model';
import { ThreatService } from '../../../../services/threat.service';
import { PagedQuery, PagedResult } from '../../../../models/common.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ThreatComponent } from '../../inventory/threat/threat.component';


@Component({
    selector: 'app-edit-threat-dialog',
    templateUrl: './edit-threat-dialog.component.html',
    styleUrls: ['./edit-threat-dialog.component.css']
})
export class  EditThreatDialogComponent implements OnInit {
    onEditThreet = new EventEmitter();
    onChangeThreat: EventEmitter<Threat> = new EventEmitter<Threat>();
    public showLoadingIcon: boolean;
    private ref: MatDialogRef<EditThreatDialogComponent>;
    id: number = 0;

    @ViewChild(DatatableComponent) table: DatatableComponent;
    constructor(private dialogRef: MatDialogRef<EditThreatDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
        private threatService: ThreatService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.ref = dialogRef;
        this.showLoadingIcon = false;
    }

    ngOnInit() {
        this.onEditThreet.emit(this.data.threatId);
    }

    onCloseDialog() {
        this.dialogRef.close();
    }

    editThreat(threat: Threat) {
        this.onChangeThreat.emit(threat);
        this.dialogRef.close();
    }

    deleteThreat(threat: Threat) {
        this.onChangeThreat.emit(threat);
        this.dialogRef.close();
    }
}