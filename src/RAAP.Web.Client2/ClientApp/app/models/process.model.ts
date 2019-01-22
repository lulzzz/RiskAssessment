import { User } from './user.model';
import { Evaluation } from './evaluation.model';
import { Asset } from './asset.model';
import { Risk } from './risk.model';

export class Process {
    public processId: number;
    public createdOn: Date;
    public updatedOn: Date;
    public responsibleUser: User;
    public responsibleUserId: number;
    public name: string;
    public enabled: boolean;
    public description: string;
    public category: ProcessCategory;
    public categoryName: string;
    public evaluations: Evaluation[];
    public assets: Asset[];
    public risks: Risk[];
    public users: User[];
}

export class ProcessCategory {
    public processCategoryId: number;
    public name: string;
    public description: string;
    public createdOn: Date;
    public updatedOn: Date;
}