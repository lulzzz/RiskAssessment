import { Component } from '@angular/core';
import { ControlService } from '../../../../services/control.service';
import { UserService } from '../../../../services/user.service';
import { Control, ControlCategory, StatusCategory } from '../../../../models/control.model';
import { User} from '../../../../models/user.model';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Evaluation } from '../../../../models/evaluation.model';
import { AddEvaluationDialogComponent } from '../../../secure/dialogs/add-evaluation-dialog/add-evaluation-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Risk } from '../../../../models/risk.model';
import { DialogsService } from '../../../../shared/dialogs.service';
import { AlertService } from '../../../../services/alert.service';
import { ErrorObject } from '../../../../models/error-object.model';

@Component({
    selector: 'app-edit-control',
    templateUrl: './add-edit-control.component.html',
    styleUrls: ['./add-edit-control.component.css']
})

export class AddEditControlComponent {
    controlCategory: ControlCategory[];
    selectedControlCategory: ControlCategory[];
    controlForm: FormGroup;

    id: number;
    sub: any;
    editMode: boolean = false;
    category: [any];
    status: [any];
    legalObligation: boolean = false;
    prevent: boolean = false;
    react: boolean = false;
    detect: boolean = false;
    avoid: boolean = false;
    description: string;
    statusCategory: StatusCategory[] = [{ name: "Not implemented", id: 1 }, { name: "Implemented", id: 2 }, { name: "Planned", id: 3 }, { name: "End of life", id: 4 }];
    responsibleUserCategory: User[];
    evaluations: Evaluation[] = [];
    selectedEvaluation: Evaluation;
    risks: Risk[] = [];
    disableButtons: boolean = false;
    control: Control;
    queryParams: any;
    defaultPageSize: number = 1000;

    constructor(private controlService: ControlService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private location: Location,
        private dialog: MatDialog,
        private dialogService: DialogsService,
        private alertService: AlertService
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
        this.onGetControlCategory();
        this.getUserCategory();
        this.sub = this.route.params.subscribe(params => {
            if (this.id > 0) {
                this.editMode = true;
                this.controlService.getControl(this.id)
                    .subscribe(data => {
                        this.risks = data.risks;
                        this.controlForm.patchValue(data);
                        this.evaluations = data.evaluations;
                        this.selectedEvaluation = this.evaluations[0];
                        const myControl = <FormArray>this.controlForm.controls['risks'];
                        data.risks.forEach((x) => {
                            myControl.push(this.fb.group({
                                isoImpact: [x.isoImpact],
                                isoProbability: [x.isoProbability],
                                isoRisk: [x.isoRisk],
                                name: [x.name],
                                nsThreat: [x.nsThreat],
                                nsValue: [x.nsValue],
                                nsVulnerability: [x.nsVulnerability],
                                riskReduceId: [x.riskReduceId],
                                type: [x.type]
                            }))
                        });
                    });
            } else {
                this.control = new Control();
                this.control.risks = [];
                this.control.evaluations = [];
                this.controlForm.patchValue(this.control);
                const myControl = <FormArray>this.controlForm.controls['risks'];
            }
        });
    }

    createForm() {
        this.controlForm = this.fb.group({
            controlId: 0,
            category: '',
            name: ['', [Validators.required]],
            status: ['', [Validators.required]],
            responsibleUserId: ['', [Validators.required]],
            legalObligation: false,
            prevent: false,
            react: false,
            detect: false,
            avoid: false,
            evaluations: [''],
            description: [''],
            categoryName: '',
            enabled: 0,
            alertUserId: null,
            alertDate: new Date(),
            deadline: new Date(),
            executedDate: undefined,
            validTo: undefined,
            investmentCost: 0,
            maintenanceCost: 0,
            risks: this.fb.array([])
        })
    }

    onGetControlCategory() {
        this.controlService.getControlCategory(this.queryParams)
            .subscribe(
            response => {
                this.controlCategory = response.items;
                this.selectedControlCategory = response.items[0];
            });
    }

    getUserCategory() {
        this.userService.getUsers(this.queryParams)
            .subscribe(
            response => {
                this.responsibleUserCategory = response.items;
           });
    }

    onSave() {
        if (!this.controlForm.valid) {
            return
        }

        this.disableButtons = true;
        let observable = this.editMode ? this.controlService.updateControl(this.controlForm.value) : this.controlService.createControl(this.controlForm.value);
        observable.subscribe(data => {
            if (data instanceof ErrorObject) {
                this.disableButtons = false;
            } else {
                let label = this.editMode ? "updated" : "created";
                this.alertService.success(`SUCCESS! The control was ${label}.`);
                this.router.navigate(['/control/']);
            }
        });
    }

    exitControl() {
        this.location.back();
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
            this.controlForm.value.evaluations.unshift(data);
            this.selectedEvaluation = data;
        });
    }

    onDelete() {
        this.dialogService
            .confirm('Delete', 'Are you sure you want to delete this item?')
            .subscribe(result => {
                if (result) {
                    this.disableButtons = true;
                    this.controlService.deleteControl(this.id)
                        .subscribe((data => {
                            if (data instanceof ErrorObject) {
                                this.disableButtons = false;
                            } else {
                                this.alertService.info("INFO! The control was delete.");
                                this.router.navigate(['/control']);
                            }
                        }));
                }
            });
    }
}