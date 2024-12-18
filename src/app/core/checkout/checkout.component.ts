import { CommonModule } from "@angular/common";
import { Component, computed, OnDestroy, OnInit, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { ExcursoesSingleUsecase } from "../../features/pacotes/services/excursoes-single.usecase";
import { TipoPassageiroEnum, TipoPassageiroType } from "../../shared/models/excursao.type";
import { EnumType } from "../../shared/models/global.type";
import { AsyncLocalEmbarquePipe } from "../../shared/pipes/async-local-embarque.pipe";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AsyncLocalEmbarquePipe],
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.scss",
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public terms = new FormControl({ value: false, disabled: true }, Validators.required);
  
  public pacote = signal<any>(null);
  public participantes = computed(() => this.pacote().participantes);
  public valor = computed(() => this.pacote().price);
  public tickets = computed(() => this.pacote().tickets.map((item: any) => ({ ...item, price: item.key === 'babies' ? 0 : this.valor() * item.value })));
  public totalValue = computed(() => this.tickets().filter((item: any) => item.key !== 'babies').reduce((acc: number, item: EnumType<string>) => acc + item.value, 0) * this.valor());
  public totalValueWithDiscount = computed(() => this.totalValue() * 0.95);

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
    // Garante que o target seja um elemento HTML
    const element = event.target as HTMLElement;
  
    if (element) {
      const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight;
  
      // Atualiza o estado do botão baseado na rolagem
      if (atBottom) this.terms.enable();
    }
  }
  

  public formatPassageiroTypeLabel(type: TipoPassageiroType) {
    return TipoPassageiroEnum[type];
  }

  public ngOnDestroy(): void {
    sessionStorage.removeItem("pacote");
  }
}
