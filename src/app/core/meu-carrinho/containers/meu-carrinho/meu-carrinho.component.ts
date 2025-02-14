import { CommonModule } from "@angular/common";
import { Component, computed, OnInit, signal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ActionButtonComponent } from "../../../../shared/components/action-button/action-button.component";
import { CartItemComponent } from "../../../../shared/components/cart-item/cart-item.component";
import { ToasterService } from "../../../../shared/components/toaster/toaster.service";
import { MeuCarrinhoCupomComponent } from "../../components/meu-carrinho-cupom/meu-carrinho-cupom.component";
import { CarrinhoService } from "../../services/carrinho.service";
import { CupomUsecase } from "../../services/cupom.usecase";

@Component({
  selector: "app-meu-carrinho",
  standalone: true,
  imports: [CommonModule, CartItemComponent, ActionButtonComponent, RouterModule, MeuCarrinhoCupomComponent],
  templateUrl: "./meu-carrinho.component.html",
  styleUrl: "./meu-carrinho.component.scss",
})
export class MeuCarrinhoComponent implements OnInit {
  public cart = signal<Array<any>>([]);
  public hasCupom = signal<boolean>(false);

  get loadingReserva() {
    return this._carrinho.loadingReserva;
  }

  get loadingCupom() {
    return this._cupom.loading;
  }

  get hasntItems() {
    return computed(() => this.cart().length === 0);
  }

  get cupom() {
    return this._carrinho.cupom;
  }

  constructor(
    private readonly _carrinho: CarrinhoService,
    private readonly _cupom: CupomUsecase,
    private readonly _toaster: ToasterService
  ) {}

  public ngOnInit(): void {
    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart")!);
      this.cart.set(cart);
    }
  }

  public pagar() {
    this._carrinho.gerarReserva();
  }

  public validateCupom(cupom: string) {
    this._cupom
      .validateCupom(cupom)
      .then(res => {
        this.hasCupom.set(true);
        this._carrinho.cupom.set(res);
      })
      .catch(_ => this._toaster.alert(`Cupom ${cupom} inválido!`))
  }
}
