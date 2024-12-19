import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { env } from "../../../../env/env";
import { Reserva } from "../../../shared/models/reserva.type";

@Injectable({
  providedIn: "root",
})
export class ClientUseCase {
  constructor(private readonly _http: HttpClient) {}

  public criarReserva(reserva: Reserva) {
    return lastValueFrom(
      this._http.post(`${env.API}/financeiro/shopping`, reserva)
    );
  }
}
