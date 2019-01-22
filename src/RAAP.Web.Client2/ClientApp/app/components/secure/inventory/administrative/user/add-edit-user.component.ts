import { Component,ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../../../../services/user.service';
import { User, RoleCategory } from '../../../../../models/user.model';
import { CompanyService } from '../../../../../services/company.service';
import { Company } from '../../../../../models/company.model';
import { AlertService } from '../../../../../services/alert.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DialogsService } from '../../../../../shared/dialogs.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { matchOtherValidator } from "./match-other-validator";
import { ErrorObject } from '../../../../../models/error-object.model';

@Component({
    selector: 'app-add-edit-user',
    templateUrl: './add-edit-user.component.html',
    styleUrls: ['./add-edit-user.component.css']
})
/** edit-control component*/
export class AddEditUserComponent {
    userForm: FormGroup;

    id: number;
    editMode: boolean = false;
    sub: any;
    companyCategory: Company[];
    selectedCompanyCategory: Company[] = [];
    roleCategory: RoleCategory[] = [{ name: "Administrator", id: 1 }, { name: "SystemAdministrator", id: 2 }, { name: "User", id: 3 }];
    filePreviewPath: any;
    newPassword: string;
    repeatPassword: string;
    selectedRole: string;
    queryParams: any;
    disableButtons: boolean = false;
    fileToUpload: any;

    @ViewChild('fileInput') fileInput: ElementRef;
    constructor(private userService: UserService,
        private companyService: CompanyService,
        private dialogService: DialogsService,
        private alertService: AlertService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private sanitizer: DomSanitizer) {

        if (this.route.snapshot.params["id"]) {
            this.id = +this.route.snapshot.params["id"];
        }

        this.createForm();
    }

    ngOnInit() {
        this.onGetCompanyCategory();

        this.sub = this.route.params.subscribe(params => {

            if (this.id > 0) {
                this.editMode = true;
                this.createForm();
                this.userService.getUser(this.id)
                    .subscribe(data => {
                        this.selectedRole = data.roles[0];
                        return this.userForm.patchValue(data)
                    })
            }
        });
    }

    createForm() {
        if (this.editMode) {
            this.userForm = this.fb.group({
                companyId: ['', [Validators.required]],
                department: [''],
                email: ['', [Validators.required, Validators.email]],
                firstName: ['', [Validators.required]],
                lastName: ['', [Validators.required]],
                phone: '',
                roles: ['', [Validators.required]],
                title: [''],
                userId: 0,
                username: ['', [Validators.required, Validators.minLength(4)]],
            })

            this.userService.getUserImage(this.id)
                .subscribe((data) => {
                    this.filePreviewPath = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(data));
            })
        }
        else {
            this.userForm = this.fb.group({
                companyId: ['', [Validators.required]],
                department: [''],
                email: ['', [Validators.required, Validators.email]],
                firstName: ['', [Validators.required]],
                lastName: ['', [Validators.required]],
                phone: '',
                roles: ['', [Validators.required]],
                title: [''],
                userId: 0,
                username: ['', [Validators.required, Validators.minLength(4)]],
                password: ['', [Validators.required]],
                passwordRepeat: ['', [Validators.required, matchOtherValidator('password')]]
            })
        }
    }

    onGetCompanyCategory() {
        this.companyService.getCompanies(this.queryParams)
            .subscribe(
            response => {
                this.companyCategory = response.items;
                this.selectedCompanyCategory = response.items[0];
            });
    }

    onAddFile(): void {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            if (fileToUpload.type == 'image/gif' || fileToUpload.type == 'image/png' || fileToUpload.type == 'image/jpeg') {
                this.filePreviewPath = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileToUpload)));
                this.fileToUpload = fileToUpload;
                if (this.editMode) {
                    this.userService
                        .uploadFile(fileToUpload, this.id)
                        .subscribe(res => {
                        });
                }
            } else {
                this.alertService.error('Please upload an image file!');
            }
        }
    }

    openFileDialogBox() {
        this.fileInput.nativeElement.click();
    }

    onChangePassword() {
        if (this.newPassword.length >= 4 && this.newPassword == this.repeatPassword) {
            let passwordChange = {
                UserId: this.userForm.value.userId,
                Password: this.newPassword
            };

            this.userService
                .setPassword(passwordChange)
                .subscribe(res => {
                    this.alertService.success('SUCCESS! The Password was updated.');
                });
        }
        else {
            if (this.newPassword.length < 4) {
                this.alertService.error('Please give the new password minimum 4 characters');
                return;
            }
            if (this.newPassword != this.repeatPassword) {
                this.alertService.error('The password doesnt match the repeat password!');
                return;
            }
        }
    }

    onExit() {
        this.location.back();
    }

    onSave() {
        if (!this.userForm.valid) {
            return
        }

        var array_roles: string[];
        array_roles = [this.userForm.value.roles];
        this.userForm.value.roles = array_roles;
      
        this.disableButtons = true;
        //TO-DO: Figure out to do this better
        if (this.editMode && this.userForm.value.roles && this.userForm.value.roles[0] && this.userForm.value.roles[0] instanceof Array) {
            this.userForm.value.roles = this.userForm.value.roles[0];

        }
        let observable = this.editMode ? this.userService.updateUser(this.userForm.value) : this.userService.createUser(this.userForm.value);
        observable.subscribe(data => {
            if (data instanceof ErrorObject) {
                this.disableButtons = false;
            } else {
              if (!this.editMode && data && data.userId && this.fileToUpload) {
                        this.userService
                            .uploadFile(this.fileToUpload, data.userId)
                            .subscribe();
              }
                let label = this.editMode ? "updated" : "created";
                this.alertService.success(`SUCCESS! The user was ${label}.`);
                this.router.navigate(['/administrative/user']);
            }
        });
    }

    onDelete() {
        this.dialogService
            .confirm('Delete', 'Are you sure you want to delete this item?')
            .subscribe(result => {
                if (result) {
                    this.disableButtons = true;
                    this.userService.deleteUser(this.id).subscribe(data => {
                        if (data instanceof ErrorObject) {
                            this.disableButtons = false;
                        } else {
                            this.alertService.info("INFO! The user was deleted.");
                            this.router.navigate(['administrative/user']);
                        }
                    });
                }
            });
    }
}
