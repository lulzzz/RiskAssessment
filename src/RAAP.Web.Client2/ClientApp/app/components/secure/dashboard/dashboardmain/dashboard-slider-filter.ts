import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sliderFilter' })
export class SliderFilter implements PipeTransform {
    transform(value: number): string {
        if (value < 2 || value == 2)
            return "rtrm-slider-success";
        else if (value == 3)
            return "rtrm-slider-warn";
        else
            return "rtrm-slider-danger";
    }
}

@Pipe({ name: 'expandedFilter' })
export class ExpandedFilter implements PipeTransform {
    transform(value: boolean): string {
        if (value)
            return "false";
        else
            return "true";
    }
}

@Pipe({ name: 'sliderName' })
export class SliderName implements PipeTransform {
    transform(value: number): string {

        if (value == 1)
            return "1- Very low";
        else if (value == 2)
            return "2- Low";
        else if (value == 3)
            return "3- Medium";
        else if (value == 4)
            return "4- High";
        else (value == 5)
            return "5- Very high";
    }
}
