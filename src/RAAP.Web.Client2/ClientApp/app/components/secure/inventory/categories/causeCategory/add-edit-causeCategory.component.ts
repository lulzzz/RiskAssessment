import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../../../../../services/categories.service';
import { CauseCategoryComponent } from '../../categories/causeCategory/causeCategory.component';
import { Attribute, AttributeCategory } from '../../../../../models/attribute.model';
import { DialogsService } from '../../../../../shared/dialogs.service';
import { AlertService } from '../../../../../services/alert.service';
import { ErrorObject } from '../../../../../models/error-object.model';

@Component({
    selector: 'app-edit-cause-category',
    templateUrl: './add-edit-causeCategory.component.html',
    styleUrls: ['./add-edit-causeCategory.component.css']
})

export class AddEditCauseCategoryComponent implements OnInit {
    id: number = 0;
    editMode: boolean = false;
    sub: any;
    causeCategory: AttributeCategory [] = [];
    url: string = 'attributecategory';

    causeCategoryForm: FormGroup;
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
        this.causeCategoryForm = this.fb.group({
            attributeCategoryId: 0,
            attributeTypeId : 'Cause',
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
                            this.alertService.info("INFO! The cause category was deleted.");
                            this.router.navigate(['/categories/causecategories']);
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
                    this.causeCategoryForm.patchValue(response);
                });
        }
    }

    onSubmit() {
        if (!this.causeCategoryForm.valid) {
            return
        }

        this.disableButtons = true;
        let observable = this.editMode ? this.categoryService.updateCategory(this.causeCategoryForm.value, this.url) : this.categoryService.createCategory(this.causeCategoryForm.value, this.url);
        observable.subscribe(data => {
            let label = this.editMode ? "updated" : "created";
            this.alertService.success(`SUCCESS! The cause category was ${label}.`);
            this.router.navigate(['/categories/causecategories']);
        });
    }
}