import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, computed } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTooltip } from "@angular/material/tooltip";
import { Router, RouterModule } from "@angular/router";
import { ExcursoesListUsecase } from "../../features/pacotes/services/excursoes-list.usecase";
import { Cliente } from "../../shared/models/cliente.type";
import { AcessoIndexComponent } from "../acesso/containers/acesso-index/acesso-index.component";
import { AcessoGetDataPessoaUsecase } from "../acesso/services/acesso-get-data-pessoa.usecase";
import { MeuCarrinhoOffcanvasComponent } from "../meu-carrinho/components/meu-carrinho-offcanvas/meu-carrinho-offcanvas.component";
import { CarrinhoService } from "../meu-carrinho/services/carrinho.service";
import { HeaderStyleService } from "./header-style.interceptor";

@Component({
    selector: "app-header",
    imports: [
        CommonModule,
        RouterModule,
        MeuCarrinhoOffcanvasComponent,
        MatTooltip,
    ],
    standalone: true,
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
    providers: [ExcursoesListUsecase]
})
export class HeaderComponent {
  public nomeUsuario = computed(() => {
    const client = this.client();
    return client ? client.nome : "Visitante";
  });

  get client() {
    return this._userClient.clientAuthenticated;
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
    private readonly _headerInterceptor: HeaderStyleService,
    private readonly _dialog: MatDialog,
    private readonly _breakpointObserver: BreakpointObserver // adicione isso
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

  public authenticate() {
    if (this.client()) {
      this._router.navigate(["/minha-conta"]);
      return;
    }

    let dialogConfig = {
      minWidth: "30vw",
      maxWidth: "50vw",
    };

    if (this._breakpointObserver.isMatched(Breakpoints.Handset)) {
      dialogConfig = {
        minWidth: "90vw",
        maxWidth: "100vw",
      };
    }

    this._dialog.open(AcessoIndexComponent, {
      ...dialogConfig,
      maxHeight: "80vh",
    });
  }
}
