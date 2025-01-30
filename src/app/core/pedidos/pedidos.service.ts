import { computed, Injectable } from "@angular/core";
import { AcessoGetDataPessoaUsecase } from "../acesso/services/acesso-get-data-pessoa.usecase";

@Injectable({
  providedIn: "root",
})
export class PedidosService {
  public reservas = computed(() => {
    if (!this._userClient.clientAuthenticated()) return [];
    
    return this._userClient.clientAuthenticated()!
      .Reservas
      .map((item: any) => {
        return {
          ...item,
          valorTotal: this._calculateTotal(item),
        }
      })
      .sort((a: any, b: any) => b.reserva - a.reserva)
    }
  );
  public lastReserva = computed(() => this.reservas()[0]);
  
  get noReservas() {
    return computed(() => this.reservas().length === 0);
  };

  get client() {
    return this._userClient.clientAuthenticated();
  }

  constructor(
    private readonly _userClient: AcessoGetDataPessoaUsecase,
  ) {
    this._carregarReservas();
  }

  private _calculateTotal(reserva: any) {
    let excursao = reserva.Excursao.valor;
    let opcionais = reserva.Opcionais.reduce((acc: number, item: any) => acc + (item.qtd *item.Produto.valor), 0);    
    
    return excursao + opcionais;
  }

  private _carregarReservas() {
    this._userClient.carregarCliente(localStorage.getItem("userClient")!);
  }
}
