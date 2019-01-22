import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../../../../services/user.service';
import { User, RoleCategory } from '../../../../../models/user.model';
import { CompanyService } from '../../../../../services/company.service';
import { Company } from '../../../../../models/company.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DialogsService } from '../../../../../shared/dialogs.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AlertService } from '../../../../../services/alert.service';
import { ErrorObject } from '../../../../../models/error-object.model';

@Component({
    selector: 'app-add-edit-company',
    templateUrl: './add-edit-company.component.html',
    styleUrls: ['./add-edit-company.component.css']
})
/** edit-control component*/
export class AddEditCompanyComponent {
    companyForm: FormGroup;
    id: number;
    editMode: boolean = false;
    sub: any;
    filePreviewPath: any;
    disableButtons: boolean = false;
    fileToUpload: any;

    @ViewChild('fileInput') fileInput: ElementRef;
    constructor(private userService: UserService,
                private companyService: CompanyService,
                private dialogService: DialogsService,
                private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private location: Location,
                private sanitizer: DomSanitizer,
                private alertService: AlertService) {

        if (this.route.snapshot.params["id"]) {
            this.id = +this.route.snapshot.params["id"];
        }
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (this.id > 0) {
                this.editMode = true;
                this.companyService.getCompany(this.id)
                    .subscribe(data => this.companyForm.patchValue(data))
            }

            this.createForm();
        });
    }

    createForm() {
        if (this.editMode) {
            this.companyForm = this.fb.group({
                companyId: 0,
                address1: ['', [Validators.required]],
                address2: ['', [Validators.required]],
                address3: ['', [Validators.required]],
                address4: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.email]],
                homepage: [''],
                name: ['', [Validators.required]],
                organizationNumber: null,
                phone: null,
            })

            this.companyService.getCompanyImage(this.id)
                .subscribe((data) => {
                    this.filePreviewPath = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(data));
                });
        }
        else {
            this.companyForm = this.fb.group({
                companyId: 0,
                address1: ['', [Validators.required]],
                address2: ['', [Validators.required]],
                address3: ['', [Validators.required]],
                address4: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.email]],
                homepage: [''],
                name: ['', [Validators.required]],
                organizationNumber: null,
                phone: null,
            })
        }
    }

    onAddFile(): void {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            if (fileToUpload.type == 'image/gif' || fileToUpload.type == 'image/png' || fileToUpload.type == 'image/jpeg') {
                this.filePreviewPath = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileToUpload)));
                this.fileToUpload = fileToUpload;
                if (this.editMode) {
                    this.companyService
                        .uploadFile(fileToUpload, this.id)
                        .subscribe(res => {
                        });
                }
            }
        }
    }

    openFileDialogBox() {
        this.fileInput.nativeElement.click();
    }

    onExit() {
        this.location.back();
    }

    onSave() {
        if (!this.companyForm.valid) {
            return
        }

        this.disableButtons = true;
        let observable = this.editMode ? this.companyService.updateCompany(this.companyForm.value) : this.companyService.createCompany(this.companyForm.value);
        observable.subscribe(data => {
            if (data instanceof ErrorObject) {
                this.disableButtons = false;
            } else {
                if (!this.editMode && data && data.companyId && this.fileToUpload) {
                        this.companyService
                            .uploadFile(this.fileToUpload, data.companyId)
                            .subscribe(res => {});
                }
                let label = this.editMode ? "updated" : "created";
                this.alertService.success(`SUCCESS! The company was ${label}.`);
                this.router.navigate(['/administrative/company']);
            }
        });
    }

    onDelete() {
        this.dialogService
            .confirm('Delete', 'Are you sure you want to delete this item?')
            .subscribe(result => {
                if (result) {
                this.disableButtons = true;
                this.companyService.deleteCompany(this.id).subscribe((data => {
                    if (data instanceof ErrorObject) {
                        this.disableButtons = false;
                    } else {
                        this.alertService.info("INFO! The company was deleted.");
                        this.router.navigate(['administrative/company']);
                    }
                }));
                }
                this.router.navigate(['administrative/company/edit/', this.id]);
            });
    }
}
