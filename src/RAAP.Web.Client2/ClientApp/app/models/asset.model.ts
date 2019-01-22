import { Risk } from './risk.model';
import { Evaluation } from './evaluation.model';
import { BusinessContinuityPlan } from './businessContinuityPlan.model';
import { Threat } from './threat.model';
import { CriticalityCategory } from './criticality.model';

export class Asset {
    public assetId:                        number;
    public name:                           string;
    public description:                    string;
    public aggregatedStatus:               string;
    public createdOn:                      Date;
    public updatedOn:                      Date;
    public subCategoryId:                  number;
    public systemRecoveryTime:             number;
    public dataRecoveryTime:               number;
    public integrityCheckTime:             number;
    public maxDownTime:                    number;
    public systemRecoveryCost:             number;
    public dataRecoveryCost:               number;
    public integrityCheckCost:             number;
    public maxDownCost:                    number;
    public requiresBusinessContinuityPlan: boolean;
    public confidenciality:                number;
    public integrity:                      number;
    public availability:                   number;
    public category:                       number;
    public enabled:                        boolean;
    public maintenanceCost:                number;
    public dueDate:                        Date;
    public investmentCost:                 number;
    public criticalityCategoryId:          number;
    public calculateSubCriticality:        boolean;
    public calculateSubRecovery:           boolean;
    public calculatedDataRecoveryCost:     number;
    public calculatedDataRecoveryTime:     number;
    public calculatedSystemRecoveryCost:   number;
    public calculatedSystemRecoveryTime:   number;
    public calculatedIntegrityCheckCost:   number;
    public calculatedIntegrityCheckTime:   number;
    public authenticity:                   number;
    public assetCategoryId:                number;
    public type:                           string;
    public subCategoryName:                string;
    public subCategory:                    AssetSubCategory;
    public criticalityCategory:            CriticalityCategory[];
    public risks:                          Risk[];
    public evaluations:                    Evaluation[];
    public timeCosts:                      TimeCosts[];
    public businessContinuityPlans:        BusinessContinuityPlan[];
    public assets:                         Asset[];
    public threats:                        Threat[];
    public recoveryCalculateType:          string;

    public constructor() {
        this.timeCosts = InitializeTimeCosts();
    }
}

export class AssetSubCategory {
    public assetSubCategoryId:              number;
    public name:                            string;
    public description:                     string;
    public createdOn:                       Date;
    public updatedOn:                       Date;
}

export class AssetCategory {
    public id:                              number;
    public name:                            string;
}

export class TimeCosts {
    public timeCostId:                      number;
    public time:                            number;
    public cost:                            number;
}

function InitializeTimeCosts() {
    let times = [10, 30, 60, 720, 1440];
    let tcs: TimeCosts[] = times.map(t => {
        let tc = new TimeCosts();
        tc.time = t;
        tc.cost = 0;
        return tc;
    })
    return tcs;
}