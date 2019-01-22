import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../../../../../services/categories.service';
import { ProcessCategoryComponent } from '../../categories/processCategory/processCategory.component';
import { Process, ProcessCategory } from '../../../../../models/process.model';
import { DialogsService } from '../../../../../shared/dialogs.service';
import { AlertService } from '../../../../../services/alert.service';
import { ErrorObject } from '../../../../../models/error-object.model';

@Component({
    selector: 'app-edit-process-category',
    templateUrl: './add-edit-processCategory.component.html',
    styleUrls: ['./add-edit-processCategory.component.css']
})

export class AddEditProcessCategoryComponent implements OnInit {
    id: number = 0;
    editMode: boolean = false;
    sub: any;
    processCategory: ProcessCategory [] = [];
    url: string = 'processcategory';

    processCategoryForm: FormGroup;
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
        this.processCategoryForm = this.fb.group({
            processCategoryId: 0,
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
                            this.alertService.info("INFO! The process category was deleted.");
                            this.router.navigate(['/categories/processcategories']);
                        }
                    }))
                }
            });
    }

    ngOnInit() {
        if (this.id > 0) {
            this.editMode = true;
            this.categoryService.getCategory(this.id, this.url)
                .subscribe( response => {
                    this.processCategoryForm.patchValue(response);
                });
        }
    }

    onSubmit() {
        if (!this.processCategoryForm.valid) {
            return
        }

        this.disableButtons = true;
        let observable = this.editMode ? this.categoryService.updateCategory(this.processCategoryForm.value, this.url) : this.categoryService.createCategory(this.processCategoryForm.value, this.url);
        observable.subscribe(data => {
            if (data instanceof ErrorObject) {
                this.disableButtons = false;
            } else {
                let label = this.editMode ? "updated" : "created";
                this.alertService.success(`SUCCESS! The process category was ${label}.`);
                this.router.navigate(['/categories/processcategories']);
            }
        })
    }
}