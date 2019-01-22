import { Evaluation } from "./evaluation.model";
import { Control } from "./control.model";
import { Attribute } from "./attribute.model";
import { Risk } from './risk.model';
export class Threat {
    public threatId: number;
    public name: string;
    public description: string;
    public damageProbability: number;
    public damageImpact: number;
    public threatCategoryId: number;
    public internalExternal: number;
    public securitySafety: number;
    public riskAssessmentMethod: number;
    public acceptRisk: boolean;
    public confidenciality: boolean;
    public integrity: boolean;
    public availability: boolean;
    public reduceRisk: boolean;
    public reputationProbability: number;
    public reputationImpact: number;
    public financialProbability: number;
    public financialImpact: number;
    public damageValue: number;
    public damageThreat: number;
    public damageVulnerability: number;
    public financialValue: number;
    public financialThreat: number;
    public financialVulnerability: number;
    public reputationValue: number;
    public reputationThreat: number;
    public reputationVulnerability: number;
    public shareRisk: boolean;
    public avoidRisk: boolean;
    public riskDate: Date;
    public riskUser: string;
    public authenticity: boolean;
    public controlsCount: number;
    public evaluations: Evaluation[];
    public controls: Control[];
    public causes: Attribute[];
    public risks: Risk[];
    public category: ThreatCategory;
    public assetName: string;
}

export class ThreatCategory {
    public threatCategoryId: number;
    public name: string;
    public description: string;
}









