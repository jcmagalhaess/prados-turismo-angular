import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Origem } from '../../models/excursao.type';
import { CalcularDiasNoitesPipe } from '../../pipes/calcular-dias-noites.pipe';
import { LimitarTextoPipe } from '../../pipes/limitar-texto.pipe';

@Component({
  selector: 'app-excursao-card',
  standalone: true,
  imports: [RouterModule, CurrencyPipe, CalcularDiasNoitesPipe, LimitarTextoPipe],
  templateUrl: './excursao-card.component.html',
  styleUrl: './excursao-card.component.scss'
})
export class ExcursaoCardComponent {
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) thumbnail: string = '';
  @Input({ required: true }) title: string = '';
  @Input() duration: any = null;
  @Input({ required: true, transform: (value: any) => (Origem.find(item => item.key === value)?.value) }) category: string = '';
  @Input({ required: true }) resume: string = '';
  @Input({ required: true }) price: number = 0;

  public getLink(id: string) {
    if (id === 'jericoacoara') return `/${id}`;
    return `/pacotes/${id}`;
  }
}
