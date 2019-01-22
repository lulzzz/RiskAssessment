import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styles: ['.content { margin: 0 auto; width: 100px; }']
})
export class ConfirmDialogComponent {

    public title: string;
    public message: string;

    constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) { }
}