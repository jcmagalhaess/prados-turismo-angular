import { CommonModule } from "@angular/common";
import { Component, computed, OnDestroy, OnInit, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { ExcursoesSingleUsecase } from "../../features/pacotes/services/excursoes-single.usecase";
import { CartItemComponent } from "../../shared/components/cart-item/cart-item.component";
import { AsyncLocalEmbarquePipe } from "../../shared/pipes/async-local-embarque.pipe";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AsyncLocalEmbarquePipe, CartItemComponent],
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.scss",
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public terms = new FormControl({ value: false, disabled: true }, Validators.required);
  public pacote = signal<any>(null);
  public participantes = computed(() => this.pacote().participantes);

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
      const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight;
  
      // Atualiza o estado do botão baseado na rolagem
      if (atBottom) this.terms.enable();
    }
  }

  public adicionarAoCarrinho() {

  }

  public ngOnDestroy(): void {
    sessionStorage.removeItem("pacote");
  }
}
