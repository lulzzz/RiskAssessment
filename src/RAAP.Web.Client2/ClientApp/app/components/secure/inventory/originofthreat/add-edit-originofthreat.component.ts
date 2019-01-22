import { Component, Inject, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Attribute, AttributeCategory } from '../../../../models/attribute.model';
import { AttributeService } from '../../../../services/attribute.service';
import { PagedQuery, PagedResult } from '../../../../models/common.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DialogsService } from '../../../../shared/dialogs.service';
import { AlertService } from '../../../../services/alert.service';
import { ErrorObject } from '../../../../models/error-object.model';

@Component({
    selector: 'add-edit-originofthreat',
    templateUrl: './add-edit-originofthreat.component.html',
    styleUrls: ['./add-edit-originofthreat.component.css']
})
export class AddEditOriginOfThreatComponent implements OnInit {
    public showLoadingIcon: boolean;
    originOfThreatCategory: AttributeCategory[] = [];
    selectedOriginOfThreatCategory: AttributeCategory[] = [];
    private attributeTypeId: string = "OriginOfThreat";
    originOfThreatForm: FormGroup;
    editMode: boolean = false;
    loaded: boolean = false;
    id: number;
    categoryObject: AttributeCategory;
    oot: any;
    newMonths: number;
    newDays: number;
    newHours: number;
    sub: any;
    newFrame: {
        months: number,
        days: number,
        hours: number
    };
    error: any = {};
    disableButtons: boolean = false;
    queryParams: any;
    defaultPageSize: number = 1000;

    constructor(ref: ChangeDetectorRef,
        private dialogService: DialogsService,
        private fb: FormBuilder,
        private attributeService: AttributeService,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
    ) {
        if (this.route.snapshot.params["id"]) {
            this.id = this.route.snapshot.params["id"];
        }
        this.createForm();
        this.showLoadingIcon = false;
        this.oot = {};
        this.queryParams = {
            pageSize: this.defaultPageSize
        }
    }

    createForm() {
        this.originOfThreatForm = this.fb.group({
            attributeId: 0,
            attributeTypeId: 'OriginOfThreat',
            attributeCategoryId: 0,
            childAttributes: [],
            name: ['', [Validators.required]],
            source: 3,
            attributeCategoryName: ['', [Validators.required]],
            timeframe: {},
            description: [''],
            comment: ['']
        })
    }

    ngOnInit() {
        if (this.id > 0) {
            this.editMode = true;
            this.attributeService.getAttribute(this.id)
                .subscribe(
                response => {
                    this.originOfThreatForm.patchValue(response);
                    this.oot = response;
                    this.loaded = true;
                    this.newMonths = this.oot.timeframe.months;
                    this.newDays = this.oot.timeframe.days;
                    this.newHours = this.oot.timeframe.hours;
                })
        }
        else {
            this.loaded = true;
            this.newMonths = 4095;
            this.newDays = 127;
            this.newHours = 7;
        }
        this.onGetOriginCategory();
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

    onGetOriginCategory() {
        this.attributeService.getAttributeCategory(this.originOfThreatForm.value.attributeTypeId, this.queryParams)
            .subscribe(
            response => {
                this.originOfThreatCategory = response.items;
                this.selectedOriginOfThreatCategory = response.items[0];
            });
    }

    findAttributeCategoryId() {
        for (let i of this.originOfThreatCategory) {
            if (i.name == this.originOfThreatForm.value.attributeCategoryName) {
                this.originOfThreatForm.value.attributeCategoryId = i.attributeCategoryId;
                return;
            }
        }
    }

    onSaveOriginOfThreat() {
        this.newFrame = { months: this.newMonths, days: this.newDays, hours: this.newHours };
        this.originOfThreatForm.value.timeframe = this.newFrame;
        this.originOfThreatForm.value.childAttributes = [];
        this.findAttributeCategoryId();
        if (!this.originOfThreatForm.valid) {
            return;
        }
        this.disableButtons = true;

        let observable = this.editMode ? this.attributeService.updateAttribute(this.originOfThreatForm.value) : this.attributeService.createAttribute(this.originOfThreatForm.value);
        observable.subscribe((data) => {
            if (data instanceof ErrorObject) {
                this.disableButtons = false;
            } else {
                let label = this.editMode ? "updated" : "created";
                this.alertService.success(`SUCCESS! The origin of threat was ${label}.`);
                this.router.navigate(['/originofthreat']);
            }
        });
    }

    onDeleteOriginOfThreat() {
        this.dialogService
            .confirm('Delete', 'Are you sure you want to delete this item?')
            .subscribe(result => {
                if (result) {
                    this.disableButtons = true;
                    this.attributeService.deleteAttribute(this.id)
                        .subscribe(data => {
                            if (data instanceof ErrorObject) {
                                this.disableButtons = false;
                            }
                            else {
                                this.alertService.info("INFO! The origin of threat was deleted.");
                                this.router.navigate(['/originofthreat']);
                            }
                    })
                }
            });
    }

    onExitOriginOfThreat() {
        this.router.navigate(['/originofthreat']);
    }
}