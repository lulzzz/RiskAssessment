import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';


@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class PublicLayoutComponent implements AfterViewInit {

    ngAfterViewInit(): void {

    }
}
