import { Component, Input, Output, OnInit, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { SoaChapter } from '../../../../../../models/soa.model';
import { ActivatedRoute } from '@angular/router';
import { MatExpansionPanel } from '@angular/material';

@Component({
    selector: 'app-first-chapter-level',
    templateUrl: './first-chapter-level.component.html',
    styleUrls: ['./first-chapter-level.component.css']
})

export class FirstChapterLevelComponent implements OnInit {
    @Input() firstChapterLevelGroup: FormGroup;
    @Input() parrentArray: FormArray;
    @Input() checkSoaLayout: boolean;
    @Input() soaType: number;
    @Input() soaCode: string;
    @Input() isNewest: boolean;
    @ViewChild('panel') panel: ElementRef;
    newestChapter: number = 0;

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        if (this.isNewest == true) {
            setTimeout(() => {
                this.panel.nativeElement.scrollIntoView(true)
            })
        }
        this.setSecondChapterLevel();
    }

    setSecondChapterLevel() {
        const sub = this.firstChapterLevelGroup.value.subChapters as Array<SoaChapter>;

        let mappedChapters: FormArray = new FormArray([]);
        sub.forEach(x => {
            let chapter = this.fb.group({
                "id": x.id,
                "name": new FormControl(x.name, Validators.required),
                "description": new FormControl(x.description, Validators.required),
                "goal": x.goal,
                "howTo": x.howTo,
                "info": x.info,
                "isoCode": x.isoCode,
                "subChapters": this.fb.array(x.subChapters)
            });
            mappedChapters.push(chapter);
        });
        this.firstChapterLevelGroup.setControl("subChapters", mappedChapters);
    }

    onAddNewSecondChapterLevel() {
        const secondChapterLevelArray = <FormArray>this.firstChapterLevelGroup.controls['subChapters'];
        const newSecondChapterLevel = this.newSecondChapter();

        secondChapterLevelArray.push(newSecondChapterLevel);
        this.newestChapter = secondChapterLevelArray.length;
    }

    onRemoveFirstChapterLevel() {
        this.parrentArray.removeAt(this.parrentArray.value.findIndex((x:any) => x.id == this.firstChapterLevelGroup.value.id));
    }

    newSecondChapter() {
        return this.fb.group({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            goal: '',
            isoCode: this.soaCode,
            soaType: this.soaType,
            subChapters: this.fb.array([])
        });
    }

    isNewestChapter(i: number) {
        if (this.newestChapter - 1 == i) {
            return true
        }
        return false
    }
}