import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { finalize } from "rxjs";
import { env } from "../../../../env/env";
import { Reserva } from "../../../shared/models/reserva.type";

@Injectable({
  providedIn: "root",
})
export class ClientUseCase {
  private _loading = signal<boolean>(false);

  get loading() {
    return this._loading;
  }

  constructor(private readonly _http: HttpClient) {}

  public criarReserva(reserva: Reserva) {
    this._loading.set(true);
    return this._http
        .post<string>(`${env.API}/financeiro/shopping`, reserva)
        .pipe(finalize(() => this._loading.set(false)));
  }
}
