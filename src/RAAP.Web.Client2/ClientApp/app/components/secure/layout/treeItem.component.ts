import { Input, Component, Output, ChangeDetectorRef } from "@angular/core";
import { ProcessService } from "../../../services/process.service";
import { AssetService } from "../../../services/asset.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'tree-component',
    templateUrl: './treeItem.component.html',
    styleUrls: ['./layout.component.css'],
})
export class TreeItemComponent {
    @Input() public item: any;
    @Input() public process: any;
    isExpanded: boolean = false;
    processId: any;
    assetId: any;

    constructor(ref: ChangeDetectorRef,
        private processService: ProcessService,
        private assetService: AssetService,
        private router: Router,
        private route: ActivatedRoute) {
    }
    
    onExpand(item: any) {
        if (this.item.processId) {
            this.processId = this.item.processId;
            this.processService.setProcesId(this.processId);
        } else {
            this.processId = this.processService.getProcesId();
        }

        if (this.item.assetId) {
            console.log("Asset");
            this.assetId = this.item.assetId;
            this.assetService.setAssetId(this.assetId);
            console.log(this.item);
        } else {
            this.assetId = this.assetService.getAssetId();
        }

        this.isExpanded = !this.isExpanded;
    }

    ngOnInit() {
        this.processId = this.processService.getProcesId();
        this.assetId = this.assetService.getAssetId();
    }
}