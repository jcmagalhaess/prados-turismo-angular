import { CommonModule, CurrencyPipe } from "@angular/common";
import { Component } from "@angular/core";
import { MatTooltip } from "@angular/material/tooltip";
import { Router, RouterModule } from "@angular/router";
import { ExcursoesListUsecase } from "../../features/pacotes/services/excursoes-list.usecase";
import { Cliente } from "../../shared/models/cliente.type";
import { AcessoGetDataPessoaUsecase } from "../acesso/services/acesso-get-data-pessoa.usecase";
import { MeuCarrinhoOffcanvasComponent } from "../meu-carrinho/components/meu-carrinho-offcanvas/meu-carrinho-offcanvas.component";
import { CarrinhoService } from "../meu-carrinho/services/carrinho.service";
import { HeaderStyleService } from "./header-style.interceptor";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CurrencyPipe,
    MeuCarrinhoOffcanvasComponent,
    MatTooltip,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  providers: [ExcursoesListUsecase],
})
export class HeaderComponent {
  get client() {
    return this._userClient.clientAuthenticated();
  }

  get totalCarrinho() {
    return this._cart.amount;
  }

  get valoresCarrinho() {
    return this._cart.totalValue;
  }

  constructor(
    private readonly _router: Router,
    private readonly _cart: CarrinhoService,
    private readonly _userClient: AcessoGetDataPessoaUsecase,
    private readonly _headerInterceptor: HeaderStyleService
  ) {
    this._cart.pegarCarrinho();
  }

  public navigate(route: string) {
    this._router.navigate([route]);
  }

  public getLink(client: Cliente | null) {
    if (!client) return "/login";
    return "/minha-conta";
  }
}
