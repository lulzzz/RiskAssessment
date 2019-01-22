import { Component, Inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ChartsModule, Color } from "ng2-charts";
import { Threat } from "../../../../models/threat.model";
import { Asset } from "../../../../models/asset.model";
import { ProcessCategory } from "../../../../models/process.model";
import { AssetCategory, AssetSubCategory } from "../../../../models/asset.model";
import { ThreatCategory } from "../../../../models/threat.model";
import { CategoriesService } from "../../../../services/categories.service";
import { ProcessService } from "../../../../services/process.service";
import { AssetService } from "../../../../services/asset.service";
import { ThreatService } from "../../../../services/threat.service";
import { SliderFilter, ExpandedFilter } from './dashboard-slider-filter';
import { ReportService } from '../../../../services/report.service';

@Component({
    selector: 'app-dashboardmain',
    templateUrl: './dashboardmain.component.html',
    styleUrls: ['./dashboardmain.component.css'],
    providers: [CategoriesService, AssetService, ThreatService],
})

export class DashboardmainComponent {
    public showLoadingIcon: boolean;
    private ref: ChangeDetectorRef;
    public processChartLabels: string[] = [];
    public processChartData: number[] = [1];
    public assetsChartData: number[] = [1];
    public assetsChartLabels: string[] = [];
    public threatsChartData: number[] = [1];
    public threatsChartLabels: string[] = [];
    private colors: any[] = [{
        backgroundColor: ["rgb(151,187,205)", "rgb(220,220,220)", "rgb(247,70,74)", "#a1afc6", "#e5ad92", "#caddaf"]
    }];
    public temp: number = 0;
    public assets: Asset[] = [];
    public probabilitySlider: number = 3;
    public impactSlider: number = 3;
    public radioAndOr: number = 1;
    public expanded: boolean = false;
    public queryParams: any;

    constructor(ref: ChangeDetectorRef,
        public categoryService: CategoriesService,
        public processService: ProcessService,
        public assetService: AssetService,
        public threatService: ThreatService,
        public reportServise: ReportService
    ) {
        this.ref = ref;
        this.showLoadingIcon = false;
    }

    ngOnInit() {
        this.loadData();
        this.filterAssets();
    }

    public filterAssets(): void {
        this.assets = [];
        this.assetService.getUnhandlededThreats(this.probabilitySlider, this.impactSlider, this.radioAndOr).subscribe(
            response => {
                this.assets = response;
            });
    }

    public setProbability(): void {
        this.filterAssets();
    }

    public setImpact(): void {
        this.filterAssets();
    }

    public toggleAccordion(): void {
        this.expanded == true ? this.expanded = false : this.expanded = true;
    }

    public loadData() {
        this.assetsChartData = [];
        this.threatsChartData = [];
        this.processChartData = [];

        this.reportServise.getDashboardReport().subscribe(data => {
            this.assetsChartData = data.assetsByCategoryData;
            this.assetsChartLabels = data.assetsByCategoryLabels;
            this.processChartData = data.processesByCategoryData;
            this.processChartLabels = data.processesByCategoryLabels;
            this.threatsChartData = data.threatsByCategoryData;
            this.threatsChartLabels = data.threatsByCategoryLabels;
        });
    }
}
