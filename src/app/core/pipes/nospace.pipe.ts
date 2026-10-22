import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'nospace'
})
export class Nospace implements PipeTransform{
    transform(value: string) {
       return value.replaceAll(' ','');
    }

}