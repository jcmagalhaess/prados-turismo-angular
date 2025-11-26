import { CommonModule } from "@angular/common";
import { Component, computed, OnDestroy, OnInit, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxMaskPipe } from "ngx-mask";
import { TermosUsoComponent } from "../../features/termos-uso/containers/termos-uso.component";
import { CartItemComponent } from "../../shared/components/cart-item/cart-item.component";
import { AsyncLocalEmbarquePipe } from "../../shared/pipes/async-local-embarque.pipe";
import { EmptyLabelPipe } from "../../shared/pipes/empty-label.pipe";
import { CarrinhoService } from "../meu-carrinho/services/carrinho.service";

@Component({
  selector: "app-checkout",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AsyncLocalEmbarquePipe,
    CartItemComponent,
    TermosUsoComponent,
    NgxMaskPipe,
    EmptyLabelPipe,
  ],
  standalone: true,
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.scss",
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public terms = new FormControl(false, Validators.required);
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


  public adicionarAoCarrinho() {
    let cart = JSON.parse(localStorage.getItem("cart")!) ?? [];

    cart.push(this.pacote());

    localStorage.setItem("cart", JSON.stringify(cart));
    this._carrinho.pegarCarrinho();
    this._router.navigateByUrl("/meu-carrinho");
  }

  public ngOnDestroy(): void {
    sessionStorage.removeItem("pacote");
  }
}
