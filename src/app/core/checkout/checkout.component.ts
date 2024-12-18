import { CommonModule } from "@angular/common";
import { Component, computed, OnDestroy, OnInit, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { ExcursoesSingleUsecase } from "../../features/pacotes/services/excursoes-single.usecase";
import { CartItemComponent } from "../../shared/components/cart-item/cart-item.component";
import { formatarData } from "../../shared/helpers/formatar-data.helper";
import { EnumType } from "../../shared/models/global.type";
import { AsyncLocalEmbarquePipe } from "../../shared/pipes/async-local-embarque.pipe";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AsyncLocalEmbarquePipe,
    CartItemComponent,
  ],
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.scss",
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public terms = new FormControl(
    { value: false, disabled: true },
    Validators.required
  );
  public pacote = signal<any>(null);
  public participantes = computed(() => this.pacote().participantes);
  public totalValue = signal<number>(0);
  public totalValueEmCentavos = computed(() => this.totalValue() * 100);
  public amountTickets = computed(() => this.pacote().tickets.reduce((acc: number, item: EnumType<string>) => acc + item.value, 0));
  public itensFree = computed(() => this.pacote().tickets.filter((item: EnumType<string>) => item.key === 'babies'));
  public amountTicketsFree = computed(() => this.itensFree().reduce((acc: number, item: EnumType<string>) => acc + item.value, 0));
  public itensPagos = computed(() => this.pacote().tickets.filter((item: EnumType<string>) => item.key !== 'babies'));
  public amountTicketsPagos = computed(() => this.itensPagos().reduce((acc: number, item: EnumType<string>) => acc + item.value, 0));
  public valorItensFree = computed(() => this.amountTicketsFree() * this.totalValueEmCentavos());
  public valorItens = computed(() => this.totalValueEmCentavos() * this.amountTicketsPagos() );
  public totalValueWithDiscount = computed(() => (this.valorItens() / this.amountTickets()));

  get excursao() {
    return this._service.excursao;
  }

  get cantEnable() {
    return this.terms.value !== true;
  }

  constructor(private readonly _service: ExcursoesSingleUsecase) {}

  public ngOnInit(): void {
    if (sessionStorage.getItem("pacote")) {
      let pacote = JSON.parse(sessionStorage.getItem("pacote")!);
      this.pacote.set(pacote);
      this._service.getExcursaoById(pacote.id!);
    }
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;

    if (element) {
      const atBottom =
        element.scrollTop + element.clientHeight >= element.scrollHeight;

      // Atualiza o estado do botão baseado na rolagem
      if (atBottom) this.terms.enable();
    }
  }

  public adicionarAoCarrinho() {
    let cart = JSON.parse(localStorage.getItem("cart")!) ?? [];
    
    cart.push(this.pacote());

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  private _formatandoPeriodo(dataInicio: string, dataFim: string) {
    return `${formatarData(new Date(dataInicio))} a ${formatarData(new Date(dataFim))}`;
  }

  public ngOnDestroy(): void {
    sessionStorage.removeItem("pacote");
  }
}
