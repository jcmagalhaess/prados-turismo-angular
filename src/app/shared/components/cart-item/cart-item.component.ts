import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { Excursao, TipoPassageiroEnum, TipoPassageiroType } from '../../models/excursao.type';
import { EnumType } from '../../models/global.type';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  public valor = computed(() => this.pacote().price);
  public tickets = computed(() => this.pacote().tickets.map((item: any) => ({ ...item, price: item.key === 'babies' ? 0 : this.valor() * item.value })));
  public totalValue = computed(() => this.tickets().filter((item: any) => item.key !== 'babies').reduce((acc: number, item: EnumType<string>) => acc + item.value, 0) * this.valor());
  public totalValueWithDiscount = computed(() => this.totalValue() * 0.95);
  
  @Input({ required: true }) pacote = signal<any>(null);
  @Input({ required: true }) participantes = [];
  @Input({ required: true }) excursao: Excursao | null = null;

  public formatPassageiroTypeLabel(type: TipoPassageiroType) {
    return TipoPassageiroEnum[type];
  }
}
