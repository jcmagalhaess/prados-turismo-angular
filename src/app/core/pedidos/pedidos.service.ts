import { computed, Injectable } from "@angular/core";
import { AcessoGetDataPessoaUsecase } from "../acesso/services/acesso-get-data-pessoa.usecase";

@Injectable({
  providedIn: "root",
})
export class PedidosService {
  public reservas = computed(() =>
    this._userClient
      .clientAuthenticated()
      .Reservas.sort((a: any, b: any) => b.reserva - a.reserva)
  );
  
  get noReservas() {
    return computed(() => this.reservas().length === 0);
  };

  get client() {
    return this._userClient.clientAuthenticated();
  }

  constructor(private readonly _userClient: AcessoGetDataPessoaUsecase) { }
}
