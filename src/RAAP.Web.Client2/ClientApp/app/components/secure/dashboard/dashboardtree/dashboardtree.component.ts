import { Component, Inject, OnInit, Optional, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetService } from "../../../../services/asset.service";
import { Asset, AssetSubCategory, AssetCategory } from '../../../../models/asset.model';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map'

@Component({
    selector: 'app-dashboardtree',
    templateUrl: './dashboardtree.component.html',
    styleUrls: ['./dashboardtree.component.css']
})

export class DashboardTreeComponent implements OnInit {
    fullAssets: Asset[];
    assets: Asset[];
    treeForm: FormGroup;
    assetCtrl: FormControl;
    filteredAssets: Observable<any[]>;
    loaded: boolean;
    data: any = {};
    data1: any = {};
    obj: any = {};
    generateGraph: boolean = false;
    nullAssets: Asset[] = [];

    constructor(private fb: FormBuilder, private assetService: AssetService, private router: Router, private route: ActivatedRoute) {
        this.assetCtrl = new FormControl();
    }

    ngOnInit() {
        this.onGetAssets();
    }

    filterAssets(name: string) {
        if (name.length >= 2) {
            return this.assets.filter(asset =>
                asset.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
        }
        else {
            return this.nullAssets;
        }
    }

    onGetAssets() {
        this.assetService.getAllAssets()
            .subscribe(
            response => {
                this.loaded = true;
                this.assets = response.items;
                this.fullAssets = response.items;
                this.filteredAssets = this.assetCtrl.valueChanges
                    .pipe(
                    map(asset => this.filterAssets(asset))
                    );
            });
    }

    fillChildren(arrayAssets: Asset[], parent: any): any[] {
        let children: any = [];
        arrayAssets.forEach(a => {
            let child: any = {};
            child['name'] = a.name;
            child['parent'] = parent;
            child['children'] = this.fillChildren(a.assets, a.name);
            children.push(child);
        })
        return children;
    }

    fillDependChildren(arrayAsset: Asset[], selectedAsset: Asset): any[] {
        let children: any = [];
        arrayAsset.forEach(x => {
            x.assets.forEach(y => {
                if (y.assetId == selectedAsset.assetId) {
                    let child: any = {};
                    child.name = x.name;
                    child.children = [];
                    children.push(child);
                }
            });
        });
        return children;
    }

    sendSelected(selectedAsset: any) {
        this.generateGraph = false;
        this.data = {};
        this.data1 = {};
        this.data['name'] = selectedAsset.name;
        this.data['parent'] = null;
        this.data['children'] = this.fillChildren(selectedAsset.assets, selectedAsset.name);
        this.data1['name'] = selectedAsset.name;
        this.data1['parent'] = null;
        this.data1['children'] = this.fillDependChildren(this.fullAssets, selectedAsset);
        this.generateGraph = true;
    }

    sendAsset(name: any) {
        for (let a of this.fullAssets) {
            if (a.name == name) {
                this.sendSelected(a);
                break;
            }
        }
    }

    remove() {
        if (this.assetCtrl.value == '') {
            this.data = {};
            this.data1 = {};
            this.generateGraph = false;
            return true;
        }
        else return true;
    }

    clearInput() {
        this.assetCtrl.patchValue('');
    }
}
