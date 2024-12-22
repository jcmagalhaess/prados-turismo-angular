import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitarTexto',
  standalone: true
})
export class LimitarTextoPipe implements PipeTransform {

  transform(value: string, limite: number): string {
    if (value.length > limite) {
      return value.substring(0, limite) + '...';
    }
    return value;
  }

}
