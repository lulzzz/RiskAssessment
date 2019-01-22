import { Component, Inject, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-inventorydashboard',   
    templateUrl: './inventorydashboard.component.html',
})
export class InventorydashboardComponent {
    public showLoadingIcon: boolean;
    private ref: ChangeDetectorRef;
    
    constructor(ref: ChangeDetectorRef) {
        this.ref = ref;
        this.showLoadingIcon = false;

    }



}
