import { Pipe, PipeTransform } from "@angular/core";
import { Risk } from "../../../../models/risk.model";


@Pipe({ name: 'riskFilter' })
export class RiskFilter implements PipeTransform {
    transform(value: Risk) {
        if (value === undefined) {
            value = Object.assign(new Risk(), { isoProbability: 0, isoImpact: 0 });
        }

        var threat = value.isoProbability + "/" + value.isoImpact;
        if (value.isoImpact == 5 && value.isoProbability >= 3)
            return "<i class='threat-red'>" + threat + "</i>";
        if (value.isoImpact == 4 && value.isoProbability >= 4)
            return "<i class='threat-red'>" + threat + "</i>";
        if (value.isoImpact == 3 && value.isoProbability == 5)
            return "<i class='threat-red'>" + threat + "</i>";

        if (value.isoImpact == 1 && value.isoProbability <= 3)
            return "<i class='threat-green'>" + threat + "</i>";
        if (value.isoImpact == 2 && value.isoProbability <= 2)
            return "<i class='threat-green'>" + threat + "</i>";
        if (value.isoImpact == 3 && value.isoProbability == 1)
            return "<i class='threat-green'>" + threat + "</i>";

        if (value.isoImpact == 0 && value.isoProbability == 0)
            return "<i class='threat-green'>" + threat + "</i>";

        return "<i class='threat-yellow'>" + threat + "</i>";
    }

}

@Pipe({ name: 'riskFilterCalculated' })
export class RiskFilterCalculated implements PipeTransform {
    transform(value: Risk) {
        if (value === undefined) {
            value = Object.assign(new Risk(), { calculatedIsoProbability: 0, calculatedIsoImpact: 0 });
        }

        var threat = value.calculatedIsoProbability + "/" + value.calculatedIsoImpact;
        if (value.calculatedIsoImpact == 5 && value.calculatedIsoProbability >= 3)
            return "<i class='threat-red'>" + threat + "</i>";
        if (value.calculatedIsoImpact == 4 && value.calculatedIsoProbability >= 4)
            return "<i class='threat-red'>" + threat + "</i>";
        if (value.calculatedIsoImpact == 3 && value.calculatedIsoProbability == 5)
            return "<i class='threat-red'>" + threat + "</i>";

        if (value.calculatedIsoImpact == 1 && value.calculatedIsoProbability <= 3)
            return "<i class='threat-green'>" + threat + "</i>";
        if (value.calculatedIsoImpact == 2 && value.calculatedIsoProbability <= 2)
            return "<i class='threat-green'>" + threat + "</i>";
        if (value.calculatedIsoImpact == 3 && value.calculatedIsoProbability == 1)
            return "<i class='threat-green'>" + threat + "</i>";

        if (value.calculatedIsoImpact == 0 && value.calculatedIsoProbability == 0)
            return "<i class='threat-green'>" + threat + "</i>";

        return "<i class='threat-yellow'>" + threat + "</i>";
    }

}

@Pipe({ name: 'assetSliderFilter' })
export class AssetSliderFilter implements PipeTransform {
    transform(value: number): string {
        if (value <= 2 )
            return "rtrm-slider-success";
        else if (value == 3)
            return "rtrm-slider-warn";
        else
            return "rtrm-slider-danger";
    }
}