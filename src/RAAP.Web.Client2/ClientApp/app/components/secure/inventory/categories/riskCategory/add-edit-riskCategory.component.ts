import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../../../../../services/categories.service';
import { RiskCategoryComponent } from '../../categories/riskCategory/riskCategory.component';
import { RiskCategory } from '../../../../../models/risk.model';
import { DialogsService } from '../../../../../shared/dialogs.service';
import { AlertService } from '../../../../../services/alert.service';
import { ErrorObject } from '../../../../../models/error-object.model';

@Component({
    selector: 'app-edit-threat-category',
    templateUrl: './add-edit-riskCategory.component.html',
    styleUrls: ['./add-edit-riskCategory.component.css']
})

export class AddEditRiskCategoryComponent implements OnInit {
    id: number = 0;
    editMode: boolean = false;
    sub: any;
    riskCategory: RiskCategory [] = [];
    url: string = 'company/GetRiskType/';

    riskCategoryForm: FormGroup;
    disableButtons: boolean = false;

    constructor(private fb: FormBuilder,
        private categoryService: CategoriesService,
        private router: Router,
        private dialogService: DialogsService,
        private route: ActivatedRoute,
        private alertService: AlertService
    ) {

        if (this.route.snapshot.params["id"]) {
            this.id = +this.route.snapshot.params["id"];
        }
        this.createForm();
    }

    createForm() {
        this.riskCategoryForm = this.fb.group({
            riskTypeId: 0,
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
        })
    }

    onDelete() {
        this.dialogService
            .confirm('Delete', 'Are you sure you want to delete this item?')
            .subscribe(result => {
                if (result) {
                    this.disableButtons = true;
                    this.url = 'company/DeleteRiskType/';
                    this.categoryService.deleteCategory(this.id, this.url).subscribe(data => {
                        if (data instanceof ErrorObject) {
                            this.disableButtons = false;
                        } else {
                            this.alertService.info("INFO! The risk category was deleted.");
                            this.router.navigate(['/categories/riskcategories']);
                        }
                    })
                }
            });
    }

    ngOnInit() {
        if (this.id > 0) {
            this.editMode = true;
            this.categoryService.getCategory(this.id, this.url)
                .subscribe( response => {
                    this.riskCategoryForm.patchValue(response);
                });
        }
    }

    onSubmit() {
        if (!this.riskCategoryForm.valid) {
            return
        }

        this.disableButtons = true;
        let url = this.editMode ? 'company/UpdateRiskType/' : 'company/CreateRiskType/';
        let observable = this.editMode ? this.categoryService.updateCategory(this.riskCategoryForm.value, url) : this.categoryService.createCategory(this.riskCategoryForm.value, url);
        observable.subscribe(data => {
            if (data instanceof ErrorObject) {
                this.disableButtons = false;
            } else {
                let label = this.editMode ? "updated" : "created";
                this.alertService.success(`SUCCESS! The risk category was ${label}.`);
                this.router.navigate(['/categories/riskcategories']);
            }
        });
    }
}