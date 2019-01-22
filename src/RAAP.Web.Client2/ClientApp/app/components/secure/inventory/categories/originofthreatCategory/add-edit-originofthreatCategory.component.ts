import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../../../../../services/categories.service';
import { OriginOfThreatCategoryComponent } from '../../categories/originofthreatCategory/originofthreatCategory.component';
import { AttributeCategory } from '../../../../../models/attribute.model';
import { DialogsService } from '../../../../../shared/dialogs.service';
import { AlertService } from '../../../../../services/alert.service';
import { ErrorObject } from '../../../../../models/error-object.model';

@Component({
    selector: 'app-edit-originofthreat-category',
    templateUrl: './add-edit-originofthreatCategory.component.html',
    styleUrls: ['./add-edit-originofthreatCategory.component.css']
})

export class AddEditOriginOfThreatCategoryComponent implements OnInit {
    id: number = 0;
    editMode: boolean = false;
    sub: any;
    url: string = 'attributecategory';

    originofthreatCategoryForm: FormGroup;
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
        this.originofthreatCategoryForm = this.fb.group({
            attributeCategoryId: 0,
            attributeTypeId: 'OriginOfThreat',
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
                            this.alertService.info("INFO! The origin of threat category was deleted.");
                            this.router.navigate(['/categories/originofthreatcategories']);
                        }
                    }))
                }
                this.router.navigate(['/categories/originofthreatcategory/edit/', this.id]);
            });
    }

    ngOnInit() {
        if (this.id > 0) {
            this.editMode = true;
            this.categoryService.getCategory(this.id, this.url)
                .subscribe( response => {
                    this.originofthreatCategoryForm.patchValue(response);
                });
        }
    }

    onSubmit() {
        if (!this.originofthreatCategoryForm.valid) {
            return
        }

        this.disableButtons = true;
        let observable = this.editMode ? this.categoryService.updateCategory(this.originofthreatCategoryForm.value, this.url) : this.categoryService.createCategory(this.originofthreatCategoryForm.value, this.url);
        observable.subscribe(data => {
            if (data instanceof ErrorObject) {
                this.disableButtons = false;
            } else {
                let label = this.editMode ? "updated" : "created";
                this.alertService.success(`SUCCESS! The origin of threat category was ${label}.`);
                this.router.navigate(['/categories/originofthreatcategories']);
            }
        })
    }
}