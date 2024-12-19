import { CommonModule } from "@angular/common";
import { Component, computed, OnInit, signal } from "@angular/core";
import { CartItemComponent } from "../../../../shared/components/cart-item/cart-item.component";

@Component({
  selector: "app-meu-carrinho",
  standalone: true,
  imports: [CommonModule, CartItemComponent],
  templateUrl: "./meu-carrinho.component.html",
  styleUrl: "./meu-carrinho.component.scss",
})
export class MeuCarrinhoComponent implements OnInit {
  public cart = signal<Array<any>>([]);
  private _pagarMe = computed(() =>
    this.cart().map((item) => {
      let amountTickets = item.tickets.reduce((acc: number, item: any) => acc + item.value, 0);
      let pricesTickets = item.tickets.reduce((acc: number, item: any) => acc + (item.price * 100), 0);

      return {
        id: item.id,
        amount: Math.round(pricesTickets / amountTickets),
        name: item.nome,
        description: "",
        default_quantity: amountTickets,
      };
    })
  );
  // id: "0339f8fe-fb8c-4aa9-a6e1-510893e031ee",
  //     amount: 16500,
  //     name: "Pacote para Natal, Pipa e Perobas - 19/12/2024 a 21/12/2024",
  //     description: "",
  //     default_quantity: 2,

  public ngOnInit(): void {
    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart")!);
      this.cart.set(cart);
    }
  }

  public pagar() {
    console.log(this._pagarMe());
  }
}
