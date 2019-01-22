export class SoaChapter {
    public id: number;
    public parent: number;
    public isoCode: string;
    public name: string;
    public description: string;
    public goal: string;
    public howTo: Text;
    public info: Text;
    public relevance: boolean;
    public riskAssessments: boolean
    public currentControl: boolean
    public contractual: boolean;
    public dataProtectionLaw: boolean;
    public compliance: number;
    public complianceDate: Date;
    public sourceReference: string;
    public controlDescription: string;
    public responisbleUserId: number;
    public implementationUserId: number;
    public implementationDate: Date;
    public reason: boolean;
    public availability: boolean;
    public integrity: boolean;
    public confidenciality: boolean;
    public authenticity: boolean;
    public subChapters: SoaChapter[];
}