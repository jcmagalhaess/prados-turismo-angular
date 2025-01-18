import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formataParcelas',
  standalone: true
})
export class FormataParcelasPipe implements PipeTransform {

  transform(value: number): string {
    if (value > 2000) return "em até 10x sem juros";
    return 'em até 5x sem juros';
  }

}
