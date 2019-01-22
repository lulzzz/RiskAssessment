import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent, MatDatepickerInputEvent } from '@angular/material';
import { AssetService } from '../../../../services/asset.service';
import { AssetComponent } from '../asset/asset.component';
import { Asset, AssetSubCategory, AssetCategory } from '../../../../models/asset.model';
import { Threat } from '../../../../models/threat.model';
import { TimeCost } from '../../../../models/timeCost.model';
import { Evaluation } from '../../../../models/evaluation.model';
import { BusinessContinuityPlan } from '../../../../models/businessContinuityPlan.model';
import { Risk, RiskCategory } from '../../../../models/risk.model';
import { CriticalityCategory } from '../../../../models/criticality.model';
import { DialogsService } from '../../../../shared/dialogs.service';
import { AlertService } from '../../../../services/alert.service';
import { CategoriesService } from '../../../../services/categories.service';
import { AddAssetDialogComponent } from '../../../secure/dialogs/add-asset-dialog/add-asset-dialog.component';
import { AddThreatDialogComponent } from '../../../secure/dialogs/add-threat-dialog/add-threat-dialog.component';
import { EditThreatDialogComponent } from '../../../secure/dialogs/edit-threat-dialog/edit-threat-dialog.component';
import { AddEvaluationDialogComponent } from '../../../secure/dialogs/add-evaluation-dialog/add-evaluation-dialog.component';
import { AddBusinessContinuityDialogComponent } from '../../../secure/dialogs/add-businessContinuity-dialog/add-businessContinuity-dialog.component';
import { SoaService } from '../../../../services/soa.service';
import { ErrorObject } from '../../../../models/error-object.model';

@Component({
    selector: 'app-add-edit-asset',
    templateUrl: './add-edit-asset.component.html',
    styleUrls: ['./add-edit-asset.component.css']
})

export class AddEditAssetComponent implements OnInit {
    id: number;
    type_id: number = 1;
    editMode: boolean = false;
    sub: any;
    assetSubCategory: AssetSubCategory[];
    assetForm: FormGroup;
    subCategory: AssetSubCategory[];
    selectedsubCategory: AssetSubCategory[];
    assets: Asset[] = [];
    threats: Threat[] = [];
    asset: Asset;
    risks: Risk;
    evaluations: Evaluation[] = [];
    selectedEvaluation: Evaluation;
    timeCosts: TimeCost [] = [];
    businessContinuityPlans: BusinessContinuityPlan[] = [];
    selectedBusinessContinuityPlan: BusinessContinuityPlan;
    criticalityCategories: CriticalityCategory[] = [];
    selectedCriticalityCategories: CriticalityCategory[];
    assetCategory: AssetCategory[] = [{ name: "Business", id: 1 }, { name: "Technical", id: 2 }, { name: "Physical", id: 3 }, { name: "Organizational", id: 4 }];
    selectedAssetCategory = this.assetCategory[0].id;
    disableButtons: boolean = false;
    riskCategories: RiskCategory[];
    enableEvaluation: boolean =false;

    statistics: any;
    showAssetList: any[];
    isoAssetStats: any;
    helseAssetStats: any;
    gdprAssetStats: any;
    subSelectedIndex: number = 0;
    enableIso: boolean = false;
    enableHelse: boolean = false;
    enableGdpr: boolean = false;
    showAssetListLabel: any;
    pie: any;
    helsePie: any = {};
    isoPie: any = {};
    gdprPie: any = {};
    isoCode: string = 'en-us';
    pieChartType: string = 'pie';
    pieChartData: number[] = [1];
    pieChartLabels: string[] = ["Not started", "In progress", "Deadline passed", "Implemented"];
    pieChartColors: any[] = [{
        backgroundColor: ["#00A9FF", "#7e349b", "#f02c09", "#2EA319"]
    }];
    pieChartLegend: boolean = true;
    pieChartOptions: any = {};

    // asset soas
    assetSoas: any[] = [];
    subCategories: any[] = [];
    reverseAssetRoot: any;
    criticalityCategory: any;

    // pagination
    tableData: any = {};
    defaultPageSize: number = 100;
    orderByKey: string = 'Name';
    queryParams: any;
    pageSizes: object = [10, 20, 50, 100];

    // tree
    generateGraph: boolean = false;
    fullAssets: Asset[];
    treeDataDepends: any = {};
    treeDataOtherDepends: any = {};

