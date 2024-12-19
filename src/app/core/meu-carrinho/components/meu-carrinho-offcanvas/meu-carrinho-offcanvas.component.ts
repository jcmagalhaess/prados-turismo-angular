import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import {
  TipoPassageiroEnum,
  TipoPassageiroType,
} from "../../../../shared/models/excursao.type";
import { ThumbnailPipe } from "../../../../shared/pipes/thumbnail.pipe";
import { CarrinhoService } from "../../services/carrinho.service";

@Component({
  selector: "app-meu-carrinho-offcanvas",
  standalone: true,
  imports: [CommonModule, ThumbnailPipe, MatButtonModule, RouterModule],
  templateUrl: "./meu-carrinho-offcanvas.component.html",
  styleUrl: "./meu-carrinho-offcanvas.component.scss",
})
export class MeuCarrinhoOffcanvasComponent {
  get cart() {
    return this._carrinho.cart;
  }

  constructor(private _carrinho: CarrinhoService) {}

  public amountTickets(item: any) {
    return item.reduce((acc: number, item: any) => acc + item.value, 0);
  }

  public pricesTickets(item: any) {
    return item.reduce((acc: number, item: any) => acc + item.price, 0);
  }

  public buildPrice(tickets: any) {
    return tickets.reduce((acc: number, item: any) => acc + item.price, 0);
  }

  public formatPassageiroTypeLabel(type: TipoPassageiroType) {
    return TipoPassageiroEnum[type];
  }

  public removeItem(item: any) {
    this._carrinho.cart.set(this._carrinho.cart().filter((i: any) => i.id !== item));
  }

  public pagar() {
    this._carrinho.gerarLinkPagamento();
  }
}
