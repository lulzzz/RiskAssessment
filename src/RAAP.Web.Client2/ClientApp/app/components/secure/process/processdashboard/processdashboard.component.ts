import { Component, Inject, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-processdashboard',
    templateUrl: './processdashboard.component.html',
})

export class ProcessdashboardComponent {
    public showLoadingIcon: boolean;
    private ref: ChangeDetectorRef;

    constructor(ref: ChangeDetectorRef) {
        this.ref = ref;
        this.showLoadingIcon = false;
    }
}