    constructor(private fb: FormBuilder,
        private assetService: AssetService,
        private dialogService: DialogsService,
        private alertService: AlertService,
        private router: Router,
        private categoryService: CategoriesService,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private soaService: SoaService) {

        if (this.route.snapshot.params["id"]) {
            this.id = +this.route.snapshot.params["id"];
        }

        if (this.route.snapshot.params["type_id"]) {
            this.type_id = +this.route.snapshot.params["type_id"];

            this.queryParams = {
                pageSize: this.defaultPageSize,
                orderByKey: this.orderByKey
            }
        }
        this.createForm();

    }
    ngOnInit() {
        this.onGetAssetSubCategory();
        this.onGetCriticalityCategories();
        this.getRiskCategories();
        if (this.id > 0) {
            this.editMode = true;

            this.isoPie.pieChartLabels = this.pieChartLabels;
            this.isoPie.pieChartData = this.pieChartData;
            this.isoPie.pieChartColors = this.pieChartColors;

            this.helsePie.pieChartLabels = this.pieChartLabels;
            this.helsePie.pieChartData = this.pieChartData;
            this.helsePie.pieChartColors = this.pieChartColors;

            this.gdprPie.pieChartLabels = this.pieChartLabels;
            this.gdprPie.pieChartData = this.pieChartData;
            this.gdprPie.pieChartColors = this.pieChartColors;


            this.assetService.getAsset(this.id)
                .subscribe(
                response => {
                    this.evaluations = response.evaluations;
                    this.selectedEvaluation = this.evaluations[0];
                    this.businessContinuityPlans = response.businessContinuityPlans;
                    this.selectedBusinessContinuityPlan = this.businessContinuityPlans[0]
                    this.asset = response;
                    this.setAssetType();
                    this.timeCosts = this.asset.timeCosts;
                    this.threats = response.threats;
                    this.setThreadControls();
                    this.assetForm.patchValue(this.asset);
                    this.assets = this.asset.assets;
                    this.assetForm.value.assetSubCategory = this.assetForm.value.subCategory.name;
                    this.enableEvaluation = response.requiresBusinessContinuityPlan;
                    const myControl = <FormArray>this.assetForm.controls['timeCosts'];
                    response.timeCosts.forEach((x) => {
                        myControl.push(this.fb.group({
                            timeCostId: [x.timeCostId],
                            cost: [x.cost],
                            time: [x.time]
                        }))
                    });

                    
                    this.pieChartOptions = this.getPieChartOptions();

                    this.loadSoaData();
                    this.getTreeData();
                });
        } else {
            this.asset = new Asset();
            this.asset.risks = [];
            this.asset.threats = [];
            this.asset.assets = [];
            this.asset.businessContinuityPlans = [];
            this.asset.evaluations = [];
            this.assetForm.patchValue(this.asset);
            const myControl = <FormArray>this.assetForm.controls['timeCosts'];

            this.asset.timeCosts.forEach((x) => {
                myControl.push(this.fb.group({
                    cost: [x.cost],
                    time: [x.time]
                }))
            });
        }
    }

    getTreeData() {
        this.assetService.getAllAssets()
            .subscribe(
            response => {
                this.fullAssets = response.items;
                this.fillTree();
            });
    }

    createForm() {
        this.assetForm = this.fb.group({
            assetId: 0,
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            subCategory: ['', [Validators.required]],
            category: ['', [Validators.required]],
            risks: [0],
            threats: [0],
            assets: [0],
            asset: [0, [Validators.required]],
            businessContinuityPlans: [0],
            evaluations: [0],
            timeCosts: this.fb.array([]),
            criticalityCategory: ['', [Validators.required]],
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
        });
    }

    onGetAssetSubCategory() {

        this.assetService.getAssetsSubCategorie(this.queryParams)
            .subscribe(
            response => {
                this.subCategory = response.items;
                this.selectedsubCategory = response.items[0];
                this.tableData['currentPage'] = response.currentPage;
                this.tableData['totalItems'] = response.totalItems;
                this.tableData['totalPages'] = response.totalPages;
            });
    }

