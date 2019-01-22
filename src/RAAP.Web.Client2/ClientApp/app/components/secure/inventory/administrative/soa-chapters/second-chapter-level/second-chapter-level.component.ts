import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { SoaChapter } from '../../../../../../models/soa.model';
import { SoaService } from '../../../../../../services/soa.service';
import { AlertService } from '../../../../../../services/alert.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-second-chapter-level',
    templateUrl: './second-chapter-level.component.html',
    styleUrls: ['./second-chapter-level.component.css']
})

export class SecondChapterLevelComponent {
    @Input() secondChapterLevelGroup: FormGroup;
    @Input() parrentArray: FormArray;
    @Input() checkSoaLayout: boolean;
    @Input() soaType: number;
    @Input() soaCode: string;
    @Input() isNewest: boolean;
    @ViewChild('panel') panel: ElementRef;
    newestChapter: number = 0;
    companyId = 1

    constructor(private fb: FormBuilder,
        private soaService: SoaService,
        private alertService: AlertService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        if (this.isNewest == true) {
            setTimeout(() => {
                this.panel.nativeElement.scrollIntoView(true)
            })
        }
      this.setThirdChapterLevel();
    }

    setThirdChapterLevel() {
        const sub = this.secondChapterLevelGroup.value.subChapters as Array<SoaChapter>;

        let mappedChapters: FormArray = new FormArray([]);
        sub.forEach(x => {
            let chapter = this.fb.group({
                "id": x.id,
                "name": new FormControl(x.name, Validators.required),
                "description": new FormControl(x.description, Validators.required),
                "goal": x.goal,
                "howTo": x.howTo,
                "info": x.info,
                "relevance": x.relevance,
                "riskAssessments": x.riskAssessments,
                "currentControl": x.currentControl,
                "contractual": x.contractual,
                "dataProtectionLaw": x.dataProtectionLaw,
                "compliance": x.compliance,
                "complianceDate": x.complianceDate,
                "sourceReference": x.sourceReference,
                "controlDescription": x.controlDescription,
                "responisbleUserId": x.responisbleUserId,
                "implementationUserId": x.implementationUserId,
                "implementationDate": x.implementationDate,
                "reason": x.reason,
                "availability": x.availability,
                "integrity": x.integrity,
                "confidenciality": x.confidenciality,
                "authenticity": x.authenticity,
                "isoCode": this.soaCode,
                "soaType": this.soaType,
                "companyId": this.companyId,
                "subChapters": this.fb.array(x.subChapters)
            });
            mappedChapters.push(chapter);
        });
        this.secondChapterLevelGroup.setControl("subChapters", mappedChapters);
    }

    onAddNewThirdChapterLevel() {
        const thirdChapterLevelArray = <FormArray>this.secondChapterLevelGroup.controls['subChapters'];
        const newThirdChapterLevel = this.newThirdChapter();

        thirdChapterLevelArray.push(newThirdChapterLevel);
        this.newestChapter = thirdChapterLevelArray.length;
    }

    onRemoveSecondChapterLevel() {
        this.parrentArray.removeAt(this.parrentArray.value.findIndex((x: any) => x.id == this.secondChapterLevelGroup.value.id));
    }

    newThirdChapter() {
        return this.fb.group({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            goal: '',
            howTo: '',
            info: '',
            isoCode: this.soaCode,
            soaType: this.soaType,
        });
    }

    onStopPropagation(event: any): void {
        event.stopPropagation();
    }

    isNewestChapter(i: number) {
        if (this.newestChapter - 1 == i) {
            return true
        }
        return false
    }
}