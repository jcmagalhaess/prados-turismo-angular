import { Pipe, PipeTransform } from '@angular/core';
import { formatarData, parseDateLocal } from '../helpers/formatar-data.helper';
import { Excursao } from '../models/excursao.type';

@Pipe({
  name: 'periodo',
  standalone: true
})
export class PeriodoPipe implements PipeTransform {

  transform(value: Excursao): string {
    if (!value) return '';
    return `${formatarData(parseDateLocal(value.dataInicio))} à ${formatarData(
      parseDateLocal(value.dataFim)
    )}`;
  }

}
