import { Evaluation } from "./evaluation.model";
import { Risk } from "./risk.model";

export class Control {
    public controlId: number;
    public name: string;
    public description: string;
    public createdOn: Date;
    public updatedOn: Date;
    public executedDate: Date;
    public validTo: Date;
    public investmentCost: number;
    public maintenanceCost: number;
    public legalObligation: boolean;
    public status: number;
    public deadline: Date;
    public type: number;
    public controlCategoryId: number;
    public damageValue: number;
    public damageThreat: number;
    public damageVulnerability: number;
    public damageImpact: number;
    public damageProbability: number;
    public financialValue: number;
    public financialThreat: number;
    public financialVulnerability: number;
    public financialImpact: number;
    public financialProbability: number;
    public reputationValue: number;
    public reputationThreat: number;
    public reputationVulnerability: number;
    public reputationImpact: number;
    public reputationProbability: number;
    public responsibleUserId: number;
    public detect: boolean;
    public prevent: boolean;
    public react: boolean;
    public alertDate: Date;
    public alertUserId: number;
    public avoid: boolean;
    public evaluations: Evaluation[];
    public risks: Risk[];
}

export class ControlCategory {
    public controlCategoryId: number;
    public name: string;
    public description: string;
    public createdOn: Date;
    public updatedOn: Date;
}

export class StatusCategory {
    public id: number;
    public name: string;
}