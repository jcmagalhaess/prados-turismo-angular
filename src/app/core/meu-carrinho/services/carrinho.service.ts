import { computed, effect, Injectable, signal } from "@angular/core";
import { buildBodyApiPagarme } from "../../../shared/helpers/build-body-api-pagarme.helper";
import { Client } from "../../../shared/models/client.type";
import { AcessoClientAuthenticatedUsecase } from "../../acesso/services/acesso-client-authenticated.usecase";
import { PagarMeService } from "../../pagarme/pagarme.service";
import { ClientUseCase } from "./client.usecase";

@Injectable({ providedIn: "root" })
export class CarrinhoService {
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
  private _pagarMeURL = signal<string | null>(null);
  private _reserva = computed(() =>
    this._cart().map((item) => ({
      excursaoId: item.id,
      payment_method: "credit_card",
      total: item.tickets.reduce(
        (acc: number, item: any) => acc + item.price,
        0
      ),
      criancas: item.tickets.filter((item: any) => item.key === "babies").reduce(
        (acc: number, item: any) => acc + item.value, 0
      ),
      clients: item.participantes.map((item: any) => ({
        ...item,
        sexo: 'M'
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

  get pagarMe() {
    return this._pagarMe();
  }

  get user() {
    return this._user;
  }

  constructor(
    private readonly _pagarMeApi: PagarMeService,
    private readonly _client: ClientUseCase,
    private readonly _user: AcessoClientAuthenticatedUsecase
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

    // return forkJoin(req).subscribe(res => {
    //   console.log(res);
      
    // });
  }

  public gerarLinkPagamento() {
    return this._pagarMeApi
      .generatePaymentLink(
        buildBodyApiPagarme(
          this.pagarMe,
          this._pegarDadosUsuario(this._user.clientAuthenticated()!)
        )
      )
      .then((data) => window.open(data.url, "_blank"));
  }

  private _pegarDadosUsuario(user: Client) {
    return {
      type: "individual",
      email: user.email,
      name: user.nome,
    };
  }
}
