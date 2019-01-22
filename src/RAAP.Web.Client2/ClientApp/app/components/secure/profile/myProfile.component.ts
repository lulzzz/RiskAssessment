import { Component, Inject, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PagedQuery, PagedResult } from '../../../models/common.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
    selector: 'profile',
    templateUrl: './myProfile.component.html',
    styleUrls: ['./myProfile.component.css']
})
export class MyProfileComponent implements OnInit {
    profileForm: FormGroup;

    public showLoadingIcon: boolean;
    private ref: ChangeDetectorRef;
    myUser: User;
    newPassword: string = '';
    repeatPassword: string = '';

    @ViewChild(DatatableComponent) table: DatatableComponent;
    constructor(ref: ChangeDetectorRef,
        private userService: UserService,
        private alertService: AlertService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder) {
        this.ref = ref;
        this.showLoadingIcon = false;

        this.createForm();
    }

    ngOnInit() {
        this.createForm();
        this.onGetUserDetails();
    }

    createForm() {
            this.profileForm = this.fb.group({
                email: ['', [Validators.required]],
                firstName: ['', [Validators.required]],
                lastName: ['', [Validators.required]],
                username: ['', [Validators.required]],
                userId: 0,
            })
    }

    onGetUserDetails() {
        this.userService.getMyUser()
            .subscribe(
            response => {
                this.profileForm.patchValue(response)
            });
    }

    onChangePassword() {
        if (this.newPassword.length >= 4 && this.newPassword == this.repeatPassword) {
            let passwordChange = {
                UserId: this.profileForm.value.userId,
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
}