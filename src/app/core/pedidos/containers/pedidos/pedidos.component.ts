import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTooltip } from "@angular/material/tooltip";
import { env } from "../../../../../env/env";
import { buildBodyApiPagarme } from "../../../../shared/helpers/build-body-api-pagarme.helper";
import { buildPagBankRequest } from "../../../../shared/helpers/build-request-pagbank.helper";
import { LabelReservaPipe } from "../../../../shared/pipes/label-reserva.pipe";
import { ToasterService } from "../../../../shared/components/toaster/toaster.service";
import { PagarMeService } from "../../../pagarme/pagarme.service";
import { PagBankService } from "../../../pagbank/pagbank.service";
import { ClientUseCase } from "../../../meu-carrinho/services/client.usecase";
import { PedidosModalComponent } from "../../components/pedidos-modal/pedidos-modal.component";
import { PedidosService } from "../../pedidos.service";
import { ReservaService } from "../../reserva.service";
import { PagBankOpcional } from "../../../../shared/models/pagbank.type";

@Component({
  selector: "app-pedidos",
  imports: [CommonModule, LabelReservaPipe, MatTooltip],
  standalone: true,
  templateUrl: "./pedidos.component.html",
  styleUrl: "./pedidos.component.scss",
  providers: [PedidosService],
})
export class PedidosComponent {
  get reservas() {
    return this._order.reservas;
  }

  get noReservas() {
    return this._order.noReservas;
  }

  get client() {
    return this._order.client;
  }

  constructor(
    private readonly _order: PedidosService,
    private readonly _reserva: ReservaService,
    private readonly _dialog: MatDialog,
    private readonly _pagarMe: PagarMeService,
    private readonly _pagBank: PagBankService,
    private readonly _client: ClientUseCase,
    private readonly _toaster: ToasterService
  ) {}

  public statusLabel(status: false) {
    return status ? "Aprovado" : "Aguardando";
  }

  public totalTransacoes(lista: any) {
    return lista.reduce((acc: any, item: any) => acc + item.valor, 0);
  }

  public visualizar(id: string) {
    this._dialog.open(PedidosModalComponent, {
      width: "800px",
      maxWidth: "95vw",
      data: {
        id,
        client: this.client,
      },
    });
  }

  public voucher(item: any) {
    if (!item.status) return;

    this._toaster.alert("Gerando voucher, por favor aguarde...");
    this._reserva.downloadVoucher(item.id)
      .then(() => {
        this._toaster.success("Voucher baixado com sucesso!");
      })
      .catch(() => {
        this._toaster.error("Erro ao gerar voucher. Tente novamente.");
      });
  }

  public gerarLink(item: any) {
    // Check if payment link already exists
    if (item.pagarmeLink) {
      window.open(item.pagarmeLink, "_blank");
      return;
    }

    // Check if client data is available
    if (!this.client) {
      this._toaster.error("Dados do cliente não encontrados. Por favor, faça login novamente.");
      return;
    }

    // Transform reservation data to PagarMe format
    const pagarMeItems = this._transformReservaToPagarMeItems(item);
    const customerData = this._getCustomerData();

    // Generate payment link
    this._pagarMe
      .generatePaymentLink(buildBodyApiPagarme(pagarMeItems, customerData))
      .then((data: any) => {
        const response = JSON.parse(data);

        // Save payment link to reservation
        this._client.setPaymentLink(item.id, response.id).then(() => {
          // Open payment link
          window.open(response.url, "_blank");
          this._toaster.success("Link de pagamento gerado com sucesso!");
        });
      })
      .catch((err) => {
        this._toaster.error("Erro ao gerar link de pagamento");
        console.error(err);
      });
  }

  private _transformReservaToPagarMeItems(reserva: any): any[] {
    const items: any[] = [];

    console.log(reserva)
    // Calculate passenger count from ExcursaoPassageiros
    const passengerCount = reserva.ExcursaoPassageiros?.length || 1;

    // Add excursion as an item
    const excursionPrice = reserva.Excursao.valor * 100; // Convert to cents
    items.push({
      id: reserva.Excursao.id,
      amount: Math.round(excursionPrice),
      name: reserva.Excursao.nome,
      description: "",
      default_quantity: passengerCount,
      isExcursao: true,
    });

    // Add optional items
    if (reserva.Opcionais && reserva.Opcionais.length > 0) {
      reserva.Opcionais.forEach((opcional: any) => {
        const optionalPrice = opcional.Produto.valor * 100; // Convert to cents
        items.push({
          id: opcional.Produto.id,
          amount: Math.round(optionalPrice),
          name: opcional.Produto.nome,
          description: "",
          default_quantity: opcional.qtd,
          isExcursao: false,
        });
      });
    }

    return items;
  }

  private _getCustomerData() {
    const client = this.client!; // Safe to use ! here because we check for null in gerarLink
    return {
      type: "individual",
      email: client.email,
      name: client.nome,
      cpf: client.cpf,
      phone: client.telefone,
    };
  }

  public gerarLinkPagBank(item: any) {
    // Check if PagBank payment link already exists
    if (item.pagbankLink) {
      window.open(item.pagbankLink, "_blank");
      return;
    }

    // Check if client data is available
    if (!this.client) {
      this._toaster.error("Dados do cliente não encontrados. Por favor, faça login novamente.");
      return;
    }

    // Transform opcionais to PagBank format
    const opcionais: PagBankOpcional[] = item.Opcionais?.map((opcional: any) => ({
      valor: opcional.Produto.valor,
      nome: opcional.Produto.nome,
      quantidade: opcional.qtd,
    })) || [];

    // Calculate passenger amount from ExcursaoPassageiros
    const quantidade = item.ExcursaoPassageiros?.length || 1;

    // Build PagBank request
    const pagBankRequest = buildPagBankRequest(
      this.client.id,
      item.Excursao.id,
      item.id,
      quantidade,
      opcionais,
      ['credit_card', 'pix']
    );

    // Generate payment link
    this._pagBank
      .generatePaymentLink(pagBankRequest)
      .then((data: any) => {
        // Open payment link
        window.open(data.url, "_blank");
        this._toaster.success("Link de pagamento PagBank gerado com sucesso!");
      })
      .catch((err) => {
        this._toaster.error("Erro ao gerar link de pagamento PagBank");
        console.error(err);
      });
  }

  public gerarLinkAuto(item: any) {
    if (env.paymentProvider === "pagarme") {
      return this.gerarLink(item);
    } else if (env.paymentProvider === "pagbank") {
      return this.gerarLinkPagBank(item);
    } else {
      this._toaster.error(`Provider de pagamento não configurado: ${env.paymentProvider}`);
    }
  }
}
