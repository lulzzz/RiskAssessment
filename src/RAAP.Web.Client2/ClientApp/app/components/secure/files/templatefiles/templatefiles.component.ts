import { Component, Inject, ChangeDetectorRef, OnInit } from '@angular/core';

@Component({
    selector: 'app-templatefiles',   
    templateUrl: './templatefiles.component.html',
})
export class TemplatefilesComponent implements OnInit {
    public showLoadingIcon: boolean;
    private ref: ChangeDetectorRef;
    showForm: boolean = false;

    constructor(ref: ChangeDetectorRef) {
        this.ref = ref;
        this.showLoadingIcon = false;

    }

    ngOnInit() {

    }

    hideForm() {
        this.showForm = false;
    }

    formOpen() {
        this.showForm = true;
    }



}
