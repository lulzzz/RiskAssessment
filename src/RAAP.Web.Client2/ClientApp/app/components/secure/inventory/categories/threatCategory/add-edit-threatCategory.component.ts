import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../../../../../services/categories.service';
import { ThreatCategoryComponent } from '../../categories/threatCategory/threatCategory.component';
import { Threat, ThreatCategory } from '../../../../../models/threat.model';
import { DialogsService } from '../../../../../shared/dialogs.service';
import { AlertService } from '../../../../../services/alert.service';
import { ErrorObject } from '../../../../../models/error-object.model';

@Component({
    selector: 'app-edit-threat-category',
    templateUrl: './add-edit-threatCategory.component.html',
    styleUrls: ['./add-edit-threatCategory.component.css']
})

export class AddEditThreatCategoryComponent implements OnInit {
    id: number = 0;
    editMode: boolean = false;
    sub: any;
    threatCategory: ThreatCategory [] = [];
    url: string = 'threatcategory';

    threatCategoryForm: FormGroup;
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
        this.threatCategoryForm = this.fb.group({
            threatCategoryId: 0,
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
                    this.categoryService.deleteCategory(this.id, this.url).subscribe(data => {
                        if (data instanceof ErrorObject) {
                            this.disableButtons = false;
                        } else {
                            this.alertService.info("INFO! The threat category was deleted.");
                            this.router.navigate(['/categories/threatcategories']);
                        }
                    });
                }
            });
    }

    ngOnInit() {
        if (this.id > 0) {
            this.editMode = true;
            this.categoryService.getCategory(this.id, this.url)
                .subscribe( response => {
                    this.threatCategoryForm.patchValue(response);
                });
        }
    }

    onSubmit() {
        if (!this.threatCategoryForm.valid) {
            return
        }

        this.disableButtons = true;
        let observable = this.editMode ? this.categoryService.updateCategory(this.threatCategoryForm.value, this.url) : this.categoryService.createCategory(this.threatCategoryForm.value, this.url);

        observable.subscribe(data => {
            if (data instanceof ErrorObject) {
                this.disableButtons = false;
            } else {
                let label = this.editMode ? "updated" : "created";
                this.alertService.success(`SUCCESS! The threat category was ${label}.`);
                this.router.navigate(['/categories/threatcategories']);
            }
        });
    }
}