import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'controlSliderFilter' })
export class ControlSliderFilter implements PipeTransform {
    transform(value: number): string {
        if (value <= 33)
            return "rtrm-slider-success";
        else if (value > 33 && value <= 66)
            return "rtrm-slider-warn";
        else
            return "rtrm-slider-danger";
    }
}