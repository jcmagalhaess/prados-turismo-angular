import { CommonModule } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";
import { CartItemComponent } from "../../../../shared/components/cart-item/cart-item.component";
import { CarrinhoService } from "../../services/carrinho.service";

@Component({
  selector: "app-meu-carrinho",
  standalone: true,
  imports: [CommonModule, CartItemComponent],
  templateUrl: "./meu-carrinho.component.html",
  styleUrl: "./meu-carrinho.component.scss",
})
export class MeuCarrinhoComponent implements OnInit {
  public cart = signal<Array<any>>([]);

  constructor(private readonly _carrinho: CarrinhoService) {}

  public ngOnInit(): void {
    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart")!);
      this.cart.set(cart);
    }
    console.log('reserva');
  }

  public pagar() {
    // console.log('reserva');
    this._carrinho.gerarReserva();
    // this._carrinho.gerarLinkPagamento();
  }
}
