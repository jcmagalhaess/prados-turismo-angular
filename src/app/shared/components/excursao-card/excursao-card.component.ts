import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Origem } from '../../models/excursao.type';
import { CalcularDiasNoitesPipe } from '../../pipes/calcular-dias-noites.pipe';

@Component({
  selector: 'app-excursao-card',
  standalone: true,
  imports: [RouterModule, CurrencyPipe, CalcularDiasNoitesPipe],
  templateUrl: './excursao-card.component.html',
  styleUrl: './excursao-card.component.scss'
})
export class ExcursaoCardComponent {
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) thumbnail: string = '';
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) duration: any = {};
  @Input({ required: true, transform: (value: any) => (Origem.find(item => item.key === value)?.value) }) category: string = '';
  @Input({ required: true }) resume: string = '';
  @Input({ required: true }) price: number = 0;
}
