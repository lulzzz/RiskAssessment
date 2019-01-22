import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, ChangeDetectorRef, OnInit, AfterViewInit, ViewChild, EventEmitter, Output, Input, ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Asset } from '../../../../models/asset.model';
import { AssetService } from '../../../../services/asset.service';
import { PagedQuery, PagedResult } from '../../../../models/common.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AssetComponent } from '../../inventory/asset/asset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BusinessContinuityPlan } from '../../../../models/businessContinuityPlan.model';


@Component({
    selector: 'app-businessContinuity-dialog',
    templateUrl: './add-businessContinuity-dialog.component.html',
    styleUrls: ['./add-businessContinuity-dialog.component.css']
})
export class AddBusinessContinuityDialogComponent implements OnInit {
    onAddBusiniessContinuityPlan = new EventEmitter();
    private ref: MatDialogRef<AddBusinessContinuityDialogComponent>;
    form: FormGroup;
    businessContinuityPlan: BusinessContinuityPlan;


    @ViewChild(DatatableComponent) table: DatatableComponent;
    constructor(private dialogRef: MatDialogRef<AddBusinessContinuityDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.ref = dialogRef;
        this.businessContinuityPlan = new BusinessContinuityPlan();
        this.businessContinuityPlan.text = (data.businessContinuityPlans.length) ? data.businessContinuityPlans[0].text : '';
        this.businessContinuityPlan.revision = (data.businessContinuityPlans.length) ? data.businessContinuityPlans[0].revision + 1 : 1;
    }

    ngOnInit() {
      
    }

    onCloseDialog() {
        this.dialogRef.close();
    }

    onAddBCP() {
        this.businessContinuityPlan.createdOn = new Date();
        this.onAddBusiniessContinuityPlan.emit(this.businessContinuityPlan);
    }
}