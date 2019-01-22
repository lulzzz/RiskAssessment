import { Component, Inject, OnInit, Optional, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Threat, ThreatCategory } from '../../../../models/threat.model';
import { ThreatService } from '../../../../services/threat.service';
import { ThreatComponent } from '../threat/threat.component';
import { DialogsService } from '../../../../shared/dialogs.service';
import { AlertService } from '../../../../services/alert.service';
import { AddEvaluationDialogComponent } from '../../dialogs/add-evaluation-dialog/add-evaluation-dialog.component';
import { AddControlsDialogComponent } from '../../dialogs/add-controls-dialog/add-controls-dialog.component';
import { AddCauseDialogComponent } from '../../dialogs/add-cause-dialog/add-cause-dialog.component';
import { Evaluation } from '../../../../models/evaluation.model';
import { Control } from '../../../../models/control.model';
import { Attribute } from '../../../../models/attribute.model';
import { Risk } from '../../../../models/risk.model';
import { ErrorObject } from '../../../../models/error-object.model';

@Component({
    selector: 'app-add-edit-threat',
    templateUrl: './add-edit-threat.component.html',
    styleUrls: ['./add-edit-threat.component.css']
})

export class AddEditThreatComponent implements OnInit {
    @Output() onEditThreat: EventEmitter<Threat> = new EventEmitter();
    @Output() onDeleteThreat: EventEmitter<Threat> = new EventEmitter();

    threatCategory: ThreatCategory[];
    selectedCategory: ThreatCategory[];
    threatForm: FormGroup;
    id: number;
    editMode: boolean = false;
    riskControlsName: string[] = ['avoidRisk', 'shareRisk', 'reduceRisk', 'acceptRisk'];
    riskControlsValuesArray: any[] = [false, false, false, false];
    riskControlsValue: boolean = false;
    affectsControlsName: string[] = ['confidenciality', 'integrity', 'availability', 'authenticity'];
    affectsControlsValuesArray: any[] = [false, false, false, false];
    affectsControlsValue: boolean = false;
    evaluations: Evaluation[] = [];
    controls: Control[] = [];
    causes: Attribute[] = [];
    risks: Risk[] = [];
    selectedEvaluation: Evaluation;
    openTabsValue: boolean = false;
    disableButtons: boolean;
    threat: Threat;
    typeOfThreat = [
        { value: 1, name: 'Security' },
        { value: 2, name: 'Safety' }
    ];

    originOfThreat = [
        { value: 1, name: 'Internal' },
        { value: 2, name: 'External' },
        { value: 3, name: 'Both' }
    ];
    queryParams: any;
    defaultPageSize: number = 100;

