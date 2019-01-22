import { Component, OnInit, OnChanges, DoCheck, Input, Output, EventEmitter, IterableDiffers } from "@angular/core";
import { MatTableDataSource } from "@angular/material";

@Component({})
export abstract class BaseDataTable<T> implements OnChanges, OnInit, DoCheck {
    @Input() data: T[] = [];

    @Output() onEdit: EventEmitter<T> = new EventEmitter<T>();
    showEdit: boolean = false;

    @Output() onRemove: EventEmitter<T> = new EventEmitter<T>();
    showRemove: boolean = false;

    dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);
    displayColumns: string[] = [];
    showActions: boolean = false;
    differ: any;

    constructor(
        _iterableDiffers: IterableDiffers
    ) {
        this.differ = _iterableDiffers.find([]).create();
    }

    ngOnInit(): void {
        this.setupColumns();
        this.setupActionColumn();
        this.setupDataSource();
    }

    ngOnChanges(): void {
        this.setupDataSource();
    }

    ngDoCheck(): void {
        let changes = this.differ.diff(this.data);

        if (changes) {
            this.setupDataSource();
        }
    }

    abstract setupColumns(): void;

    setupActionColumn(): void {
        this.showEdit = this.onEdit.observers.length > 0;
        this.showRemove = this.onRemove.observers.length > 0;
        this.showActions = this.showEdit || this.showRemove;

        if (this.showActions) {
            this.displayColumns.push('actions');
        }
    };

    setupDataSource() {
        this.dataSource = new MatTableDataSource<T>(this.data)
    }

    edit(data: T): void {
        this.onEdit.emit(data);
    }

    remove(data: T): void {
        this.onRemove.emit(data);
    }
}