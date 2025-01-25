import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyLabel',
  standalone: true
})
export class EmptyLabelPipe implements PipeTransform {

  transform(value: string | null): string {
    if (!value) return '---';
    return value;
  }

}
