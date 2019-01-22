import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { SoaChapter } from '../../../../../models/soa.model';
import { SoaService } from '../../../../../services/soa.service';
import { AlertService } from '../../../../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirstChapterLevelComponent } from './first-chapter-level/first-chapter-level.component';
import { MatExpansionPanel } from '@angular/material';

@Component({
    selector: 'app-main-soa',
    templateUrl: './main-soa.component.html',
    styleUrls: ['./main-soa.component.css']
})

export class MainSoaComponent implements OnInit {
    @Input() soaChaptersItems: SoaChapter[];
    mainForm: FormGroup;
    checkSoaLayout: boolean;
    soaType: number;
    soaCode: string = 'en-us';
    newestChapter: number = 0;

    constructor(private fb: FormBuilder,
        private soaService: SoaService,
        private alertService: AlertService,
        private router: Router,
        private route: ActivatedRoute) {

        if (this.route.snapshot.url[0].path == 'soa')
            this.checkSoaLayout = true;
        else
            this.checkSoaLayout = false;
    }

    ngOnInit() {
        if (this.route.snapshot.params["id"]) {
            this.soaType = +this.route.snapshot.params["id"];
        }

        this.onGetSoa(this.soaType, this.soaCode);
        this.mainForm = this.fb.group({
            soaChaptersItems: this.fb.array([])
        });
    }

    onGetSoa(soaType: number, soaCode: string) {
        this.soaService.getSoaChapters(soaType, soaCode)
            .subscribe(
            response => {
                this.soaChaptersItems = response.soaChapters;
                this.setFirstChapterLevel();
            });
    }

    onSubmit() {
        if (this.checkSoaLayout) {
            this.soaService.updateSoa(this.mainForm.value.soaChaptersItems)
                .subscribe((data => {
                    this.alertService.success("SUCCESS! The soa was updated.");
                }));
        }
        else {
            this.soaService.updateSoaChapters(this.mainForm.value.soaChaptersItems)
                .subscribe((data => {
                    this.alertService.success("SUCCESS! The chapter was updated.");
                }));
        }
    }

    setFirstChapterLevel() {
        let mappedChapters: FormArray = new FormArray([]);
        this.soaChaptersItems.forEach(x => {
            let chapter = this.fb.group({
                "id": x.id,
                "name": new FormControl(x.name, Validators.required),
                "description": new FormControl(x.description, Validators.required),
                "isoCode": x.isoCode,
                "soaType": this.soaType,
                "subChapters": this.fb.array(x.subChapters)
            });
            mappedChapters.push(chapter);
        });
        this.mainForm.setControl("soaChaptersItems", mappedChapters);
    }

    onAddNewFirtChapterLevel() {
        const firstChapterLevelArray = <FormArray>this.mainForm.controls['soaChaptersItems'];
        const newFirstChapterLevel = this.newFirstChapter()

        firstChapterLevelArray.push(newFirstChapterLevel);
        this.newestChapter = firstChapterLevelArray.length;
    }

    onRemoveFirstChapterLevel(idx: number) {
        const firstChapterLevelArray = <FormArray>this.mainForm.controls['soaChaptersItems'];
        firstChapterLevelArray.removeAt(idx);
    }

    newFirstChapter() {
        return this.fb.group({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
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