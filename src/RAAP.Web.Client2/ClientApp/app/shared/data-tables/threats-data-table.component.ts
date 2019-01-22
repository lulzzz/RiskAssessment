import { Component, Input, IterableDiffers } from "@angular/core";
import { RiskCategory, Risk } from "../../models/risk.model";
import { Asset } from "../../models/asset.model";
import { RiskFilter, RiskFilterCalculated } from "../../components/secure/inventory/asset/asset-risk-filter.pipe";
import { BaseDataTable } from "./base-data-table.component";

@Component({
    selector: 'app-threats-data-table',
    templateUrl: 'threats-data-table.component.html',
    styleUrls: ['base-data-table.component.css']
})
export class ThreatsDataTable extends BaseDataTable<Asset> {
    @Input() riskCategories: RiskCategory[] = [];
    riskColumnDefs: any[] = [];

    constructor(
        private riskFilterPipe: RiskFilter,
        private riskFilterCalculatedPipe: RiskFilterCalculated,
        _iterableDiffers: IterableDiffers
    ) {
        super(_iterableDiffers);
    }

    setupColumns(): void {
        this.displayColumns.push('name', 'category');

        this.riskCategories.forEach((riskCategory: RiskCategory, index) => {
            let column = {
                name: `riskCategory${index}`,
                header: `${riskCategory.name} (Reg/Calc)`,
                cell: (row: Asset) => {
                    let risk = row.risks.find(x => x.name == riskCategory.name) as Risk;
                    return `${this.riskFilterPipe.transform(risk)} ${this.riskFilterCalculatedPipe.transform(risk)}`
                }
            }
            this.riskColumnDefs.push(column);
        });

        this.riskColumnDefs.map(x => this.displayColumns.push(x.name));
        this.displayColumns.push('controls');
    }
}
