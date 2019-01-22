import { Component, Inject, ChangeDetectorRef, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fileUploadService } from '../../../../services/fileUpload.service';
import { AlertService } from '../../../../services/alert.service';

@Component({
    selector: 'app-centralfiles',
    templateUrl: './centralfiles.component.html',
    styleUrls: ['./centralfiles.component.css']
})
export class CentralfilesComponent implements OnInit {
    public showLoadingIcon: boolean;
    private ref: ChangeDetectorRef;
    selectedOption: string;
    fileToUpload: any;
    formUploadData: FormGroup;

    // Proggress bar
    color = 'primary';
    mode = 'indeterminate';
    showProggress = false;


    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(ref: ChangeDetectorRef, private fileService: fileUploadService, private fb: FormBuilder, private alertService: AlertService,) {
        this.ref = ref;
        this.showLoadingIcon = false;

    }

    /*
    //This part of code waits for backend implementation
    // Array of uploaded files
    files = [
        {
            name: 'Vacation Itinerary',
            updated: new Date('2/20/16'),
        },
        {
            name: 'Kitchen Remodel',
            updated: new Date('1/18/16'),
        }
    ];
    */

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.formUploadData = this.fb.group({
            soaType: 3,
            master: false
        })
    }

    // This part of code waits for backend implementation for full functionality (soachapterid, soaType and master are hardcoded until backend provide this information)
    onAddFile(): void {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            this.fileToUpload = fi.files[0];
            this.showProggress = true;
            let formData: FormData = new FormData();
            formData.append('soachapterid', "1");
            formData.append('soaType', "3");
            formData.append('master', "false");
            formData.append('file', this.fileToUpload, this.fileToUpload.name);
            this.fileService
                .uploadFile(formData)
                .subscribe(res => {
                    if (res) {
                        this.showProggress = false;
                        this.alertService.success("SUCCESS! The file was uploaded.");             
                    } else {
                        this.alertService.error("UPLOAD FAILED! The file was not uploaded.");
                    }
                });
        }
    }

    openDialog() {
        this.fileInput.nativeElement.click();
    }
}
