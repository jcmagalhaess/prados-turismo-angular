import { computed, effect, Injectable } from "@angular/core";
import { AcessoLoginClientUsecase } from "../acesso/services/acesso-login-client.usecase";

@Injectable({
  providedIn: "root",
})
export class PedidosService {
  public reservas = computed(() =>
    this._user
      .clientAuthenticated()
      .PessoaVinculada.flatMap((item: any) => item.Reservas).sort((a: any, b: any) => b.reserva - a.reserva)
  );

  constructor(private readonly _user: AcessoLoginClientUsecase) {
      effect(() => {
        console.log(this._user.clientAuthenticated());
        
      })
    }
}