    onGetCriticalityCategories() {
        this.categoryService.getCategories('criticalitycategory', this.queryParams)
            .subscribe(response => {
                this.criticalityCategories = response.items;
                this.selectedCriticalityCategories = response.items[0];
                this.tableData['currentPage'] = response.currentPage;
                this.tableData['totalItems'] = response.totalItems;
                this.tableData['totalPages'] = response.totalPages;
            });
    }

    onDelete() {
        this.dialogService
            .confirm('Delete', 'Are you sure you want to delete this item?')
            .subscribe(result => {
                if (result) {
                    this.disableButtons = true;
                    this.assetService.deleteAsset(this.id).subscribe((data => {
                        if (data instanceof ErrorObject) {
                            this.disableButtons = false;
                        } else {
                            this.alertService.info("INFO! The asset was deleted.");
                            this.router.navigate(['/asset']);
                        }
                    }))
                }
                this.router.navigate(['/asset/edit/', this.id]);
            });
    }

    onSubmit() {
        if (!this.assetForm.valid) {
            return
        }

        this.disableButtons = true;
        this.assetForm.value.maxDownTime = this.assetForm.value.systemRecoveryTime + this.assetForm.value.dataRecoveryTime + this.assetForm.value.integrityCheckTime;
        this.assetForm.value.maxDownCost = this.assetForm.value.systemRecoveryCost + this.assetForm.value.dataRecoveryCost + this.assetForm.value.integrityCheckCost;
        if (!this.editMode) {
            this.assetService.createAsset(this.assetForm.value)
                .subscribe((data) => this.handleOnSubmit(data))
        } else {
            this.soaService.updateAssetSoas(this.assetSoas) 
                .subscribe((assetSoaData) => {
                    this.assetService.updateAsset(this.assetForm.value)
                        .subscribe((assetData) => this.handleOnSubmit(assetData))
                })
        }
    }

    handleOnSubmit(data: any) {
        if (data instanceof ErrorObject) {
            this.disableButtons = false;
        } else {
            let label = this.editMode ? "updated" : "created";
            this.alertService.success(`SUCCESS! The asset was ${label}.`);
            this.router.navigate(['/asset']);
        }
    }

    onOpenAssetDialog() {
        let dialogRef = this.dialog.open(AddAssetDialogComponent, {
            disableClose: false,
            width: '700px',
            height: 'auto',
            data: {
                assets: this.assets,
                id: this.id,
                assetForm: this.assetForm.value.assets
            }
        });

        const sub = dialogRef.componentInstance.onAdd.subscribe((data: any) => {
            let lastAsset = data[data.length - 1];
            this.assets.push(lastAsset);
        });

        dialogRef.afterClosed().subscribe(() => {
            sub.unsubscribe();
        });
    }

    onOpenEvaluationDialog() {
        let dialogRef = this.dialog.open(AddEvaluationDialogComponent, {
            disableClose: false,
            width: '700px',
            height: '400px',
            data: {
                evaluations: this.evaluations
            }
        });

        dialogRef.componentInstance.onAddEvaluation.subscribe((data: any) => {
            this.assetForm.value.evaluations.unshift(data);
            this.selectedEvaluation = data;
        });
    }

    onOpenPlanDialog() {
        let dialogRef = this.dialog.open(AddBusinessContinuityDialogComponent, {
            disableClose: false,
            width: '700px',
            height: 'auto',
            data: {
                businessContinuityPlans: this.businessContinuityPlans
            }
        });
        dialogRef.componentInstance.onAddBusiniessContinuityPlan.subscribe((data: BusinessContinuityPlan) => {
            this.assetForm.value.businessContinuityPlans.unshift(data);
            this.selectedBusinessContinuityPlan = data;
        });
    }

    onRemoveAsset(asset: Asset) {
        let index = this.assets.findIndex(x => x.assetId == asset.assetId);
        this.assets.splice(index, 1);
    }

    onOpenThreatDialog() {
        let dialogRef = this.dialog.open(AddThreatDialogComponent, {
            disableClose: false,
            width: '700px',
            height: 'auto',
            data: {
                threats: this.threats,
                id: this.id,
                threatForm: this.assetForm.value.threats
            }
        });

        const sub = dialogRef.componentInstance.onAdd.subscribe((data: any) => {
            this.threats.push(data[data.length - 1]);
        });

        dialogRef.afterClosed().subscribe(() => {
            sub.unsubscribe();
        });
    }

