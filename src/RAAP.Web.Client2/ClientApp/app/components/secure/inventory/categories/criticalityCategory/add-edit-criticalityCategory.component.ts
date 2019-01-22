import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../../../../../services/categories.service';
import { CriticalityCategoryComponent } from '../../categories/criticalityCategory/criticalityCategory.component';
import { CriticalityCategory } from '../../../../../models/criticality.model';
import { DialogsService } from '../../../../../shared/dialogs.service';
import { AlertService } from '../../../../../services/alert.service';
import { ErrorObject } from '../../../../../models/error-object.model';

@Component({
    selector: 'app-edit-criticality-category',
    templateUrl: './add-edit-criticalityCategory.component.html',
    styleUrls: ['./add-edit-criticalityCategory.component.css']
})

export class AddEditCriticalityCategoryComponent implements OnInit {
    id: number = 0;
    editMode: boolean = false;
    sub: any;
    criticalityCategory: CriticalityCategory [] = [];
    url: string = 'criticalitycategory';

    criticalityCategoryForm: FormGroup;
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
        this.criticalityCategoryForm = this.fb.group({
            criticalityCategoryId: 0,
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
                    this.categoryService.deleteCategory(this.id, this.url).subscribe((data => {
                        if (data instanceof ErrorObject) {
                            this.disableButtons = false;
                        } else {
                            this.alertService.info("INFO! The criticality category was deleted.");
                            this.router.navigate(['/categories/criticalitycategories']);
                        }
                    }));
                }
            });
    }

    ngOnInit() {
        if (this.id > 0) {
            this.editMode = true;
            this.categoryService.getCategory(this.id, this.url)
                .subscribe( response => {
                    this.criticalityCategoryForm.patchValue(response);
                });
        }
    }

    onSubmit() {
        if (!this.criticalityCategoryForm.valid) {
            return
        }

        this.disableButtons = true;
        let observable = this.editMode ? this.categoryService.updateCategory(this.criticalityCategoryForm.value, this.url) : this.categoryService.createCategory(this.criticalityCategoryForm.value, this.url);
        observable.subscribe(data => {
            if (data instanceof ErrorObject) {
                this.disableButtons = false;
            } else {
                let label = this.editMode ? "updated" : "created";
                this.alertService.success(`SUCCESS! The criticality category was ${label}.`);
                this.router.navigate(['/categories/criticalitycategories']);
            }
        });
    }
}