export class User {
    userId:       number;
    email:        string;
    firstName:    string;
    lastName:     string;
    createdOn:    Date;
    updatedOn:    Date;
    companyId:    number;
    username:     string;
    companyName:  string;
    roles:        string[];
    title:        string;
    department:   string;
    phone:        string;
    
}

export class RoleCategory {
    public id: number;
    public name: string;
}


export class Roles{
    public id: number;
    public name: string;
}