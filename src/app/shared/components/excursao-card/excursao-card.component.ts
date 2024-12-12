import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-excursao-card',
  standalone: true,
  imports: [RouterModule, CurrencyPipe],
  templateUrl: './excursao-card.component.html',
  styleUrl: './excursao-card.component.scss'
})
export class ExcursaoCardComponent {
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) thumbnail: string = '';
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) duration: string = '';
  @Input({ required: true }) category: string = '';
  @Input({ required: true }) resume: string = '';
  @Input({ required: true }) price: number = 0;
}
