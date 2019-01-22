import {
    Component, Inject, OnInit, NgModule, Input, ViewEncapsulation,
    OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked,
    AfterViewInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef, ContentChild
} from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Process, ProcessCategory } from '../../../../models/process.model';
import { UserService } from '../../../../services/user.service';
import { DialogsService } from '../../../../shared/dialogs.service';
import { AlertService } from '../../../../services/alert.service';
import { ThreatService } from '../../../../services/threat.service';
import { AddAssetDialogComponent } from '../../../secure/confirm-dialog/add-asset-dialog/add-asset-dialog.component';
import { AddEvaluationDialogComponent } from '../../../secure/dialogs/add-evaluation-dialog/add-evaluation-dialog.component';
import { Threat } from '../../../../models/threat.model';
import { Risk } from '../../../../models/risk.model';
import { Evaluation } from '../../../../models/evaluation.model';

@Component({
    selector: 'app-threat-view',
    templateUrl: './threatView.component.html',
    styleUrls: ['./threatView.component.css']
})

export class ThreatViewComponent implements OnInit {
    public showLoadingIcon: boolean;
    threatViewForm: FormGroup;
    id: number = 0;
    threat: Threat;
    risks: Risk[] = [];
    processDescription: string;
    processResponsavlePerson: string;
    selectedEvaluation: Evaluation;

    constructor(private fb: FormBuilder,
        private userService: UserService,
        private dialogService: DialogsService,
        private alertService: AlertService,
        private threatService: ThreatService,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {
        if (this.route.snapshot.params["id"]) {
            this.id = +this.route.snapshot.params["id"];
        }
        this.createForm();
    }

    ngOnInit() {
        this.onGetAssets();
    }

    onGetAssets() {
        this.threatService.getThreat(this.id)
            .subscribe(
            response => {
                this.threat = response;
                this.risks = this.threat.risks;
                this.selectedEvaluation = response.evaluations[0];
                this.threatViewForm.patchValue(response)
                console.log(response);
            });
    }

    createForm() {
        this.threatViewForm = this.fb.group({
            threatId: 0,
            name: ['', [Validators.required]],
            category: [1, [Validators.required]],
            description: [''],
            internalExternal: [1, [Validators.required]],
            securitySafety: [3, [Validators.required]],
            avoidRisk: [false],
            shareRisk: [false],
            reduceRisk: [false],
            acceptRisk: [false],
            confidenciality: [false],
            integrity: [false],
            availability: [false],
            authenticity: [false],
            evaluations: [''],
            controls: '',
            causes: '',
            categoryName: '',
            enabled: 0,
            risks: this.fb.array([]),
            riskUser: '',
            riskDate:''
        })
    }

    onDelete() {
        this.dialogService
            .confirm('Delete', 'Are you sure you want to delete this item?')
            .subscribe(result => {
                if (result) {
                    this.threatService.deleteThreat(this.id)
                        .subscribe((data => {
                            this.alertService.info("INFO! The treat was delete.");
                            setTimeout(() => {
                                this.router.navigate(['/processdashboard']);
                            }, 2000);
                        }));
                }
            });
    }
}