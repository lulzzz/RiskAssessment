import {
    Component,
    Inject,
    OnInit,
    NgModule,
    Input,
    ViewEncapsulation,
    OnChanges,
    SimpleChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy,
    ViewChild,
    ElementRef,
    ContentChild,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Process, ProcessCategory } from '../../../../models/process.model';
import { ProcessService } from '../../../../services/process.service';
import { UserService } from '../../../../services/user.service';
import { ProcessComponent } from '../process/process.component';
import { DialogsService } from '../../../../shared/dialogs.service';
import { AlertService } from '../../../../services/alert.service';
import { AssetService } from '../../../../services/asset.service';
import { AddAssetDialogComponent } from '../../../secure/dialogs/add-asset-dialog/add-asset-dialog.component';
import { AddEvaluationDialogComponent } from '../../../secure/dialogs/add-evaluation-dialog/add-evaluation-dialog.component';
import { Asset } from '../../../../models/asset.model';
import { Evaluation } from '../../../../models/evaluation.model';
import { ErrorObject } from '../../../../models/error-object.model';


@Component({
    selector: 'app-add-edit-process',
    templateUrl: './add-edit-process.component.html',
    encapsulation: ViewEncapsulation.Emulated, // None, Native
        styleUrls: ['./add-edit-process.component.css']
})

export class AddEditProcessComponent implements
    OnInit {
    processCategory: ProcessComponent[] = [];
    processUsers: ProcessComponent[] = [];
    processForm: FormGroup;
    id: number;
    editMode: boolean = false;
    public title: string;
    assets: Asset[] = [];
    addAssets: Asset[] = [];
    evaluations: Evaluation[] = [];
    public selectedEvaluation: Evaluation;
    types = [{ name: "Business", id: 1 }, { name: "Technical", id: 2 }, { name: "Physical", id: 3 }, { name: "Organizational", id: 4 }];
    disableButtons: boolean = false;
    process: Process;

    tableData: any = {};
    queryParams: any;
    defaultPageSize: number = 100;

    constructor(private fb: FormBuilder,
        private processService: ProcessService,
        private userService: UserService,
        private dialogService: DialogsService,
        private alertService: AlertService,
        private assetService: AssetService,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {

        if (this.route.snapshot.params["id"]) {
            this.id = +this.route.snapshot.params["id"];
        }
        this.createForm();
    }


    ngOnInit() {
        this.onGetProcessCategory();
        this.onGetUsers();
        this.onGetAssets();

        if (this.id > 0) {
            this.editMode = true;
            this.processService.getProcess(this.id)
                .subscribe(data => {
                    this.processForm.patchValue(data)
                    this.assets = data.assets;

                    for (var i = 0; i < this.assets.length; i++) {
                        for (var j = 0; j < this.types.length; j++) {
                            if (this.assets[i].category == this.types[j].id)
                                this.assets[i].type = this.types[j].name;
                        }
                    }

                    this.onSetTypes();
                    this.evaluations = data.evaluations;
                    this.selectedEvaluation = this.evaluations[0];
                })
        }
        else {
            this.process = new Process();
            this.process.assets = [];
            this.process.evaluations = [];
            this.selectedEvaluation = new Evaluation();
            this.processForm.patchValue(this.process);
        }
    }
 
    createForm() {
        this.processForm = this.fb.group({
            processId: 0,
            name: ['', [Validators.required]],
            categoryName: [''],
            category: ['', [Validators.required]],
            assets: [''],
            users: [0, [Validators.required]],
            evaluations: [''],
            responsibleUserId: 1,
            description: [''],
            enabled: 0,
        })
    }

    onGetProcessCategory() {

        this.queryParams = {
            pageSize: this.defaultPageSize,
            orderByKey: 'Name'
        }

        this.processService.getProcessCategories(this.queryParams)
            .subscribe(
            response => {
                this.processCategory = response.items;
                this.tableData['currentPage'] = response.currentPage;
                this.tableData['totalItems'] = response.totalItems;
                this.tableData['totalPages'] = response.totalPages;
            });
    }

    onGetUsers() {
        this.queryParams = {
            pageSize: 1000,
            orderByKey: 'firstName'
        }

        this.userService.getUsers(this.queryParams)
            .subscribe(
            response => {
                this.processUsers = response.items;
                this.tableData['currentPage'] = response.currentPage;
                this.tableData['totalItems'] = response.totalItems;
                this.tableData['totalPages'] = response.totalPages;
            });
    }

    onSubmit() {
        
        if (!this.processForm.valid) {
            return
        }

        this.disableButtons = true;
        let observable = this.editMode ? this.processService.updateProcess(this.processForm.value) : this.processService.createProcess(this.processForm.value);
        observable.subscribe(data => {
            if (data instanceof ErrorObject) {
                this.disableButtons = false;
            } else {
                let label = this.editMode ? "updated" : "created";

                this.alertService.success(`SUCCESS! The business process was ${label}.`);
                this.router.navigate(['/processes']);
            }
        });
    }

    onDelete() {
        this.dialogService
            .confirm('Delete', 'Are you sure you want to delete this item?')
            .subscribe(result => {
                if (result) {
                    this.disableButtons = true;
                    this.processService.deleteProcess(this.id).subscribe((data) => {
                        if (data instanceof ErrorObject) {
                            this.disableButtons = false;
                        } else {
                            this.alertService.info("INFO! The business process was deleted.");
                            this.router.navigate(['/processes']);
                        }
                    });
                }
            });
    }

    onGetAssets() {
        this.assets = [];
    }

    onOpenAssetDialog() {
        let dialogRef = this.dialog.open(AddAssetDialogComponent, {
            disableClose: false,
            width: '700px',
            height: 'auto',
            data: {
                assets: this.assets
            }
        });

        const sub = dialogRef.componentInstance.onAdd.subscribe((data: any) => {
            this.assets.push(data[data.length - 1]);
           // this.assets = [...this.assets];
        });

        dialogRef.afterClosed().subscribe(() => {
            sub.unsubscribe();
        });
    }

    onOpenEvaluationDialog() {
        let dialogRef = this.dialog.open(AddEvaluationDialogComponent, {
            disableClose: false,
            width: '700px',
            height: 'auto',
            data: {
                evaluations: this.evaluations
            }
        });

        dialogRef.componentInstance.onAddEvaluation.subscribe((data: any) => {
            this.processForm.value.evaluations.unshift(data);
            this.selectedEvaluation = data;
        });
    }

    onRemoveAsset(assetId: number) {
        this.assets.forEach((t, i) => {
            if (t.assetId == assetId) {
                this.assets.splice(i, 1);
            }
        });
    }

    onSetTypes(): void {
        this.assets.forEach(x => x.type = this.types[x.category-1].name);
    }
}