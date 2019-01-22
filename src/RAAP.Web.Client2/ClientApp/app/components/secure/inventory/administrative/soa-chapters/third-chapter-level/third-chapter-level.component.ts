import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { SoaChapter } from '../../../../../../models/soa.model';
import { User } from '../../../../../../models/user.model';
import { UserService } from '../../../../../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-third-chapter-level',
    templateUrl: './third-chapter-level.component.html',
    styleUrls: ['./third-chapter-level.component.css']
})

export class ThirdChapterLevelComponent {
    @Input() thirdChapterLevelGroup: FormGroup;
    @Input() parrentArray: FormArray;
    @Input() checkSoaLayout: boolean;
    @Input() isNewest: boolean;
    @ViewChild('panel') panel: ElementRef;
    newestChapter: number = 0;
    users: User[];
    companyId = 1

    compliances = [
        { value: 1, name: 'Not Started' },
        { value: 2, name: 'Started' },
        { value: 3, name: 'Implemented' }
    ];

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService) {
    }

    ngOnInit() {
        this.onGetUsers();

        if (this.isNewest == true) {
            setTimeout(() => {
                this.panel.nativeElement.scrollIntoView(true)
            })
        }
    }

    onGetUsers() {
        this.userService.getUsers(this.companyId)
            .subscribe(
            response => {
                this.users = response.items;
            });
    }

    onRemoveThirdChapterLevel() {
        this.parrentArray.removeAt(this.parrentArray.value.findIndex((x: any) => x.id == this.thirdChapterLevelGroup.value.id));
    }

    onStopPropagation(event: any): void {
        event.stopPropagation();
    }
}