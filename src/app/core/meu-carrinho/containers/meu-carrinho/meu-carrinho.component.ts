import { CommonModule } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";
import { ActionButtonComponent } from "../../../../shared/components/action-button/action-button.component";
import { CartItemComponent } from "../../../../shared/components/cart-item/cart-item.component";
import { CarrinhoService } from "../../services/carrinho.service";

@Component({
  selector: "app-meu-carrinho",
  standalone: true,
  imports: [CommonModule, CartItemComponent, ActionButtonComponent],
  templateUrl: "./meu-carrinho.component.html",
  styleUrl: "./meu-carrinho.component.scss",
})
export class MeuCarrinhoComponent implements OnInit {
  public cart = signal<Array<any>>([]);

  get loadingReserva() {
    return this._carrinho.loadingReserva;
  }
  
  constructor(
    private readonly _carrinho: CarrinhoService,
  ) {}

  public ngOnInit(): void {
    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart")!);
      this.cart.set(cart);
    }
  }

  public pagar() {
    this._carrinho.gerarReserva();
    // this._carrinho
    //   .gerarLinkPagamento()
  }
}
