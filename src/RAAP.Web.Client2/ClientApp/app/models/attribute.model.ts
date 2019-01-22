export class Attribute {
    public attributeId: number;
    public name: string;
    public description: string;
    public attributeCategoryId: number;
    public comment: string;
    public updatedOn: Date;
    public createdOn: Date;
    public monthTimeframe: number;
    public dayTimeframe: number;
    public hourTimeframe: number;
    public source: number;
}

export class AttributeCategory {
    public attributeCategoryId: number;
    public attributeTypeId: string;
    public name: string;
    public description: string;
}
