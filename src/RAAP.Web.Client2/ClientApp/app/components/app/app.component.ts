import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';


@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

    ngAfterViewInit(): void {

    }
}
