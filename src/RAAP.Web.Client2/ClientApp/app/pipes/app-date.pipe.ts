import { PipeTransform, Pipe } from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({ name: "appDate" })
export class AppDatePipe implements PipeTransform{
    constructor(private datePipe: DatePipe) { }

    transform(value: any, type: string): string | null {
        if (type && type == 'short') {
            return this.datePipe.transform(value, 'dd.MM.yyyy');
        }
        return this.datePipe.transform(value, "dd.MM.yyyy. HH:mm");
    }
}