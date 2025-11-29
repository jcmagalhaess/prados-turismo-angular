import { computed, effect, Injectable, signal } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { ExcursoesSingleUsecase } from "../../../features/pacotes/services/excursoes-single.usecase";
import { FeedbackComponent } from "../../../shared/components/feedback/feedback.component";
import { ToasterService } from "../../../shared/components/toaster/toaster.service";
import { buildBodyApiPagarme } from "../../../shared/helpers/build-body-api-pagarme.helper";
import { buildPagBankRequest } from "../../../shared/helpers/build-request-pagbank.helper";
import { Cliente } from "../../../shared/models/cliente.type";
import { PagBankOpcional } from "../../../shared/models/pagbank.type";
import { AcessoGetDataPessoaUsecase } from "../../acesso/services/acesso-get-data-pessoa.usecase";
import { PagarMeService } from "../../pagarme/pagarme.service";
import { PagBankService } from "../../pagbank/pagbank.service";
import { MeuCarrinhoReservaComponent } from "../components/meu-carrinho-reserva/meu-carrinho-reserva.component";
import { ClientUseCase } from "./client.usecase";
import { CupomDTO } from "./cupom.usecase";

@Injectable({ providedIn: "root" })
export class CarrinhoService {
  public pagarMeURL = signal<string | null>(null);
  public cupom = signal<CupomDTO | null>(null);
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
      .reduce((acc, item) => acc + item.value * item.price, 0)
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
        isExcursao: true,
      };
    })
  );
  private _pagarMeOpcionais = computed(() =>
    this._cart()
      .flatMap((item) => item.opcionais)
      .map((opcional) => {
        let amountOpcionais = opcional.value;
        let pricesOpcionais = opcional.value * opcional.price * 100;

        return {
          id: opcional.key,
          amount: Math.round(pricesOpcionais / amountOpcionais),
          name: this._excursao
            .excursao()
            ?.Pacotes.Produto.find((item: any) => item.id === opcional.key)
            ?.nome,
          description: "",
          default_quantity: amountOpcionais,
          isExcursao: false,
        };
      })
  );
  private _reserva = computed(() =>
    this._cart().map((item) => ({
      excursaoId: item.id,
      payment_method: "credit_card",
      opcionais: item.opcionais.map((item: any) => ({
        id: item.key,
        quantidade: item.value,
        price: item.price
      })),
      total: item.tickets.reduce(
        (acc: number, ticket: any) => acc + ticket.price,
        0
      ) + item.opcionais.reduce(
        (accOpt: number, opt: any) => accOpt + (opt.price * opt.value), 0
      ),
      criancas: item.tickets
        .filter((item: any) => item.key === "babies")
        .reduce((acc: number, item: any) => acc + item.value, 0),
      clients: item.participantes.map((participante: any) => ({
        ...participante,
        telefone: participante.phone,
        phone: undefined
      })),
      tipoQuarto: item.tipoQuarto,
      cupom: this.cupom()?.id,
    }))
  );
  private _idGenerateReserva = signal<string[]>([]);

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
    private readonly _pagBankApi: PagBankService,
    private readonly _client: ClientUseCase,
    private readonly _user: AcessoGetDataPessoaUsecase,
    private readonly _excursao: ExcursoesSingleUsecase,
    private readonly _dialog: MatDialog,
    private readonly _router: Router,
    private readonly _toaster: ToasterService
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
    let reserva = this._reserva();
    let reservaComDescontos = this._reserva().map((item: any) => ({
      ...item,
      total: item.total - (item.total * (this.cupom()?.desconto! / 100))
    }));

    let reqReserva = this.cupom() ? reservaComDescontos : reserva;

    if (!this._noAuthenticated()) return;

    const reqReservaMap = reqReserva.flatMap((item) =>
      this._client.criarReserva(item)
    );

    return forkJoin(reqReservaMap).subscribe({
      next: (res) => {
        this._openDialog();
        this._idGenerateReserva.set(res);
      },
      error: (err) => this._toaster.error(JSON.parse(err.error).message[0]),
    });
  }

  public gerarLinkPagamento() {
    return this._pagarMeApi
      .generatePaymentLink(
        buildBodyApiPagarme(
          this._pagarMe().concat(this._pagarMeOpcionais()),
          this._pegarDadosUsuario(this._user.clientAuthenticated()!)
        )
      )
      .then((data: any) => {
        let response = JSON.parse(data);
        this.pagarMeURL.set(response.url);

        this._vincularReservaComPagarme(this._idGenerateReserva(), response.id);

        localStorage.removeItem("cart");
        this._cart.set([]);

        this._router.navigate(["/minha-conta/pedidos"]);
      });
  }

  private _noAuthenticated() {
    if (!this._user.isAuthenticated()) {
      this._dialog.open(FeedbackComponent, {
        width: "500px",
        disableClose: true,
        data: {
          title: "Falta só um passo!",
          type: "warning",
          description: "Entre ou cadastre-se para concluir sua compra com segurança e receber os vouchers no e-mail cadastrado.",
          color: "danger",
        },
      });

      return false;
    }

    return true;
  }

  private _openDialog() {
    this._dialog.open(MeuCarrinhoReservaComponent, {
      width: "500px",
      disableClose: true,
    });
  }

  private _pegarDadosUsuario(client: Cliente) {
    return {
      type: "individual",
      email: client.email,
      name: client.nome,
      cpf: client.cpf,
      phone: client.telefone,
    };
  }

  private _vincularReservaComPagarme(reservas: string[], linkId: string) {
    forkJoin(
      reservas.map((res) => this._client.setPaymentLink(res, linkId))
    ).subscribe({
      error: (err) => this._toaster.error(JSON.parse(err.error).message[0]),
    });
  }

  public gerarLinkPagamentoPagBank() {
    const cartItem = this._cart()[0]; // Get first cart item
    const reservaId = this._idGenerateReserva()[0];

    if (!cartItem || !reservaId) {
      this._toaster.error("Erro ao gerar link de pagamento");
      return Promise.reject("No cart item or reservation ID");
    }

    // Transform opcionais to PagBank format
    const opcionais: PagBankOpcional[] = cartItem.opcionais?.map((opcional: any) => ({
      valor: opcional.price,
      nome: opcional.name,
      quantidade: opcional.value,
    })) || [];

    // Calculate passenger amount from tickets
    const quantidade = cartItem.tickets?.reduce(
      (acc: number, ticket: any) => acc + ticket.value,
      0
    ) || 1;

    // Build PagBank request
    const pagBankRequest = buildPagBankRequest(
      this._user.clientAuthenticated()!.id,
      cartItem.id,
      reservaId,
      quantidade,
      opcionais,
      ['CREDIT_CARD', 'PIX']
    );

    return this._pagBankApi
      .generatePaymentLink(pagBankRequest)
      .then((data: any) => {
        this.pagarMeURL.set(data.url);

        localStorage.removeItem("cart");
        this._cart.set([]);

        this._router.navigate(["/minha-conta/pedidos"]);
      })
      .catch((err) => {
        this._toaster.error("Erro ao gerar link de pagamento PagBank");
        console.error(err);
        throw err;
      });
  }
}
