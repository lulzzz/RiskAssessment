import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, ChangeDetectorRef, OnInit, AfterViewInit, ViewChild, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Asset } from '../../../../models/asset.model';
import { AssetService } from '../../../../services/asset.service';
import { PagedQuery, PagedResult } from '../../../../models/common.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AssetComponent } from '../../inventory/asset/asset.component';


@Component({
    selector: 'app-asset-dialog',
    templateUrl: './add-asset-dialog.component.html',
    styleUrls: ['./add-asset-dialog.component.css']
})
export class AddAssetDialogComponent implements OnInit {
    onAdd = new EventEmitter();
    public showLoadingIcon: boolean;
    private ref: MatDialogRef<AddAssetDialogComponent>;
    id: number = 0;
    assets: Asset[] = [];
    newAssets: Asset[] = [];
    addAssets: Asset[] = [];
    addedAssets: Asset[] = [];
    types = [{ name: "Business", id: 1 }, { name: "Technical", id: 2 }, { name: "Physical", id: 3 }, { name: "Organizational", id: 4 }];

    public title: string;
    public message: string;
    tableData: any = {};
    defaultPageSize: number = 50;
    orderByKey: string = 'Name';
    queryParams: any;
    pageSizes: object = [10, 20, 50, 100];

    @ViewChild(DatatableComponent) table: DatatableComponent;
    constructor(private dialogRef: MatDialogRef<AddAssetDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
        private assetService: AssetService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.ref = dialogRef;
        this.showLoadingIcon = false;

        this.queryParams = {
            pageSize: this.defaultPageSize,
            orderByKey: this.orderByKey
        }
    }

    ngOnInit() {
        this.onGetAssets();
    }

    onCloseDialog() {
        this.dialogRef.close();
    }

    onGetAssets() {
        this.assetService.getAllAssets(this.queryParams)
            .subscribe(
            response => {
                this.newAssets = [];
                this.assets = response.items;
                this.tableData['currentPage'] = response.currentPage;
                this.tableData['totalPages'] = response.totalPages;
                this.tableData['totalItems'] = response.totalItems;
                this.addedAssets = this.data.assets;

                if (this.data && this.data.id) {
                    this.id = this.data.id;
                    this.addedAssets = this.data.assetForm;
                }

                for (var i = 0; i < this.assets.length; i++) {
                    var u = 0;
                    if (this.assets[i].assetId === this.id)
                        continue;

                    let existingAsset = false;

                    for (let singleAsset of this.addedAssets) {
                        if (this.assets[i].assetId == singleAsset.assetId)
                            existingAsset = true;
                    }

                    if (existingAsset == true)
                        continue;

                    if (this.data.assets.length == 0)
                        this.newAssets.push(this.assets[i]);

                    for (var j = 0; j < this.data.assets.length; j++) {
                        if (this.data.assets[j].assetId != this.assets[i].assetId) {
                            u++;
                            if (this.data.assets.length == u) {
                                this.newAssets.push(this.assets[i]);
                            }
                        }
                    }
                }

                this.assets = this.newAssets;
                for (var i = 0; i < this.assets.length; i++) {
                    for (var j = 0; j < this.types.length; j++) {
                        if (this.assets[i].category == this.types[j].id)
                            this.assets[i].type = this.types[j].name;
                    }
                }
                this.tableData['totalItems']-= response.items.length - this.assets.length;
            });
    }

    onAddAsset(assetId: number) {
        this.assets.forEach((t, i) => {
            if (t.assetId == assetId) {
                this.assets.splice(i, 1);
                this.assets = [...this.assets];
            }
        });

        this.assetService.getAsset(assetId)
            .subscribe(response => {
                response.type = this.types[response.category - 1].name;
                this.addAssets.push(response);
                this.onAdd.emit(this.addAssets);
                this.data = this.addAssets;
            });
    }

    onPageChange(event: any) {
        this.queryParams = {
            page: event.page,
            pageSize: this.defaultPageSize
        }
        this.onGetAssets();
    }

    onPageSizeChange(size: number) {
        this.queryParams = {
            pageSize: size
        }
        this.defaultPageSize = size;
        this.onGetAssets();
    }
}