import { Pipe, PipeTransform } from '@angular/core';
import { formatarData } from '../helpers/formatar-data.helper';
import { Excursao } from '../models/excursao.type';

@Pipe({
  name: 'periodo',
  standalone: true
})
export class PeriodoPipe implements PipeTransform {

  transform(value: Excursao): string {
    return `${formatarData(new Date(value.dataInicio))} à ${formatarData(
      new Date(value.dataFim)
    )}`;
  }

}