    constructor(private fb: FormBuilder, @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private threatService: ThreatService,
        private dialogService: DialogsService,
        private alertService: AlertService,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {
        if (this.route.snapshot.params["id"]) {
            this.id = +this.route.snapshot.params["id"];
        }
        this.createForm();

        this.queryParams = {
            pageSize: this.defaultPageSize
        }
    }

    ngOnInit() {
        if (this.data)
            this.id = this.data.threatId;

        this.onGetThreatsCategory();
        if (this.id > 0) {
            this.editMode = true;
            this.threatService.getThreat(this.id)
                .subscribe(data => {
                    this.risks = data.risks;
                    this.threatForm.patchValue(data);
                    this.evaluations = data.evaluations;
                    this.controls = data.controls;
                    this.causes = data.causes;
                    this.evaluations = data.evaluations;
                    this.selectedEvaluation = this.evaluations[0];
                    const myControl = <FormArray>this.threatForm.controls['risks'];
                    data.risks.forEach((x) => {
                        myControl.push(this.fb.group({
                            calculatedIsoImpact: [x.calculatedIsoImpact],
                            calculatedIsoProbability: [x.calculatedIsoProbability],
                            calculatedIsoRisk: [x.calculatedIsoRisk],
                            calculatedNsRisk: [x.calculatedNsRisk],
                            calculatedNsThreat: [x.calculatedNsThreat],
                            calculatedNsValue: [x.calculatedNsValue],
                            calculatedNsVulnerability: [x.calculatedNsVulnerability],
                            isoImpact: [x.isoImpact],
                            isoProbability: [x.isoProbability],
                            isoRisk: [x.isoRisk],
                            name: [x.name],
                            nsRisk: [x.nsRisk],
                            nsThreat: [x.nsThreat],
                            nsValue: [x.nsValue],
                            nsVulnerability: [x.nsVulnerability],
                            riskId: [x.riskId],
                            type: [x.type]
                        }))
                    });
                })
        } else {
            this.threat = new Threat();
            this.threat.controls = [];
            this.threat.causes = [];
            this.threat.evaluations = [];
            this.risks = [];
            this.threatForm.patchValue(this.threat);
            const myControl = <FormArray>this.threatForm.controls['risks'];
        }

        this.riskControlsName.forEach((item, index) => {
            this.threatForm.get(item)!.valueChanges.subscribe(value => {
                this.riskControlsValuesArray[index] = value;
                this.riskControlsValue = (this.riskControlsValuesArray.indexOf(true) > -1);
            });
        });

        this.affectsControlsName.forEach((item, index) => {
            this.threatForm.get(item)!.valueChanges.subscribe(value => {
                this.affectsControlsValuesArray[index] = value;
                this.affectsControlsValue = (this.affectsControlsValuesArray.indexOf(true) > -1);
            });
        });
    }

    
    createForm() {

        this.threatForm = this.fb.group({
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
            risks: this.fb.array([])
        })
    }

    onGetThreatsCategory() {
        this.threatService.getThreatCategory(this.queryParams)
            .subscribe(
            response => {
                this.threatCategory = response.items;
                this.selectedCategory = response.items[0];
            });
    }

    onSubmit() {
        if (!this.threatForm.valid) {
            return
        }

        if (!this.riskControlsValue) {
            this.alertService.error("ERROR! Please check/enable atleast 1 on the risks.");
            return;
        }

        if (!this.affectsControlsValue) {
            this.alertService.error("ERROR! Please check/enable atleast 1 on the threat effects.");
            return;
        }

        this.disableButtons = true;
        let observable = this.editMode ? this.threatService.updateThreat(this.threatForm.value) : this.threatService.createThreat(this.threatForm.value);
        observable.subscribe(data => {
            if (data instanceof ErrorObject) {
                this.disableButtons = false;
            } else {
                let label = this.editMode ? "updated" : "created";
                this.alertService.success(`SUCCESS! The treat was ${label}.`);
                this.router.navigate(['/threat']);
            }
        });
    }

    onDelete() {
        this.dialogService
            .confirm('Delete', 'Are you sure you want to delete this item?')
            .subscribe(result => {
                if (result) {
                    this.disableButtons = true;
                    this.threatService.deleteThreat(this.id)
                        .subscribe((data => {
                            if (data instanceof ErrorObject) {
                                this.disableButtons = false;
                            } else {
                                this.alertService.info("INFO! The treat was delete.");
                                if (!this.data) {
                                    this.router.navigate(['/threat']);
                                } else {
                                    this.onDeleteThreat.emit(this.threatForm.value);
                                }
                            }
                        }));
                }
            });
    }

    onOpenEvaluationDialog() {
        let dialogRef = this.dialog.open(AddEvaluationDialogComponent, {
            disableClose: false,
            width: '700px',
            height: 'auto',
            data: {
                evaluations: this.evaluations
            }
        });

        dialogRef.componentInstance.onAddEvaluation.subscribe((data: any) => {
            this.threatForm.value.evaluations.unshift(data);
            this.selectedEvaluation = data;
        });
    }

    onOpenControlDialog() {
        let dialogRef = this.dialog.open(AddControlsDialogComponent, {
            disableClose: false,
            width: '700px',
            height: 'auto',
            data: {
                controls: this.controls
            }
        });

        const sub = dialogRef.componentInstance.onAddControl.subscribe((data: any) => {
            this.threatForm.value.controls.push(data[data.length - 1]);
            this.threatForm.value.controls = [...this.threatForm.value.controls];
        });

        dialogRef.afterClosed().subscribe(() => {
            sub.unsubscribe();
        });
    }

    onOpenCausesDialog() {
        let dialogRef = this.dialog.open(AddCauseDialogComponent, {
            disableClose: false,
            width: '700px',
            height: 'auto',
            data: {
                atributes: this.causes
            }
        });

        const sub = dialogRef.componentInstance.onAddCause.subscribe((data: any) => {
            this.threatForm.value.causes.push(data[data.length - 1]);
            this.threatForm.value.causes = [...this.threatForm.value.causes]; 
        });

        dialogRef.afterClosed().subscribe(() => {
            sub.unsubscribe();
        });
    }

    onRemoveControl(controlId: number) {
        this.threatForm.value.controls.forEach((t : any, i : any) => {
            if (t.controlId == controlId) {
                this.threatForm.value.controls.splice(i, 1);
                this.threatForm.value.controls = [...  this.threatForm.value.controls];
            }
        });
    }

    onRemoveCause(causeId: number) {
        this.threatForm.value.causes.forEach((t: any, i: any) => {
            if (t.attributeId == causeId) {
                this.threatForm.value.causes.splice(i, 1);
                this.threatForm.value.causes = [... this.threatForm.value.causes];
            }
        });
    }

    openTabs() {
        this.openTabsValue ? this.openTabsValue = false : this.openTabsValue = true;
    }

    onExit() {
        if (this.data && this.data.threatId) {
            this.dialog.closeAll();
        } else {
            this.router.navigate(['/threat']);
        }
    }
   
}

