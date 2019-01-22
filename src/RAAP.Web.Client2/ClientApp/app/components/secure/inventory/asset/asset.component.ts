import { Component, Inject, ChangeDetectorRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Asset } from '../../../../models/asset.model';
import { AssetService } from '../../../../services/asset.service';
import { PagedQuery, PagedResult } from '../../../../models/common.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HelpService } from '../../../../services/help.service';

@Component({
    selector: 'app-asset',
    templateUrl: './asset.component.html',
    styleUrls: ['./add-edit-asset.component.css']
})

export class AssetComponent implements OnInit {

    public showLoadingIcon: boolean;
    private ref: ChangeDetectorRef;
    id: number = 0;

    assets: Asset[] = [];
    asset: Asset;
    tableData: any = {};
    defaultPageSize: number = 20;
    types = [{ name: "Business", id: 1 }, { name: "Technical", id: 2 }, { name: "Physical", id: 3 }, { name: "Organizational", id: 4 }];
    queryParams: any;
    pageSizes: object = [10, 20, 50, 100];

    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(ref: ChangeDetectorRef,
        private assetService: AssetService,
        private helpService:HelpService,
        private router: Router,
        private route: ActivatedRoute) {
        this.ref = ref;
        this.showLoadingIcon = false;

        if (this.route.snapshot.params["id"]) {
            this.id = +this.route.snapshot.params["id"];
        }

        this.queryParams = {
            pageSize: this.defaultPageSize
        }
    }

    ngOnInit() {
        if (this.id > 0) {
            this.onGetAssetsByCategory(this.id);
        } else {
            this.onGetAssets();
        }
    }

    onGetAssets() {
        this.assetService.getAllAssets(this.queryParams)
            .subscribe(
                response => {
                    this.assets = response.items;

                    this.tableData['currentPage'] = response.currentPage;
                    this.tableData['totalItems'] = response.totalItems;
                    this.tableData['totalPages'] = response.totalPages;

                    for (var i = 0; i < this.assets.length; i++) {
                        for (var j = 0; j < this.types.length; j++) {
                            if (this.assets[i].category == this.types[j].id)
                                this.assets[i].type = this.types[j].name;
                        }
                    }
                });
    }

    onGetAssetsByCategory(id: number) {
        this.assetService.getAssets(id, this.queryParams)
            .subscribe(
                response => {
                    this.assets = response.items;
                    this.tableData['currentPage'] = response.currentPage;
                    this.tableData['totalItems'] = response.totalItems;
                    this.tableData['totalPages'] = response.totalPages;

                    for (var i = 0; i < this.assets.length; i++) {
                        for (var j = 0; j < this.types.length; j++) {
                            if (this.assets[i].category == this.types[j].id)
                                this.assets[i].type = this.types[j].name;
                        }
                    }
                });
    }

    filterAssetName(event: any) {
        const val = event.target.value.toLowerCase();

        const temp = this.assets.filter(function (result) {
            return result.name.toLowerCase().indexOf(val) !== -1 || !val;
        });

        this.assets = temp;
        this.table.offset = 0;
    }

    onCopy(assetId: number) {

        this.assetService.getAsset(assetId).subscribe(response => {
            this.asset = response;


            this.helpService.isNameAvaiable(this.asset.name,'asset')
                .subscribe(response => {
                    this.asset.name = response;
                    this.asset.assetId = 0;
                    this.assetService.createAsset(this.asset).subscribe((data) => {
                       this.router.navigate(['/asset/edit/' + data.assetId]);
                    })

                });
        });
    }

    onPageChange(event: any) {
        this.queryParams = {
            page: event.page,
            pageSize: this.defaultPageSize
        }
        if (this.id > 0) {
            this.onGetAssetsByCategory(this.id);
        } else {
            this.onGetAssets();
        }
    }

    onPageSizeChange(size: number) {
        this.queryParams = {
            pageSize: size,
        }
        this.defaultPageSize = size;

        if (this.id > 0) {
            this.onGetAssetsByCategory(this.id);
        } else {
            this.onGetAssets();
        }
    }
}
