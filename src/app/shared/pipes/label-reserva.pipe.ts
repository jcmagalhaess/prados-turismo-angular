import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelReserva',
  standalone: true
})
export class LabelReservaPipe implements PipeTransform {

  transform(value: number): string {
    return `#${value.toString().padStart(4, '0')}`;
  }

}
