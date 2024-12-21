import { computed, effect, Injectable, signal } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { buildBodyApiPagarme } from "../../../shared/helpers/build-body-api-pagarme.helper";
import { Client } from "../../../shared/models/client.type";
import { AcessoLoginClientUsecase } from "../../acesso/services/acesso-login-client.usecase";
import { PagarMeService } from "../../pagarme/pagarme.service";
import { MeuCarrinhoReservaComponent } from "../components/meu-carrinho-reserva/meu-carrinho-reserva.component";
import { ClientUseCase } from "./client.usecase";

@Injectable({ providedIn: "root" })
export class CarrinhoService {
  public pagarMeURL = signal<string | null>(null);
  private _cart = signal<Array<any>>([]);
  private _amountTickets = computed(() =>
    this._cart()
      .flatMap((item) => item.tickets)
      .reduce((acc, item) => acc + item.value, 0)
  );
  private _pricesTickets = computed(() =>
    this._cart()
      .flatMap((item) => item.tickets)
      .reduce((acc, item) => acc + item.price, 0)
  );
  private _pricesOpcionais = computed(() => 
    this._cart()
      .flatMap((item) => item.opcionais)
      .reduce((acc, item) => acc + (item.value * item.price), 0))
  private _pagarMe = computed(() =>
    this._cart().map((item) => {
      let amountTickets = item.tickets.reduce(
        (acc: number, item: any) => acc + item.value,
        0
      );
      let pricesTickets = item.tickets.reduce(
        (acc: number, item: any) => acc + item.price * 100,
        0
      );

      return {
        id: item.id,
        amount: Math.round(pricesTickets / amountTickets),
        name: item.nome,
        description: "",
        default_quantity: amountTickets,
      };
    })
  );
  private _reserva = computed(() =>
    this._cart().map((item) => ({
      excursaoId: item.id,
      payment_method: "credit_card",
      total: item.tickets.reduce(
        (acc: number, item: any) => acc + item.price,
        0
      ),
      criancas: item.tickets
        .filter((item: any) => item.key === "babies")
        .reduce((acc: number, item: any) => acc + item.value, 0),
      clients: item.participantes.map((item: any) => ({
        ...item,
        sexo: "M",
      })),
    }))
  );

  get cart() {
    return this._cart;
  }

  get amount() {
    return this._amountTickets();
  }

  get price() {
    return this._pricesTickets();
  }

  get totalValue() {
    return computed(() => this._pricesTickets() + this._pricesOpcionais());
  }

  get pagarMe() {
    return this._pagarMe();
  }

  get user() {
    return this._user;
  }

  get loadingPagarMe() {
    return this._pagarMeApi.loading;
  }

  get loadingReserva() {
    return this._client.loading;
  }

  constructor(
    private readonly _pagarMeApi: PagarMeService,
    private readonly _client: ClientUseCase,
    private readonly _user: AcessoLoginClientUsecase,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    effect(() => {
      localStorage.setItem("cart", JSON.stringify(this._cart()));
    });
  }

  public pegarCarrinho() {
    const carrinho = localStorage.getItem("cart");

    if (carrinho) this._cart.set(JSON.parse(carrinho));
  }

  public gerarReserva() {
    const req = this._reserva().map((item) => this._client.criarReserva(item));

    return forkJoin(req).subscribe({
      next: (res) => this._openDialog(),
      error: (err) => this._openDialog()
    });
  }

  public gerarLinkPagamento() {
    return this._pagarMeApi
      .generatePaymentLink(buildBodyApiPagarme(
        this.pagarMe,
        this._pegarDadosUsuario(this._user.clientAuthenticated()!)
      ))
      .then((data: any) => {
        this.pagarMeURL.set(data.url);
        this._router.navigate(["/minha-conta/pedidos"]);
      });
  }

  private _openDialog() {
    this._dialog.open(MeuCarrinhoReservaComponent, {
      width: "500px",
      disableClose: true,
    });
  }

  private _pegarDadosUsuario(user: Client) {
    return {
      type: "individual",
      email: user.email,
      name: user.nome,
    };
  }
}