    onOpenEditThreatDialog(threat: Threat) {
        let threatId = threat.threatId;
        let dialogRef = this.dialog.open(EditThreatDialogComponent, {
            disableClose: false,
            width: 'auto',
            height: 'auto',
            data: {
                threatId: threatId,
            }
        });

        const sub = dialogRef.componentInstance.onChangeThreat.subscribe((data: Threat) => {
            this.assetService.getAsset(this.id)
                .subscribe(x => this.threats = x.threats);
        });

        dialogRef.afterClosed().subscribe(() => {
            sub.unsubscribe();
        });
    }

    onRemoveThreat(threat: Threat) {
        let index = this.threats.findIndex(x => x.threatId == threat.threatId);
        this.threats.splice(index, 1);
    }

    onOpenNewAsset(asset: Asset) {
        let id = asset.assetId;
        this.dialogService
            .confirm('You are leaving this asset', 'Do you want to leave this asset?')
            .subscribe(result => {
                if(result)
                     this.router.navigate(['/asset/edit/', id]);
            });
    }

    setAssetType() {
        for (var i = 0; i < this.asset.assets.length; i++) {
            for (var j = 0; j < this.assetCategory.length; j++) {
                if (this.asset.assets[i].category == this.assetCategory[j].id) {
                    this.asset.assets[i].type = this.assetCategory[j].name;
                }
            }
        }
    }

    setThreadControls() {
        for (var i = 0; i < this.asset.threats.length; i++) {
            this.asset.threats[i].controlsCount = this.asset.threats[i].controls.length;
        }
    }

    getRiskCategories(): void {
        this.categoryService.getCategories('company/GetRiskTypes', this.queryParams).subscribe(data => {
            this.riskCategories = data.items;
            this.tableData['currentPage'] = data.currentPage;
            this.tableData['totalItems'] = data.totalItems;
            this.tableData['totalPages'] = data.totalPages;
        })
    }

    onTabChanged(tabChangeEvent: MatTabChangeEvent): void {
        this.subSelectedIndex = tabChangeEvent.index;
        this.showAssetList = [];
    }

