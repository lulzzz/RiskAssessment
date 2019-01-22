import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { SoaService } from "../../../../services/soa.service";
import { MatTabChangeEvent } from '@angular/material';

@Component({
    selector: 'app-dashboardsoa',   
    templateUrl: './dashboardsoa.component.html',
    styleUrls: ['./dashboardsoa.component.css'],
})

export class DashboardsoaComponent {
    public showLoadingIcon: boolean;
    private ref: ChangeDetectorRef;
    public statistics: any;
    public showAssetList: any[];
    public isoAssetStats: any;
    public helseAssetStats: any;
    public gdprAssetStats: any;
    public subSelectedIndex: number = 0;
    public enableIso: boolean = false;
    public enableHelse: boolean = false;
    public enableGdpr: boolean = false;
    public showAssetListLabel: any;
    public pie: any;
    public helsePie: any = {};
    public isoPie: any = {};
    public gdprPie: any = {};
    public isoCode: string = 'en-us';

    public pieChartType: string = 'pie';
    public pieChartData: number[] = [1];
    public pieChartLabels: string[] = ["Not started", "In progress", "Deadline passed", "Implemented"];
    public pieChartColors: any[] = [{
        backgroundColor: ["#00A9FF", "#7e349b", "#f02c09", "#2EA319"]
    }];
    public pieChartLegend: boolean = true;
    public pieChartOptions: any = {};

    constructor(ref: ChangeDetectorRef,
        private soaService: SoaService) {
        this.ref = ref;
        this.showLoadingIcon = false;
    }

    ngOnInit() {
        this.isoPie.pieChartLabels = this.pieChartLabels;
        this.isoPie.pieChartData = this.pieChartData;
        this.isoPie.pieChartColors = this.pieChartColors;

        this.helsePie.pieChartLabels = this.pieChartLabels;
        this.helsePie.pieChartData = this.pieChartData;
        this.helsePie.pieChartColors = this.pieChartColors;

        this.gdprPie.pieChartLabels = this.pieChartLabels;
        this.gdprPie.pieChartData = this.pieChartData;
        this.gdprPie.pieChartColors = this.pieChartColors;
        this.pieChartOptions = this.getPieChartOptions();

        this.getSoaStatistics();
    }

    onTabChanged(tabChangeEvent: MatTabChangeEvent): void {
        this.subSelectedIndex = tabChangeEvent.index;
        this.showAssetListLabel = '';
        this.showAssetList = [];
    }

