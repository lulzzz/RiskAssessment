import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../components/secure/confirm-dialog/confirm-dialog.component';
import { AddAssetDialogComponent } from '../components/secure/confirm-dialog/add-asset-dialog/add-asset-dialog.component';
import { Asset } from '../models/asset.model';

@Injectable()
export class DialogsService {

    constructor(private dialog: MatDialog) { }
    asset: Asset[] = [];
   // addAsset: Asset = [];

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<ConfirmDialogComponent>;

        dialogRef = this.dialog.open(ConfirmDialogComponent);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }

    public addProcessAsset(title: string, message: string, assets: Asset[], addAssets: Asset[]): Observable<boolean>{
        
   
        let dialogRef: MatDialogRef<AddAssetDialogComponent>;

        dialogRef = this.dialog.open(AddAssetDialogComponent);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        dialogRef.afterClosed().subscribe(result => {
           // this.addAsset = dialogRef.componentInstance.addAssets;
        
        });
        return dialogRef.afterClosed();
    }
}