    getPieChartOptions() {
        return {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: '#333',
                    generateLabels: function (chart: any) {
                        let data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map(function (label: any, i: number) {
                                let meta = chart.getDatasetMeta(0);
                                let ds = data.datasets[0];
                                let arc = meta.data[i];
                                let custom = arc && arc.custom || {};

                                let arcOpts = chart.options.elements.arc;
                                let fill = ds.backgroundColor[i] ? ds.backgroundColor[i] : '#333';
                                let stroke = ds.backgroundColor[i] ? ds.backgroundColor[i] : '#333';
                                let bw = custom.borderWidth ? custom.borderWidth : '#333';

                                let textValue = ds.data[i] ? ': ' + ds.data[i] : ''

                                return {
                                    text: label + textValue,
                                    fillStyle: fill,
                                    strokeStyle: stroke,
                                    lineWidth: bw,
                                    hidden: isNaN(ds.data[i]) || meta.data[i].hidden || ds.data[i] == 0,
                                    index: i
                                };
                            });
                        }
                        return [];
                    }
                }
            },
            title: {
                display: true,
                text: ['Status', 'Assets'],
                fontColor: '#333',
                fontSize: 22
            },
            rotation: -0.7 * Math.PI,
            circumference: 2 * Math.PI,
            animation: {
                duration: 1000,
                easing: "linear",
                animateRotate: true,
                onProgress: function (animation: any) {
                },
                onComplete: function (animation: any) {
                }
            }
        }
    }

    generateStatisticsPie(pieName: string, data: any) {
        let pieData: any = {};
        let pieChartData: number[] = [];

        for (let single of data) {
            pieChartData.push(single.value);
        }
        return pieChartData;
    }

    // Start of Asset SOA methods
    getAssetSoas(soaType: number) {
        for (let i = 0; i < this.assetSoas.length; i++) {
            if (this.assetSoas[i].soaType == soaType)
                return this.assetSoas[i].assetSoas;
        };
        return [];
    };

    getSoaPercentageData(soaType:number) {
        let soas = this.getAssetSoas(soaType);

        let impl = 0;
        let NA = 0;
        let work = 0;
        let pastdeadline = 0;
        for (let i = 0; i < soas.length; i++) {
        
            let deadlineDate = new Date(soas[i].deadline).getTime();
            if (soas[i].implemented == true)
                impl += 1;
            else if (deadlineDate && deadlineDate > Date.now())
                work += 1;
            else if (soas[i].deadline && deadlineDate <= Date.now())
                pastdeadline += 1;
            else
                NA += 1;
        }
        
        return [
            {
                "label": "Not implemented",
                "value": NA,
                "color": "#00A9FF"
            },
            {
                "label": "In progress",
                "value": work,
                "color": "#7e349b"
            },
            {
                "label": "deadline passed",
                "value": pastdeadline,
                "color": "#f02c09"
            },
            {
                "label": "Implemented",
                "value": impl,
                "color": "#2EA319"
            },
        ];
    };

    generateSoaPie(pieName: string, data: any) {
        let pieData: any = {};
        let pieChartData: number[] = [];

        for (let single of data) {
            pieChartData.push(single.value);
        }
        return pieChartData;
    }

    loadSoaData() {
        this.assetService.getAssetsSubCategorie(this.queryParams)
            .subscribe(response => {
                this.subCategories = response.items;

                this.categoryService.getCategories('criticalitycategory', this.queryParams)
                    .subscribe(response => {
                        this.criticalityCategories = response.items;
                        this.criticalityCategory = this.criticalityCategories[0];

                        this.assetService.getReverse(this.id)
                            .subscribe(response => {
                                this.reverseAssetRoot = response;

                                this.soaService.getAssetSoas(this.id, 'en-us')
                                    .subscribe(response => {
                                        this.assetSoas = response;
                                        this.updatePieChartData();

                                        this.soaService.getRelevantSoas()
                                            .subscribe(response => {
                                                for (let i = 0; i < response.length; i++) {
                                                    if (response[i] == 1)
                                                        this.enableIso = true;
                                                    else if (response[i] == 4)
                                                        this.enableHelse = true;
                                                    else if (response[i] == 5)
                                                        this.enableGdpr = true;
                                                };
                                            })
                                    })
                            })
                    })
            })
    };

    onSoaDateChange(singleAssetSoa: any, key: string, event: MatDatepickerInputEvent<Date> ) {
        let adjustedDate = this.adjustForTimezone(event.value);
        if (adjustedDate) {
            singleAssetSoa[key] = adjustedDate.toISOString();
        }

        this.updatePieChartData();
    }

    onSoaChange(singleAssetSoa: any, type: string, event: any) {
        if (type == 'comment') {
            singleAssetSoa.comment = event.target.value;
        } else {
            singleAssetSoa.implemented = event.checked;
        }

        this.updatePieChartData();
    }

    adjustForTimezone(date: Date | null): Date | null{
        if (date) {
            var timeOffsetInMS: number = date.getTimezoneOffset() * 60000;
            date.setTime(date.getTime() - timeOffsetInMS);
        }

        return date
    }

    updatePieChartData() {
        this.isoPie.pieChartData = this.generateSoaPie('isoPie', this.getSoaPercentageData(1));
        this.helsePie.pieChartData = this.generateSoaPie('helsePie', this.getSoaPercentageData(4));
        this.gdprPie.pieChartData = this.generateSoaPie('gdprPie', this.getSoaPercentageData(5));
    }

    fillTree() {
        this.treeDataDepends['name'] = this.asset.name;
        this.treeDataDepends['parent'] = null;
        this.treeDataDepends['children'] = this.fillChildren(this.asset.assets, this.asset.name);
        this.treeDataOtherDepends['name'] = this.asset.name;
        this.treeDataOtherDepends['parent'] = null;
        this.treeDataOtherDepends['children'] = this.fillDependChildren(this.fullAssets, this.asset);
        this.generateGraph = true;
    }

    fillChildren(arrayAssets: Asset[], parent: any): any[] {
        let children: any = [];
        arrayAssets.forEach(a => {
            let child: any = {};
            child['name'] = a.name;
            child['parent'] = parent;
            child['children'] = this.fillChildren(a.assets, a.name);
            children.push(child);
        })
        return children;
    }

    fillDependChildren(arrayAsset: Asset[], selectedAsset: Asset): any[] {
        let children: any = [];
        arrayAsset.forEach(x => {
            x.assets.forEach(y => {
                if (y.assetId == selectedAsset.assetId) {
                    let child: any = {};
                    child.name = x.name;
                    child.children = [];
                    children.push(child);
                }
            });
        });
        return children;
    }
}