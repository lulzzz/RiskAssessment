import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../../../../../services/categories.service';
import { ControlCategoryComponent } from '../../categories/controlCategory/controlCategory.component';
import { Control, ControlCategory } from '../../../../../models/control.model';
import { DialogsService } from '../../../../../shared/dialogs.service';
import { AlertService } from '../../../../../services/alert.service';
import { ErrorObject } from '../../../../../models/error-object.model';

@Component({
    selector: 'app-edit-control-category',
    templateUrl: './add-edit-controlCategory.component.html',
    styleUrls: ['./add-edit-controlCategory.component.css']
})

export class AddEditControlCategoryComponent implements OnInit {
    id: number = 0;
    editMode: boolean = false;
    sub: any;
    controlCategory: ControlCategory [] = [];
    url: string = 'controlcategory';

    controlCategoryForm: FormGroup;
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
        this.controlCategoryForm = this.fb.group({
            controlCategoryId: 0,
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
                            this.alertService.info("INFO! The control category was deleted.");
                            this.router.navigate(['/categories/controlcategories']);
                        }
                    }))
                }
                this.router.navigate(['/categories/controlcategory/edit/', this.id]);
            });
    }

    ngOnInit() {
        if (this.id > 0) {
            this.editMode = true;
            this.categoryService.getCategory(this.id, this.url)
                .subscribe(response => {
                    this.controlCategoryForm.patchValue(response);
                });
        }
    }

    onSubmit() {
        if (!this.controlCategoryForm.valid) {
            return
        }

        this.disableButtons = true;
        let observable = this.editMode ? this.categoryService.updateCategory(this.controlCategoryForm.value, this.url) : this.categoryService.createCategory(this.controlCategoryForm.value, this.url);
        observable.subscribe(data => {
            if (data instanceof ErrorObject) {
                this.disableButtons = false;
            } else {
                let label = this.editMode ? "updated" : "created";
                this.alertService.success(`SUCCESS! The control category was ${label}.`);
                this.router.navigate(['/categories/controlcategories']);
            }
        });
    }
}