    getPieChartOptions() {
      return {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: '#333',
                    generateLabels: function (chart: any) {
                        let data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map(function (label: any, i: number) {
                                let meta = chart.getDatasetMeta(0);
                                let ds = data.datasets[0];
                                let arc = meta.data[i];
                                let custom = arc && arc.custom || {};

                                let arcOpts = chart.options.elements.arc;
                                let fill = ds.backgroundColor[i] ? ds.backgroundColor[i] : '#333';
                                let stroke = ds.backgroundColor[i] ? ds.backgroundColor[i] : '#333';
                                let bw = custom.borderWidth ? custom.borderWidth : '#333';

                                let textValue = ds.data[i] ? ': ' + ds.data[i] : ''

                                return {
                                    text: label + textValue,
                                    fillStyle: fill,
                                    strokeStyle: stroke,
                                    lineWidth: bw,
                                    hidden: isNaN(ds.data[i]) || meta.data[i].hidden || ds.data[i] == 0,
                                    index: i
                                };
                            });
                        }
                        return [];
                    }
                }
            },
            title: {
                display: true,
                text: ['Status', 'Assets'],
                fontColor: '#333',
                fontSize: 22
            },
            rotation: -0.7 * Math.PI,
            circumference: 2 * Math.PI,
            animation: {
                duration: 1000,
                easing: "linear",
                animateRotate: true,
                onProgress: function (animation:any ) {
                },
                onComplete: function (animation: any) {
                }
            }
        }
    }

    getAssetSoaStatistics(assetId: number) {
        this.soaService.getAssetSoaStatistics(assetId, this.getSoaType(), this.isoCode)
            .subscribe(
            response => {
                let statistics = this.showAssetList;
                for (let single of statistics) {
                    if (single.id == assetId) {
                        single.statistics = response;
                        break;
                    };
                }
            });
    }

    getSoaType(): number {
        if (this.subSelectedIndex == 0) {
            if (this.enableIso)
                return 1;
            else if (this.enableHelse)
                return 4;
            else if (this.enableGdpr)
                return 5;
        }
        else if (this.subSelectedIndex == 1) {
            if (this.enableHelse)
                return 4;
            else if (this.enableGdpr)
                return 5;
        }
        else if (this.subSelectedIndex == 2)
            return 5;
       
        return 0;
    }

    getSoaTypeData() {
            if (this.subSelectedIndex == 0) {
                if (this.enableIso)
                    return this.isoAssetStats;
                else if (this.enableHelse)
                    return this.helseAssetStats;
                else if (this.enableGdpr)
                    return this.gdprAssetStats;
            }
            else if (this.subSelectedIndex == 1) {
                if (this.enableHelse)
                    return this.helseAssetStats;
                else if (this.enableGdpr)
                    return this.gdprAssetStats;
            }
            else if (this.subSelectedIndex == 2)
                return this.gdprAssetStats;
    };

   toggleCollapseAssetStatistics(assetItem: any) {
        if (!assetItem.statistics)
            this.getAssetSoaStatistics(assetItem.id);

        if (assetItem.collapsed != null)
            assetItem.collapsed = !assetItem.collapsed;
        else
            assetItem.collapsed = true;
    }

    getSoaStatistics() {
        this.soaService.getRelevantSoas()
            .subscribe(
            response => {
                for (let single of response) {
                    this.soaService.getSoaStatistics(single)
                        .subscribe(
                        statisticsResponse => {
                            if (statisticsResponse.soaType == 1) {
                                this.enableIso = true;
                                this.isoAssetStats = statisticsResponse;
                                let data = this.parseStatisticsData(statisticsResponse);
                                this.isoPie.pieChartData = this.generateStatisticsPie('isoPie', data)
                            }

                            if (statisticsResponse.soaType == 4) {
                                this.enableHelse = true;
                                this.helseAssetStats = statisticsResponse;
                                let data = this.parseStatisticsData(statisticsResponse);
                                this.helsePie.pieChartData = this.generateStatisticsPie('helsePie', data);
                            }

                            if (statisticsResponse.soaType == 5) {
                                this.enableGdpr = true;
                                this.gdprAssetStats = statisticsResponse;
                                let data = this.parseStatisticsData(statisticsResponse);
                                this.gdprPie.pieChartData = this.generateStatisticsPie('gdprPie', data);
                            }
                        });
                }
            });
    }

    parseStatisticsData(data: any) {
        return [
            {
                "value": data.notImplemented ? data.notImplemented.length : 0,
                "type": 0,
            },
            {
                "value": data.inProgress ? data.inProgress.length : 0,
                "type": 1,
            },
            {
                "value": data.deadlinePassed ? data.deadlinePassed.length : 0,
                "type": 2,
            },
            {
                "value": data.implemented ? data.implemented.length : 0,
                "type": 3,
            },
        ];
    };

    generateStatisticsPie(pieName: string, data: any) {
        let pieData: any = {};
        let pieChartData: number[] = [];
                        
        for(let single of data) {
            pieChartData.push(single.value);
        }
        return pieChartData;
    }

    public chartClicked(e: any): void {
        let data = this.getSoaTypeData();

        if (e.active.length > 0) {
            let index = e.active[0]._index;
            if (index == 0) {
                this.showAssetList = data.notImplemented;
                this.showAssetListLabel = "- Not implemented";
            }
            else if (index == 1) {
                this.showAssetList = data.inProgress;
                this.showAssetListLabel = "- In progress";
            }
            else if (index == 2) {
                this.showAssetList = data.deadlinePassed;
                this.showAssetListLabel = "- Deadline passed";
            }
            else if (index == 3) {
                this.showAssetList = data.implemented;
                this.showAssetListLabel = "- Implemented";
            }
  
            for(let single of this.showAssetList) {
                this.getAssetSoaStatistics(single.id);
            }
        }
    }
}
