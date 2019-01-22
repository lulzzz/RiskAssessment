import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../../../../../services/categories.service';
import { AssetComponent } from '../../asset/asset.component';
import { Asset, AssetSubCategory, AssetCategory } from '../../../../../models/asset.model';
import { DialogsService } from '../../../../../shared/dialogs.service';
import { AlertService } from '../../../../../services/alert.service';
import { ErrorObject } from '../../../../../models/error-object.model';

@Component({
    selector: 'app-edit-asset-category',
    templateUrl: './add-edit-assetCategory.component.html',
    styleUrls: ['./add-edit-assetCategory.component.css']
})

export class AddEditAssetSubCategoryComponent implements OnInit {
    id: number = 0;
    editMode: boolean = false;
    sub: any;
    url: string = 'assetsubcategory';
    assetSubCategory: AssetSubCategory [] = [];

    assetSubCategoryForm: FormGroup;
    disableButtons: boolean = false;

    constructor(private fb: FormBuilder,
        private assetSubCategoryService: CategoriesService,
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
        this.assetSubCategoryForm = this.fb.group({
            assetSubCategoryId: 0,
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
                    this.assetSubCategoryService.deleteCategory(this.id, this.url).subscribe((data => {
                        if (data instanceof ErrorObject) {
                            this.disableButtons = false;
                        } else {
                            this.alertService.info("INFO! The asset category was deleted.");
                            this.router.navigate(['/categories/assetsubcategories']);
                        }
                    }));
                }
            });
    }

    ngOnInit() {
        if (this.id > 0) {
            this.editMode = true;
            this.assetSubCategoryService.getCategory(this.id, this.url)
                .subscribe(response => {
                    this.assetSubCategoryForm.patchValue(response);
                });
        }
    }

    onSubmit() {
        if (!this.assetSubCategoryForm.valid) {
            return
        }

        this.disableButtons = true;
        let observable = this.editMode ? this.assetSubCategoryService.updateCategory(this.assetSubCategoryForm.value, this.url) : this.assetSubCategoryService.createCategory(this.assetSubCategoryForm.value, this.url);
        observable.subscribe(data => {
            let label = this.editMode ? "updated" : "created";
            this.alertService.success(`SUCCESS! The asset category was ${label}.`);
            this.router.navigate(['/categories/assetsubcategories']);
        });
    }
}