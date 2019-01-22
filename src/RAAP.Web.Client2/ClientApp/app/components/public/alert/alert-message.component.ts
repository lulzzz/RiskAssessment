import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
    selector: 'app-alert-message',
    templateUrl: 'alert-message.component.html',
    styleUrls: ['alert-message.component.css']
})

export class AlertMessageComponent {
    snackBarRefAlertMessageComponent: MatSnackBarRef<AlertMessageComponent>;

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

    ngOnInit() {}

    dismiss() {
        this.snackBarRefAlertMessageComponent.dismiss(); 
    }
}