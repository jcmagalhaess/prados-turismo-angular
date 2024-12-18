import { CommonModule } from '@angular/common';
import { Component, computed, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { TipoPassageiroEnum, TipoPassageiroType } from '../../models/excursao.type';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent implements OnChanges {
  public tickets = signal<any>([]);
  public totalValue = computed(() => this.tickets().reduce((acc: number, item: any) => acc + item.price, 0));
  public totalValueWithDiscount = signal<number>(0);
  
  @Input({ required: true }) cart: Array<any> = [];

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
