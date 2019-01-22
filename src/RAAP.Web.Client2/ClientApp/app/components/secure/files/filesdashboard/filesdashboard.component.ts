import { Component, Inject, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-filesdashboard',   
    templateUrl: './filesdashboard.component.html',
})
export class FilesdashboardComponent {
    public showLoadingIcon: boolean;
    private ref: ChangeDetectorRef;


    constructor(ref: ChangeDetectorRef) {
        this.ref = ref;
        this.showLoadingIcon = false;

    }



}
