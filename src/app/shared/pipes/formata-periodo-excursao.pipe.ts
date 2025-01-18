import { DatePipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'periodoExcursao',
  standalone: true
})
export class FormatarPeriodoExcursao implements PipeTransform {
  private datePipe = inject(DatePipe);

  transform(value: any, ...args: any[]): any {
    let dataInicio = value.dataInicio.replace('Z', '');
    let dataFim = value.dataFim.replace('Z', '');
    let diaDataInicio = new Date(dataInicio).getDate().toString().padStart(2, '0');
    
    if (value) return `${diaDataInicio} a ${this.datePipe.transform(dataFim, 'dd/MM/yyyy')}`;
    
    return null;
  }

}
