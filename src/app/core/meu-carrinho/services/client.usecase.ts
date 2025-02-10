import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { finalize } from "rxjs";
import { env } from "../../../../env/env";

@Injectable({
  providedIn: "root",
})
export class ClientUseCase {
  private _loading = signal<boolean>(false);

  get loading() {
    return this._loading;
  }

  constructor(private readonly _http: HttpClient) { }

  public criarReserva(reserva: any) {
    this._loading.set(true);
    return this._http
      .post<string>(`${env.API}/financeiro/shopping`, reserva, { responseType: "text" as "json" })
      .pipe(finalize(() => this._loading.set(false)));
  }

  public setPaymentLink(reserva: string, linkId: string) {
    this._loading.set(true);
    return this._http
      .patch<string>(`${env.API}/reserva.set-payment-link/${reserva}/${linkId}`, { responseType: "text" as "json" })
      .pipe(finalize(() => this._loading.set(false)));
  }
}
