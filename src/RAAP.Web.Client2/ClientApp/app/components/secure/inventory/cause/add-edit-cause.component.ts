import { Component } from '@angular/core';
import { AttributeService } from '../../../../services/attribute.service';
import { Attribute, AttributeCategory } from '../../../../models/attribute.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DialogsService } from '../../../../shared/dialogs.service';
import { AddOriginOfThreatDialogComponent } from '../../../secure/dialogs/add-originofthreat-dialog/add-originofthreat-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from '../../../../services/alert.service';
import { ErrorObject } from '../../../../models/error-object.model';

@Component({
    selector: 'app-edit-cause',
    templateUrl: './add-edit-cause.component.html',
    styleUrls: ['./add-edit-cause.component.css']
})

export class AddEditCauseComponent {
    causeCategory: AttributeCategory[];
    selectedCauseCategory: AttributeCategory[] = [];
    originAttributes: Attribute[] = [];
    causeForm: FormGroup;
    id: number;
    editMode: boolean = false;
    sub: any;
    ct: any;
    name: string;
    category: string;
    loaded: boolean = false;
    newMonths: number;
    newDays: number;
    newHours: number;
    newFrame: {
        months: number,
        days: number,
        hours: number
    };
    description: string;
    comment: string;
    disableButtons: boolean = false;
    queryParams: any;
    defaultPageSize: number = 1000;

    constructor(private attributeService: AttributeService,
        private dialogService: DialogsService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        public dialog: MatDialog,
        private alertService: AlertService,
    ) {
        if (this.route.snapshot.params["id"]) {
            this.id = +this.route.snapshot.params["id"];
        }
        this.createForm();
        this.ct = {};
        this.queryParams = {
            pageSize: this.defaultPageSize
        }
    }

    ngOnInit() {
        if (this.id > 0) {
            this.editMode = true;
            this.attributeService.getAttribute(this.id)
                .subscribe(
                response => {
                    this.causeForm.patchValue(response);
                    this.ct = response;
                    this.loaded = true;
                    this.newMonths = this.ct.timeframe.months;
                    this.newDays = this.ct.timeframe.days;
                    this.newHours = this.ct.timeframe.hours;
                    this.originAttributes = this.ct.childAttributes;
                })
        }
        else {
            this.loaded = true;
            this.newMonths = 4095;
            this.newDays = 127;
            this.newHours = 7;
        }
        this.onGetCauseCategory();
    }
    
    createForm() {
        this.causeForm = this.fb.group({
            attributeId: 0,
            attributeTypeId: 'Cause',
            attributeCategoryId: 0,
            childAttributes: [],
            name: ['', [Validators.required]],
            source: 3,
            attributeCategoryName: ['', [Validators.required]],
            timeframe: {},
            description: [''],
            comment: [''],
        })
    }

    hasMonth(value: number): boolean {
        return Boolean(this.newMonths & value);
    }

    hasDay(value: number): boolean {
        return Boolean(this.newDays & value);
    }

    hasTime(value: number): boolean {
        return Boolean(this.newHours & value);
    }

    updateMonthEnum(value: number) {
        if (this.hasMonth(value)) {
            this.newMonths = this.newMonths - value;
        }
        else {
            this.newMonths = this.newMonths + value;
        }
    }

    updateDayEnum(value: number) {
        if (this.hasDay(value)) {
            this.newDays = this.newDays - value;
        }
        else {
            this.newDays = this.newDays + value;
        }
    }

    updateTimeEnum(value: number) {
        if (this.hasTime(value)) {
            this.newHours = this.newHours - value;
        }
        else {
            this.newHours = this.newHours + value;
        }
    }

    onGetCauseCategory() {
        this.attributeService.getAttributeCategory(this.causeForm.value.attributeTypeId, this.queryParams)
            .subscribe(
            response => {
                this.causeCategory = response.items;
                this.selectedCauseCategory = response.items[0];
            });
    }

    updateAttributeCategoryId() {
        for (let i of this.causeCategory) {
            if (i.name == this.causeForm.value.attributeCategoryName) {
                this.causeForm.value.attributeCategoryId = i.attributeCategoryId;
                return;
            }
        }
    }

    exitCause() {
        this.router.navigate(['/cause']);
    }

    saveCause() {
        this.newFrame = { months: this.newMonths, days: this.newDays, hours: this.newHours };
        this.causeForm.value.timeframe = this.newFrame;
        if (this.causeForm.value.childAttributes == null) {
            this.causeForm.value.childAttributes = [];
        }
        this.causeForm.value.childAttriutes = this.originAttributes;
        this.updateAttributeCategoryId();
        if (!this.causeForm.valid) {
            return;
        }

        this.disableButtons = true;
        let observable = this.editMode ? this.attributeService.updateAttribute(this.causeForm.value) : this.attributeService.createAttribute(this.causeForm.value);
        observable.subscribe(data => {
            if (data instanceof ErrorObject) {
                this.disableButtons = false;
            } else {
                let label = this.editMode ? "updated" : "created";
                this.alertService.success(`SUCCESS! The cause was ${label}.`);
                this.router.navigate(['/cause']);
            }
        });
    }

    onDelete() {
        this.dialogService
            .confirm('Delete', 'Are you sure you want to delete this item?')
            .subscribe(result => {
                if (result) {
                    this.disableButtons = true;
                    this.attributeService.deleteAttribute(this.id)
                        .subscribe((data => {
                            if (data instanceof ErrorObject) {
                                this.disableButtons = false;
                            } else {
                                this.alertService.info("INFO! The cause was deleted.");
                                this.router.navigate(['/cause']);
                            }
                    }))
                }
            });
    }

    openOriginDialog() {
        let dialogRef = this.dialog.open(AddOriginOfThreatDialogComponent, {
            disableClose: false,
            width: '700px',
            height: 'auto',
            data: {
                origins: this.originAttributes
            }
        });
        const sub = dialogRef.componentInstance.onAdd.subscribe((data: any) => {
            this.originAttributes.push(data);
        });
        dialogRef.afterClosed().subscribe(() => {
            sub.unsubscribe();
        });
    }

    removeOrigin(id: number) {
        this.originAttributes.forEach((t, i) => {
            if (t.attributeId == id) {
                this.originAttributes.splice(i, 1);
            }
        });
    }

}