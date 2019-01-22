export class Risk {
    public calculatedIsoImpact: number;
    public calculatedIsoProbability: number;
    public calculatedIsoRisk: number;
    public calculatedNsRisk: number;
    public calculatedNsThreat: number;
    public calculatedNsValue: number;
    public calculatedNsVulnerability: number;
    public isoImpact: number;
    public isoProbability: number;
    public isoRisk: number;
    public name: string;
    public nsRisk: number;
    public nsThreat: number;
    public nsValue: number;
    public nsVulnerability: number;
    public riskId: number;
    public type: string[];
    riskReduceId: number;
}

export class RiskCategory {
    public riskTypeId: number;
    public name: string;
    public description: string;
}