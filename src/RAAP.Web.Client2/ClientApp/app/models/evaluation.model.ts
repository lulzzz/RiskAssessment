import { User } from "./user.model";

export class Evaluation {
    createdOn: Date;
    user: User;
    revision: number;
    text: string;

}