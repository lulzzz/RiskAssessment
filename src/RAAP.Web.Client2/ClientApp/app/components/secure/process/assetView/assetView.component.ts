import {
    Component, Inject, OnInit, NgModule, Input, ViewEncapsulation,
    OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked,
    AfterViewInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef, ContentChild
} from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Process, ProcessCategory } from '../../../../models/process.model';
import { UserService } from '../../../../services/user.service';
import { DialogsService } from '../../../../shared/dialogs.service';
import { AlertService } from '../../../../services/alert.service';
import { AssetService } from '../../../../services/asset.service';
import { AddAssetDialogComponent } from '../../../secure/confirm-dialog/add-asset-dialog/add-asset-dialog.component';
import { AddEvaluationDialogComponent } from '../../../secure/dialogs/add-evaluation-dialog/add-evaluation-dialog.component';
import { Asset, TimeCosts } from '../../../../models/asset.model';
import { Risk } from '../../../../models/risk.model';
import { Evaluation } from '../../../../models/evaluation.model';
import { Threat } from '../../../../models/threat.model';

@Component({
    selector: 'app-asset-view',
    templateUrl: './assetView.component.html',
    styleUrls: ['./assetView.component.css']
})

export class AssetViewComponent implements OnInit {
    public showLoadingIcon: boolean;
    assetViewForm: FormGroup;
    id: number = 0;
    asset: Asset;
    risks: Risk[] = [];
    processDescription: string;
    processResponsavlePerson: string;
    selectedEvaluation: Evaluation;
    rows: Threat[] = [];
    public name: string = "";
    public timeCosts: TimeCosts[];

    constructor(private fb: FormBuilder,
        private userService: UserService,
        private dialogService: DialogsService,
        private alertService: AlertService,
        private assetService: AssetService,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {
        if (this.route.snapshot.params["id"]) {
            this.id = +this.route.snapshot.params["id"];
        }

        this.createForm();
        this.onGetAssets();
        this.loadData();
    }

    ngOnInit() {
        this.loadData();
    }

    onGetAssets() {
        this.assetService.getAsset(this.id)
            .subscribe(
                response => {
                    this.assetViewForm.patchValue(response)
                    this.asset = response;
                    this.name = response.name;
                    this.risks = this.asset.risks;
                    this.selectedEvaluation = response.evaluations[0];
                    this.timeCosts = response.timeCosts;
                });
    }

    //minutesToDDHHmm() {
    //    minNum: number = this;
    //    var days = Math.floor(minNum / 1440);
    //    minNum -= days * 1440;
    //    var hours = Math.floor(minNum / 60);
    //    minNum -= hours * 60;
    //    var minutes = minNum;

    //    if (days < 10) { days = "0" + days; }
    //    if (hours < 10) { hours = "0" + hours; }
    //    if (minutes < 10) { minutes = "0" + minutes; }
    //    var time = days + ':' + hours + ':' + minutes;

    //    return time;
    //};


    createForm() {
        this.assetViewForm = this.fb.group({
            assetId: 0,
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            subCategory: 0,
            category: [0, [Validators.required]],
            risks: [0],
            threats: [0],
            assets: [0],
            asset: [0, [Validators.required]],
            businessContinuityPlans: [0],
            evaluations: [0],
            timeCosts: this.fb.array([]),
            criticalityCategory: '',
            assetSubCategory: '',
            categoryName: '',
            critCatName: '',
            enabled: 0,
            enabledRequiresBusinesContinuityPlan: 0,
            systemRecoveryTime: 0,
            dataRecoveryTime: 0,
            integrityCheckTime: 0,
            maxDownTime: 0,
            systemRecoveryCost: 0,
            dataRecoveryCost: 0,
            integrityCheckCost: 0,
            maxDownCost: 0,
            calculateSubRecovery: [false],
            calculateSubCriticality: [false],
            requiresBusinessContinuityPlan: [false],
            confidenciality: 0,
            authenticity: 0,
            availability: 0,
            integrity: 0,
        })
    }

    pushAssetThreatsToList(currentAsset: Asset) {
        for (var i = 0; i < currentAsset.threats.length; i++) {
            currentAsset.threats[i].assetName = currentAsset.name;
            currentAsset.threats[i].controlsCount = currentAsset.threats[i].controls.length;
            this.rows.push(currentAsset.threats[i]);
            for (var j = 0; j < currentAsset.assets.length; j++) {
                var subAsset = currentAsset.assets[j];
                this.pushAssetThreatsToList(subAsset);
            }
        }
    }

    loadData() {
        this.assetService.getAsset(this.id)
            .subscribe(
                response => {
                    this.rows = response.threats;
                    this.rows.forEach(i => { i.assetName = response.name, i.controlsCount = i.controls.length });
                    for (var i = 0; i < response.assets.length; i++) {
                        var currentAsset = response.assets[i];
                        this.pushAssetThreatsToList(currentAsset);
                    }
                });
    }

    onDelete() {
        this.dialogService
            .confirm('Delete', 'Are you sure you want to delete this item?')
            .subscribe(result => {
                if (result) {
                    this.assetService.deleteAsset(this.id).subscribe((data => {
                        this.alertService.info("INFO! The asset was deleted.");
                        setTimeout(() => {
                            this.router.navigate(['/processdashboard']);
                        }, 2000);
                    }))
                }
            });
    }

}