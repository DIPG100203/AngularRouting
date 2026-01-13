import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vocales',
  standalone: true
})
export class VocalesPipe implements PipeTransform {

  transform(value: string): string {

    let newString = value.replace(/a/g, '@');
    newString = newString.replace(/e/g, '3');
    newString = newString.replace(/i/g, '1');
    newString = newString.replace(/o/g, '0');
    newString = newString.replace(/u/g, 'ü');
    return newString;
  }

}
