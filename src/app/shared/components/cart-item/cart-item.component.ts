import { CommonModule } from '@angular/common';
import { Component, computed, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { ExcursoesSingleUsecase } from '../../../features/pacotes/services/excursoes-single.usecase';
import { TipoPassageiroEnum, TipoPassageiroType } from '../../models/excursao.type';
import { AsyncOpcionaisPipe } from '../../pipes/async-opcionais.pipe';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, AsyncOpcionaisPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent implements OnChanges {
  public tickets = signal<any>([]);
  public totalValueTickets = computed(() => this.tickets().reduce((acc: number, item: any) => acc + item.price, 0));
  public totalValueOpcionais = computed(() => this.cart.flatMap((item: any) => item.opcionais).reduce((acc: number, item: any) => acc + (item.value * item.price), 0));
  public totalValue = computed(() => this.totalValueTickets() + this.totalValueOpcionais());
  public totalValueWithDiscount = signal<number>(0);
  
  @Input({ required: true }) cart: Array<any> = [];

  get excursao() {
    return this._excursao.excursao();
  }

  constructor(private readonly _excursao: ExcursoesSingleUsecase) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['cart']) {
      this.tickets.set(this.cart.flatMap((item: any) => item.tickets));
    }
  }

  public buildPrice(tickets: any) {
    return tickets.reduce((acc: number, item: any) => acc + item.price, 0);
  }

  public formatPassageiroTypeLabel(type: TipoPassageiroType) {
    return TipoPassageiroEnum[type];
  }
}
