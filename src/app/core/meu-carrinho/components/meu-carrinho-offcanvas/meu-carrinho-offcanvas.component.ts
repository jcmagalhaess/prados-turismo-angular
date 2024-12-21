import { CommonModule } from "@angular/common";
import { Component, computed } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { ActionButtonComponent } from "../../../../shared/components/action-button/action-button.component";
import {
  TipoPassageiroEnum,
  TipoPassageiroType,
} from "../../../../shared/models/excursao.type";
import { AsyncOpcionaisPipe } from "../../../../shared/pipes/async-opcionais.pipe";
import { ThumbnailPipe } from "../../../../shared/pipes/thumbnail.pipe";
import { CarrinhoService } from "../../services/carrinho.service";

@Component({
  selector: "app-meu-carrinho-offcanvas",
  standalone: true,
  imports: [CommonModule, ThumbnailPipe, MatButtonModule, RouterModule, ActionButtonComponent, 
    AsyncOpcionaisPipe
  ],
  templateUrl: "./meu-carrinho-offcanvas.component.html",
  styleUrl: "./meu-carrinho-offcanvas.component.scss",
})
export class MeuCarrinhoOffcanvasComponent {
  public hasntItems = computed(() => this._carrinho.cart().length === 0);
  public opcionais = computed(() => this.cart().flatMap((item) => item.opcionais));
  
  get cart() {
    return this._carrinho.cart;
  }

  get loading() {
    return this._carrinho.loadingReserva;
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
    this._carrinho.gerarReserva();
  }
}
