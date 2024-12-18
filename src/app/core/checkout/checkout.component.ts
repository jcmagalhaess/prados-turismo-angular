import { CommonModule } from "@angular/common";
import { Component, computed, OnDestroy, OnInit, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { CartItemComponent } from "../../shared/components/cart-item/cart-item.component";
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
  public cart = computed(() => [this.pacote()]);
  public participantes = computed(() => this.pacote().participantes);

  get cantEnable() {
    return this.terms.value !== true;
  }

  public ngOnInit(): void {
    if (sessionStorage.getItem("pacote")) {
      let pacote = JSON.parse(sessionStorage.getItem("pacote")!);
      this.pacote.set(pacote);
    }
  }

  public onScroll(event: Event): void {
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

  public ngOnDestroy(): void {
    sessionStorage.removeItem("pacote");
  }
}
