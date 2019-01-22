export class PagedQuery {
    public pageSize: number;
    public page: number;
    public orderByKey: string;
    public isDescending: boolean;
}

export class PagedResult<T> {
    public currentPage: number;
    public totalPages: number;
    public totalItems: number;
    public items: Array<T>;
}

export class SimpleSearchResult {
    public id: number;
    public name: string;
}