import { CommonModule } from "@angular/common";
import { Component, computed, OnDestroy, OnInit, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TermosUsoContentComponent } from "../../features/termos-uso/components/termos-uso-content/termos-uso-content.component";
import { CartItemComponent } from "../../shared/components/cart-item/cart-item.component";
import { AsyncLocalEmbarquePipe } from "../../shared/pipes/async-local-embarque.pipe";
import { CarrinhoService } from '../meu-carrinho/services/carrinho.service';

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AsyncLocalEmbarquePipe,
    CartItemComponent,
    TermosUsoContentComponent
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

  constructor(
    private readonly _router: Router,
    private readonly _carrinho: CarrinhoService
  ) {}

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

      if (atBottom) this.terms.enable();
    }
  }

  public adicionarAoCarrinho() {
    let cart = JSON.parse(localStorage.getItem("cart")!) ?? [];
    
    cart.push(this.pacote());

    localStorage.setItem("cart", JSON.stringify(cart));
    this._carrinho.pegarCarrinho();
    this._router.navigateByUrl('/meu-carrinho')
  }

  public ngOnDestroy(): void {
    sessionStorage.removeItem("pacote");
  }
}
