import { Pipe, PipeTransform } from '@angular/core';
import { calcularDiasENoites } from '../helpers/calcular-dias-noites.helper';

@Pipe({
  name: 'calcularDiasNoites',
  standalone: true
})
export class CalcularDiasNoitesPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value) return calcularDiasENoites(value.dataInicio, value.dataFim);
    
    return null;
  }

}
