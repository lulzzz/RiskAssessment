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
import { ProcessService } from '../../../../services/process.service';
import { AddAssetDialogComponent } from '../../../secure/confirm-dialog/add-asset-dialog/add-asset-dialog.component';
import { AddEvaluationDialogComponent } from '../../../secure/dialogs/add-evaluation-dialog/add-evaluation-dialog.component';
import { Asset } from '../../../../models/asset.model';
import { Risk } from '../../../../models/risk.model';
import { Evaluation } from '../../../../models/evaluation.model';
import { Threat } from "../../../../models/threat.model";
@Component({
    selector: 'app-process-view',
    templateUrl: './processView.component.html',
    styleUrls: ['./processView.component.css']
})

export class ProcessViewComponent implements OnInit {
    public showLoadingIcon: boolean;
    processViewForm: FormGroup;
    id: number = 0;
    process: Process;
    risks: Risk[] = [];
    processDescription: string;
    processResponsavlePerson: string;
    selectedEvaluation: Evaluation;
    rows: Threat[] = [];
    processTemp: Process;
    constructor(private fb: FormBuilder,
        private userService: UserService,
        private dialogService: DialogsService,
        private alertService: AlertService,
        private processService: ProcessService,
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
        this.onGetProcess();
        this.loadData();
    }

    onGetProcess() {
        this.processService.getProcess(this.id)
            .subscribe(
                response => {
                    this.processViewForm.patchValue(response)
                    this.process = response;
                    this.risks = this.process.risks;
                    this.selectedEvaluation = response.evaluations[0];
                });
    }

    createForm() {
        this.processViewForm = this.fb.group({
            processId: 0,
            name: ['', [Validators.required]],
            threats: [0, [Validators.required]],
            categoryName: '',
            category: [0, [Validators.required]],
            assets: [''],
            users: [0, [Validators.required]],
            evaluations: [''],
            responsibleUser: '',
            description: [''],
            enabled: 0,
        })
    }

    onDelete() {
        this.dialogService
            .confirm('Delete', 'Are you sure you want to delete this item?')
            .subscribe(result => {
                if (result) {
                    this.processService.deleteProcess(this.id).subscribe(() => {
                        this.alertService.info("INFO! The business process was deleted.");
                        setTimeout(() => {
                            this.router.navigate(['/processdashboard']);
                        }, 2000);
                    });
                }
            });
    }

    checkIsThereThreat(threatId: number): boolean {
        for (var i = 0; i < this.rows.length; i++) {
            if (this.rows[i].threatId == threatId)
                return false;
        }
        return true;
    }

    pushAssetThreatsToList(currentAsset: Asset) {
        for (var i = 0; i < currentAsset.threats.length; i++) {
            currentAsset.threats[i].assetName = currentAsset.name;
            currentAsset.threats[i].controlsCount = currentAsset.threats[i].controls.length;
            if (this.checkIsThereThreat(currentAsset.threats[i].threatId))
                this.rows.push(currentAsset.threats[i]);
            if (currentAsset.assets) {
                for (var j = 0; j < currentAsset.assets.length; j++) {
                    var subAsset = currentAsset.assets[j];
                    this.pushAssetThreatsToList(subAsset);
                }
            }
        }
    }

    loadData() {
        this.processService.getProcess(this.id).subscribe((data) => {
            this.processTemp = data;
            for (var i = 0; i < this.processTemp.assets.length; i++) {
                var currentAsset = this.processTemp.assets[i];
                this.pushAssetThreatsToList(currentAsset);
            }
        });
    }
}