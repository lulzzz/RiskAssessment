import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, ChangeDetectorRef, OnInit, AfterViewInit, ViewChild, EventEmitter, Output, Input, ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Asset } from '../../../../models/asset.model';
import { AssetService } from '../../../../services/asset.service';
import { PagedQuery, PagedResult } from '../../../../models/common.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AssetComponent } from '../../inventory/asset/asset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Evaluation } from '../../../../models/evaluation.model';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'app-asset-dialog',
    templateUrl: './add-evaluation-dialog.component.html',
    styleUrls: ['./add-evaluation-dialog.component.css']
})
export class AddEvaluationDialogComponent implements OnInit {
    onAddEvaluation = new EventEmitter();
    private ref: MatDialogRef<AddEvaluationDialogComponent>;
    form: FormGroup;
    evaluation: Evaluation;

    @ViewChild(DatatableComponent) table: DatatableComponent;
    constructor(private dialogRef: MatDialogRef<AddEvaluationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService
    ) {
        this.ref = dialogRef;
        this.evaluation = new Evaluation();
        this.evaluation.text = (data.evaluations.length) ? data.evaluations[0].text : '';
        this.evaluation.revision = (data.evaluations.length) ? data.evaluations[0].revision + 1 : 1;
    }

    ngOnInit() {
        this.userService.getMyUser().subscribe(user => {
            this.evaluation.user = user;
        });
    }

    onCloseDialog() {
        this.dialogRef.close();
    }

    onAddEvaluat() {
        this.evaluation.createdOn = new Date();
        this.onAddEvaluation.emit(this.evaluation);
    }
}