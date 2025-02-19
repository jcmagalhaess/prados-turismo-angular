import { CommonModule } from '@angular/common';
import { Component, computed, input, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { CupomDTO } from '../../../core/meu-carrinho/services/cupom.usecase';
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
  public subtotalWithDiscount = computed(() => this.totalValueTickets() - (this.totalValueTickets() * (this.cupom()?.desconto ?? 0) / 100));
  public totalValue = computed(() => this.subtotalWithDiscount() + this.totalValueOpcionais());
  public cupom = input<CupomDTO | null>(null);
  
  @Input({ required: true }) cart: Array<any> = [];
  @Input() shadow: boolean = true;

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

  public discountedValue(price: number) {
    return (price * (this.cupom()?.desconto! / 100) * -1)
  }

  public subtotalExcursao(price: number) {
    if (this.cupom()) {
      return price - (price * this.cupom()?.desconto! / 100);
    } else return price;
  }
}
